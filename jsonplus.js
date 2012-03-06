/*
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

function stringifyEx (value,replacer,space) {
    
    var holder = new Object;
    holder[""] = value;
    property = "";

    if(typeof replacer == "function") {
        var replacerFunction = replacer;
    }

    if(Object.prototype.toString.call(replacer) == "[object Array]")
    {
        var propertyIndex = {};
        for(var i = 0; i<replacer.length; i++) {
            propertyIndex[replacer] = true;
        }
    }
        
    if(space && Object.prototype.toString.call(space) == "[object Number]") {
        if(space > 10) space = 10;

        if(space < 1) space = "";
        else space = new Array(Math.floor(space+1)).join(" ");
    }
    else if(space && Object.prototype.toString.call(space) == "[object String]") {
        space = space.substring(0,10);
    }
    else {
        space = "";
    }


    var objectStack = [];
   
    function serializeObject(v) {

        for(var i = 0; i < objectStack.length; i++) {
            if(objectStack[i]==v) {
                throw new TypeError("Converting circular structure to JSON");
            }
        }
        objectStack.push(v);
        holder = v;
        var result = [];

        for(var p in v) {
            if(v.hasOwnProperty(p) && (!propertyIndex || propertyIndex.hasOwnProperty(p))) {
                var c = serialize(v[p]);
                if(c!==undefined) {
                    result.push(serializeString(p)+":"+(space?" ":"")+c);
                }
            }
        }
        var indent = Array(objectStack.length+1).join(space);
        var dedent = Array(objectStack.length).join(space);

        objectStack.pop();

        if(!result.length) return "{}";
        return "{"+(space?"\n"+indent:"")+result.join(","+(space?"\n"+indent:""))+(space?"\n":"")+dedent+"}";         
    }
    function serializeFunction(v) {
        return undefined;
    }
    function serializeArray(v) {

        for(var i = 0; i < objectStack.length; i++) {
            if(objectStack[i]==v) {
                throw new TypeError("Converting circular structure to JSON");
            }
        }
        objectStack.push(v);

        holder = v;
        var result = [];
        for(var i = 0; i < v.length; i++) {
            property = i;
            var c = serialize(v[i]);
            if(c!==undefined) {
                result.push(c);
            }
            else result.push(null);
        }
        var indent = Array(objectStack.length+1).join(space);
        var dedent = Array(objectStack.length).join(space);
        objectStack.pop();
        if(!result.length) return "[]";
        return "["+(space?"\n"+indent:"")+result.join(","+(space?"\n"+indent:""))+(space?"\n":"")+dedent+"]";
    }
    function serializeString(v) {
        return "\""+v.replace(/([\"\\])/g,"\\$1").replace(/[\u0000-\u001F]/g,function(t){
            var code = t.charCodeAt(0).toString(16);            
            return "\\u"+Array(5-code.length).join("0")+code; 
        })+"\"";
    }
    function serializeDate(v) {
        if(v.toJSON)
            return "\""+v.toJSON()+"\"";
        else
            return "\""+v.toISOString()+"\"";
    }
    function serializeNumber(v) {
        return v.toString();
    }
    function serializeBoolean(v) {
        return v.toString();
    }
    function serializeUndefined(v) {
        return undefined;
    }
    function serialize(v) {
        if(replacerFunction)
            v = replacerFunction.call(holder,property,v);

        if(typeof v == "object") {
            if(v === null) return "null";
            if(v.toJSON) return serialize(v.toJSON());
            if(v.constructor == Number) return serializeNumber(v);
            if(v.constructor == String) return serializeString(v);
            if(v.constructor == Boolean) return serializeBoolean(v);
            if(v.constructor == Date) return serializeDate(v);
            if(v.constructor == Array) return serializeArray(v);
            return serializeObject(v);
        }
        else 
            return {
                "function":serializeFunction,
                "string":serializeString,
                "number":serializeNumber,
                "boolean":serializeBoolean,
                "undefined":serializeUndefined
            }[typeof v](v);
    }
    return serialize(value);
}

if(JSON) 
    JSON.stringifyEx = stringifyEx;
else {
    this.JSON.stringify = function stringif(v){
        return stringifyEx(v);
    };
    this.JSON.stringifyEx  = stringifyEx;
}


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
            JSONInputElement:"<JSONWhiteSpace>|<JSONString>|<JSONNumber>|<JSONNullLiteral>|<JSONBooleanLiteral>|<JSONPunctuator>",
            JSONWhiteSpace:/[\t\n\r ]+/,
            JSONString:/"(?:[^\"\\\u0000-\u001F]+|\\[\"\/\\bfnrt]|\\u[0-9a-fA-F]{4})*"/,
            JSONNumber:/-?(?:[1-9][0-9]*|0)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/,
            JSONNullLiteral:/null/,
            JSONBooleanLiteral:/true|false/,
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
        var ruletext = "JSONText :\nJSONValue\nJSONValue :\nJSONNullLiteral\nJSONBooleanLiteral\nJSONObject\nJSONArray\nJSONString\nJSONNumber\nJSONObject :\n{ } \n{ JSONMemberList }\nJSONMember :\nJSONString : JSONValue\nJSONMemberList :\nJSONMember\nJSONMemberList , JSONMember\nJSONArray :\n[ ]\n[ JSONElementList ]\nJSONElementList :\nJSONValue\nJSONElementList , JSONValue"
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
    var terminalSymbols = ["JSONString","JSONNumber","JSONNullLiteral","JSONBooleanLiteral","{","}","[","]",":",","];
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
        return this.evaluate(this.syntacticalParser.getGrammarTree());
    }
    
 
    this.evaluate = function ( symbol ) {

        if(symbol.name == "JSONText")
            return this.evaluate(symbol.childNodes[0]);
        if(symbol.name == "JSONValue") {
            var result = this.evaluate(symbol.childNodes[0]);
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
                result.push(this.evaluate(symbol.childNodes[2]));
                return result;
            }
            else {
                var result = [];
                result.push(this.evaluate(symbol.childNodes[0]));
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
                with(this.evaluate(symbol.childNodes[0]))
                    result[key]=value;
                return result;
            }
        }
        if(symbol.name == "JSONMember") {
            var key = this.evaluate(symbol.childNodes[0]);
            var value = this.evaluate(symbol.childNodes[2]);
            return {key:key,value:value};
        }


    }

}

var parser = new Parser();

if(JSON) 
    JSON.parseEx = function(source){
        return parser.parse(source);
    }
else {
    this.JSON.parse = function parse(source){
        return parser.parse(source);
    };
    this.JSON.parseEx = function parseEx(source){
        return parser.parse(source);
    };
}


     


}();