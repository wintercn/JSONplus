﻿/*
JSONText :
    JSONValue
JSONValue :
    JSONNullLiteral
    JSONBooleanLiteral
    JSONObject
    JSONArray
    JSONString
    JSONNumber
JSONObject :
    { } 
    { JSONMemberList }
JSONMember :
    JSONString : JSONValue
    JSONString : JSONPath
JSONMemberList :
    JSONMember
    JSONMemberList , JSONMember
JSONArray :
    [ ]
    [ JSONElementList ]
JSONElementList :
    JSONValue
    JSONElementList , JSONValue
*/
void function() {


function Parser() {
    function LexicalParser() {
        function XRegExp(xregexps,rootname,flag){
            var expnames = [rootname];
            function buildRegExp(source) {
                var regexp = new RegExp;
                regexp.compile(source.replace(/<([^>]+)>/g,function(all,expname) {
                    if(!xregexps[expname])return "";
                    expnames.push(expname);
                    if(xregexps[expname] instanceof RegExp) return "(" + xregexps[expname].source +")";
                    return "(" + buildRegExp(xregexps[expname]).source +")";
                }),flag)
                return regexp;
            }
            var regexp = buildRegExp(xregexps[rootname]);
            this.exec = function(string) {
                var matches = regexp.exec(string);
                if(matches==null) return null;
                var result = new String(matches[0]);
                for(var i = 0; i < expnames.length; i++)
                    if(matches[i])
                        result[expnames[i]] = matches[i];
                return result;
            }
            this.setLastIndex = function(v){
                regexp.lastIndex = v;
            }
            this.getLastIndex = function(){
                return regexp.lastIndex;
            }
        }
        var lex = {
            JSONInputElement:"<JSONPath>|<JSONWhiteSpace>|<JSONString>|<JSONNumber>|<JSONNullLiteral>|<JSONBooleanLiteral>|<JSONPunctuator>",
            JSONWhiteSpace:/[\t\n\r ]+/,
            JSONString:/"(?:[^\"\\\u0000-\u001F]+|\\[\"\/\\bfnrt]|\\u[0-9a-fA-F]{4})*"/,
            JSONNumber:/-?(?:[1-9][0-9]*|0)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/,
            JSONNullLiteral:/null/,
            JSONBooleanLiteral:/true|false/,
            JSONPath:/path\(\.{0,2}(?:\/(?:(?:"(?:[^\"\\\u0000-\u001F]+|\\[\"\/\\bfnrt]|\\u[0-9a-fA-F]{4})*")|[^/]+)|\/)+\)/,
            JSONPunctuator:/[\:\[\]\{\}\,]/
        }
        var jsonInputElement = new XRegExp(lex,"JSONInputElement","g");
        var source;
        this.setSource =function(v){
            source = v;
            jsonInputElement.setLastIndex(0);
        }
        this.getSource =function(){
            return source;
        }
      
        this.getNextToken = function(){
            var lastIndex = jsonInputElement.getLastIndex();
            var token = jsonInputElement.exec(source);

            if(token && jsonInputElement.getLastIndex()-lastIndex > token.length)
            {
                throw new SyntaxError("Unexpected token ILLEGAL");
            }
            return token;
        }
    }
    function SyntacticalParser() {
        var ruletext = "JSONText :\nJSONValue\nJSONValue :\nJSONNullLiteral\nJSONBooleanLiteral\nJSONObject\nJSONArray\nJSONString\nJSONNumber\nJSONObject :\n{ } \n{ JSONMemberList }\nJSONMember :\nJSONString : JSONValue\nJSONString : JSONPath\nJSONMemberList :\nJSONMember\nJSONMemberList , JSONMember\nJSONArray :\n[ ]\n[ JSONElementList ]\nJSONElementList :\nJSONValue\nJSONElementList , JSONValue"
        ruletext= ruletext.split("\n");
        var rules = {};
        var currentRule ;
        for(var i = 0;i<ruletext.length;i++) {
            var line = ruletext[i];
            if(line.match(/([^ ]+) \:$/)) {        
                currentRule = rules[RegExp.$1] = [];                
            }
            else {
                currentRule.push(line.trim().split(" "));
            }
        }
        //build the status machine
        var root = {JSONText:"$"};
        var hash = {};
        function visitNode(node) {
            hash[JSON.stringify(node)] = node;            
            node.$closure = true;            
            var queue = [];
            for(var p in node) 
                if(node.hasOwnProperty(p))
                    queue.push(p);
            while(queue.length) {
                var symbolName = queue.shift();
                if(!rules[symbolName]) // should be a terminal symbol
                    continue;
                for(var j = 0;j<rules[symbolName].length;j++) {
                    rule = rules[symbolName][j];          
                    if(!node[rule[0]])
                        queue.push(rule[0]);
                    var rulenode = node;
                    var lastnode = null;


                    for(var i = 0 ; i < rule.length; i++) {
                        symbol= rule[i];
                        if(!rulenode[symbol])
                            rulenode[symbol] = {};
                      
                        lastnode = rulenode;
                        rulenode = rulenode[symbol];
                    }

                    rulenode.$reduce = symbolName;
                    rulenode.$count = rule.length;
                }
            }
            for(var p in node) {     
            

                if( typeof node[p] != "object" || p.charAt(0) == "$" || node[p].$closure ) 
                    continue;
 
                if( hash[JSON.stringify(node[p])])
                    node[p] = hash[JSON.stringify(node[p])];
                else
                    visitNode(node[p]);
            }
        }
        visitNode(root);        
        var symbolStack = [];
        var statusStack = [root];
        var current = root;        
        this.insertSymbol = function insertSymbol(symbol,haveLineTerminator) {
            //console.log(symbolStack);
            while(!current[symbol.name] && current["$reduce"])
            {
                var count = current["$count"];
                var newsymbol = new Symbol(current["$reduce"]);
                while(count--)
                    newsymbol.childNodes.push(symbolStack.pop()),statusStack.pop();
                current = statusStack[statusStack.length-1];
                newsymbol.childNodes.reverse();
                this.insertSymbol(newsymbol);
            }

            current = current[symbol.name];            
            symbolStack.push(symbol),statusStack.push(current);
        };
        this.reset = function(){
            current = root;
            symbolStack = [];
            statusStack = [root];
        }
        this.getGrammarTree = function(){
                try {
                    while(current["$reduce"])
                    {
                        var count = current["$count"];
                        var newsymbol = new Symbol(current["$reduce"]);
                        while(count--) newsymbol.childNodes.push(symbolStack.pop()),statusStack.pop();
                        current = statusStack[statusStack.length-1];
                        this.insertSymbol(newsymbol);
                    }
                    if(symbolStack.length!=1)
                        throw new Error();
                    return symbolStack[0];
                } catch (e) {
                    throw new SyntaxError("Unexpected end of input");
                }
        }

    }    
    this.lexicalParser = new LexicalParser();   
    this.syntacticalParser = new SyntacticalParser(this.lexicalParser);    
    var terminalSymbols = ["JSONPath","JSONString","JSONNumber","JSONNullLiteral","JSONBooleanLiteral","{","}","[","]",":",","];
    var terminalSymbolIndex = {};   
    for(var i = 0; i< terminalSymbols.length; i++)
        terminalSymbolIndex[terminalSymbols[i]] = undefined;
  
    function Symbol(symbolName,token) 
    {
        this.name = symbolName;
        this.token = token;
        this.childNodes = [];
    }
    this.parse = function(source) {
        var token;
        var haveLineTerminator = true;
        
        this.lexicalParser.setSource(source);
        this.syntacticalParser.reset();
        while( token = this.lexicalParser.getNextToken() ) {
            //console.log(token.toString());
            try {

                if(terminalSymbolIndex.hasOwnProperty(token.toString())) {
                    this.syntacticalParser.insertSymbol(new Symbol(token.toString(),token));
                }
                with(this)
                    for(var p in token)
                        if( terminalSymbolIndex.hasOwnProperty(p) ) {
                            syntacticalParser.insertSymbol(new Symbol(p,token));
                            break;
                        }
            } catch(e) {
                new SyntaxError("Unexpected token " + token);
            }
        }
        context = new Context(); 
        return this.evaluate(this.syntacticalParser.getGrammarTree());
    }
    
    function Reference(base,propertyname) {
        this.base = base;
        this.propertyName = propertyname;
    }

    function Context(){
        this.statusStack = [{}];
        this.pathStack = []
        this.resolvePath = function (path) {
            var path = path.split("/");
            if(path[0] == "") {
                var target = this.statusStack[0];
            }
            if(path[0]=="."){
                var target = this.statusStack[this.statusStack.length-2];
            }
            if(path[0]==".."){                
                var target = this.statusStack[this.statusStack.length-3];
                if(!target)
                    debugger;
            }

            var targetStack =[target];
            
            for(var i = 1;i< path.length; i++) {
                if(path[i]=="")
                    continue;
                if(path[i]==".."){
                    targetStack.pop();
                    target = targetStack[targetStack.length-1];
                    continue;
                }
                if(path[i]=="."){
                    continue;
                }
                
                if(!target["_"+path[i]])
                    target["_"+path[i]] = {};
                    
                target = target["_"+path[i]];
                targetStack.push(target);
            }
            
            
            
            if(target.value) 
                return target.value;
            else if(target.listener)
                target.listener.push(new Reference(this.statusStack[this.statusStack.length-2].value,this.pathStack[this.pathStack.length-1]));
            else
                target.listener = [ new Reference(this.statusStack[this.statusStack.length-2].value,this.pathStack[this.pathStack.length-1]) ];
        }
        this.enter = function (name) {
            this.pathStack.push(name);
            if(!this.statusStack[this.statusStack.length-1]["_"+name])
                this.statusStack[this.statusStack.length-1]["_"+name] ={};
            this.statusStack.push(this.statusStack[this.statusStack.length-1]["_"+name]);
        }
        this.quit = function(){
            this.pathStack.pop();
            this.statusStack.pop();
        }
        this.register = function (obj) {
            this.statusStack[this.statusStack.length-1].value = obj;
            
            if(this.statusStack[this.statusStack.length-1].listener)
            {
                for(var i = 0;i<this.statusStack[this.statusStack.length-1].listener.length;i++)
                {
                    with(this.statusStack[this.statusStack.length-1].listener[i])
                        base[propertyName] = obj;
                }
            } 
           
        }
    }
    var context ;
    this.evaluate = function ( symbol ) {

        if(symbol.name == "JSONText")
            return this.evaluate(symbol.childNodes[0]);
        if(symbol.name == "JSONValue") {
            var result = this.evaluate(symbol.childNodes[0]);
            context.register(result);
            return result;
        }
        if(symbol.name == "JSONString")
            return symbol.token.toString().replace(/\\(?:([^u])|u([0-9a-fA-F]{4}))/g,function(t,$1,$2){
                if($2) {
                    return String.fromCharCode(parseInt("0x"+$2));
                }
                
                var special = {
                    "\"":"\"",
                    "b":"\b",
                    "f":"\f",
                    "n":"\n",
                    "r":"\r",
                    "t":"\t"
                }[$1];
                if(special) return special;
                else return $1;            
            }).replace(/(^"|"$)/g,"");
        if(symbol.name == "JSONNumber")
            return parseFloat(symbol.token.toString());
        if(symbol.name == "JSONNullLiteral")
            return null;
        if(symbol.name == "JSONBooleanLiteral")
            return {"true":true,"false":false}[symbol.token.toString()];
        if(symbol.name == "JSONArray") {
            if( symbol.childNodes[1].name == "JSONElementList" ) {
                return this.evaluate(symbol.childNodes[1]);
            }
            else return new Array();
        }
        if(symbol.name == "JSONElementList") {
            if( symbol.childNodes[0].name == "JSONElementList" ) {
                var result = this.evaluate(symbol.childNodes[0]);
                context.enter(result.length);
                result.push(this.evaluate(symbol.childNodes[2]));
                context.quit();
                return result;
            }
            else {
                var result = [];
                context.register(result);
                context.enter(result.length);
                result.push(this.evaluate(symbol.childNodes[0]));
                context.quit();
                return result;
            }
        }
        if(symbol.name == "JSONObject") {
            if( symbol.childNodes[1].name == "JSONMemberList" ) {
                return this.evaluate(symbol.childNodes[1]);
            }
            else return new Object();
        }
        if(symbol.name == "JSONMemberList") {
            if( symbol.childNodes[0].name == "JSONMemberList" ) {
                var result = this.evaluate(symbol.childNodes[0]);
                with(this.evaluate(symbol.childNodes[2]))
                    result[key] = value;
                return result;
            }
            else {
                var result = new Object();
                context.register(result);
                with(this.evaluate(symbol.childNodes[0]))
                    result[key]=value;
                return result;
            }
        }
        if(symbol.name == "JSONMember") {
            var key = this.evaluate(symbol.childNodes[0]);
            context.enter(key);
            var value = this.evaluate(symbol.childNodes[2]);
            context.quit();
            return {key:key,value:value};
        }
        if(symbol.name == "JSONPath") {
            return context.resolvePath(symbol.token.match(/(?:^path\()([\s\S]*)(?:\)$)/)[1]);
        }

    }

}

var parser = new Parser();

if(JSON) 
    JSON.parseEx = function(source){
        return parser.parse(source);
    }
else
    this.JSON = {
        parse:function(source){
            return parser.parse(source);
        },
        parseEx:function(source){
            return parser.parse(source);
        }
    }
     


}();