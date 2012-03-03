# JSON+
JSON+ is a JSON supporting library which fully implemented ECMA262 JSON API.
The English version is not avaliable at this time.

# JSON+
JSON+是一个完整实现了ECMA262的JSON API的JSON库。

对于已经实现了JSON API的JS环境，JSON+提供了两个API：
JSON.parseEx
JSON.stringifyEx

显而易见，这两个函数是ECMA262v5中的JSON.parse和JSON.stringify的升级版本。

## 扩展的JSON格式：path语法

JSON+提供的两个函数的参数都跟原生的对应函数完全一致，它们的作用也非常类似。不同之处是，JSON+提供了对循环引用对象的支持。

在普通JSON语法中，类似以下的情形是无法被正确序列化的：

    var x = {};
    x.x = x;
    
    JSON.stringify(x);//这里将会抛出一个语法错误（SyntaxError）

JSON+提供了一种path语法来描述这样的对象，例子中的x将会被序列化为：

    {
        x:path(/)
    }

path用于指定一个JSON对象的某个属性的值，它可以是对象、数组、字符串或者数字类型。

path以"/"或者"../","./"开头，以path选取的根对象。
*"/"是绝对路径，表示从整个JSON的根对象开始选择。
*"../"和"./"是相对路径，"./"表示从当前属性节点所属的对象开始选择，"../"表示从当前属性节点所属的对象的父对象开始选择。

path的开头之后则是一序列用"/"分隔的属性。如
path(/a/name) 表示 根对象.a.name

## API参考

### JSON.parseEx(text)

* 参数
** text ： 表示带path语法的JSON格式字符串。
* 返回值 ： 返回解析JSON文本得到的对象或者值。
* 作用：解析一段JSON文本，得到JavaScript对象或者值。


### JSON.stringifyEx(value,replacer,space)

* 参数
    * value ： 表示待序列化的对象或者值。
    * replacer ： 序列化时可以使用replacer来将待序列化对象或者值转换成另外一个对象或者值。
    * space ： 表示为了可读性加入的空白，可以是字符串或者数字，若为数字，则使用这个数量的空格，不能超过10
* 返回值 ： 返回序列化JavaScript对象。
* 作用：将一个JavaScript对象或者值序列化成JSON字符串，带有循环引用的对象将被序列化为扩展的带有path语法的JSON


## 低版本的JavaScript

对于没有实现JSON的低版本JavaScript环境，JSON+将会注册4个API：
JSON.parse
JSON.parseEx
JSON.stringify
JSON.stringifyEx
其中JSON.parse和JSON.parseEx，JSON.stringify和JSON.stringifyEx作用分别是完全相同的。这样做的目的是给低版本JS环境提供完全符合ECMA262的JSON API兼容。