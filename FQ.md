# 前端面试题

## 一、HTML 与 CSS 问题

### 1、CSS盒模型

盒模型的属性可以分成三组：

- 边框(border)：可以设置边框的宽窄、样式和颜色。
- 内边距(padding)：可以设置盒子内容区与边框的间距。
- 外边距(margin)：可以设置盒子与相邻元素的间距。

叠加外边距：兄弟元素间的外边距会相互重叠，直到一个外边距碰到另一个元素的边框。

1. 没有宽度的盒子：是指没有显示地设置元素的 width 属性。

   如果不设置**块级元素**的 width 属性，那么这个属性的默认值是 auto，结果会让元素的宽度与父元素同宽。添加水平边框、内边距和外边距，会导致内容宽度减少，减少量等于水平边框、内边距和外边距的和。

2. 有宽度的盒子：为设定了宽度的盒子添加边距、内边距和外边距，会导致盒子扩展得更宽。实际上，盒子的`width`属性设定的只是盒子内容区的宽度，而非盒子要占据的水平宽度



```
（1）有两种盒子模型：IE盒模型（border-box）、W3C标准盒模型（content-box）
（2）盒模型：分为内容（content）、填充（padding）、边界（margin）、边框（border）四个部分

IE盒模型和W3C标准盒模型的区别：

（1）W3C标准盒模型：属性width，height只包含内容content，不包含border和padding
（2）IE盒模型：属性width，height包含content、border和padding，指的是content
+padding+border。

在ie8+浏览器中使用哪个盒模型可以由box-sizing（CSS新增的属性）控制，默认值为content-box，即标准盒模型；
如果将box-sizing设为border-box则用的是IE盒模型。如果在ie6，7，8中DOCTYPE缺失会将盒子模型解释为IE
盒子模型。若在页面中声明了DOCTYPE类型，所有的浏览器都会把盒模型解释为W3C盒模型。
```

### 2、简述px, em, rem, vh的含义和应用场景

1. px: 绝对单位，页面按精确像素展示。一般用在设置字体大小时的单位

2. em: 相对单位，基准点为父节点字体的大小，如果自身定义了 `font-size`，按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。一般用在设置元素的边距和宽高时使用，以此来根据字体大小自适应

   em是指字体高度，浏览器默认 1em=16px，所以 0.75em=12px。我们经常会在页面上看到根元素的 `font-size: 62.5%;`，这样1em就变成了10px。

3. rem: 相对单位，可理解为"root em"，相对根节点html的字体大小来计算，CSS3新增特性。

4. vh：视口单位，根据浏览器窗口的大小的单位，不受显示器分辨率的影响。1vh = 可视窗口的高度的百分之一。一般用于实现自适应。

### 3、块级元素和行内元素的区别

<u>块级元素</u>（比如标题和段落）会相互堆叠在一起沿页面向下排列，每个元素分别占一行（因为每个元素包含边距都与其父元素同宽）。而行内元素（比如链接和图片）则会相互并列，只有在空间不足以并列的情况下才会折到下一行显示。

### 4、display: none 和 visibility: hidden隐藏的区别

`display: none` ：把元素的 `display` 设定为 `none` ，该元素及所有包含在其中的元素，都不会在页面中显示。它们原先占据的所有空间也都会被“回收”，就好像相关的标记根本不存在一样。`visibility: hidden` 是视觉上消失了，在文档流中占位，浏览器会解析该元素；

使用 `visibility: hidden` 比 `display: none` 性能上要好， `display: none` 切换显示时页面产生[回流](#17、Reflows & Repaints)，而 visibility 切换是否显示时不会引起回流

### 5、浮动与清除

使用浮动创建分栏，只需给每个元素都设置 `float` 即可。浮动非图片元素时，必须给它设定宽度，而图片本身有默认的宽高。

围住浮动元素的三种方法：

1. 为父元素添加 `overflow: hidden`。但是要注意，该声明的真正用途时防止包含元素被超大内容撑大。应用该声明后，包含元素保持其设定的宽度，而超大的子内容则会被容器剪切掉。

2. 同时浮动父元素。这个方式不推荐。

3. 添加非浮动的清除元素。

   1. 第一种方式不太理想，就是简单地在HTML标记中添加一个子元素，并给它应用 `clear` 属性。由于没有默认的样式，不会引入多余空间，div元素很适合这个目的。

      ```html
      <style>
          section {border: 1px solid blue;}
          img {float: left;}
          .clear_me {clear: left}
          footer {border: 1px solid red;}
      </style>
      <section>
      	<img src="12.jpg">
          <p>It's fun to float.</p>
          <div class="clear_me"></div>
      </section>
      <footer>Here is the footer element...</footer>
      ```

      

   2. clearfix 规则

      给 `section` 添加一个类 `clearfix`（这种方法同样也适用于没有父元素的情况）

      ```css
      .clearfix::after {
          content:".";
          display:block;
          height:0;
          visibility:hidden;
          clear:both
      }
      ```

### 6、定位(position)

`position` 属性有4个值： static、relative、absolute、fixed，默认值为 static。

- static: 静态定位。position属性的默认值。被赋予`position: static`的元素声明的 `left `和 `top` 等无效。
- relative: 相对定位。可以用 `left` 、`top`、`bottom`、`right`属性改变它的位置，相对于它原来在文档流中的位置。
- absolute: 绝对定位。绝对定位会把元素彻底从文档流中拿出来。`left` 、`top`、`bottom`、`right`属性是相对于其定位上下文的（默认为body）。由于绝对定位元素的定位上下文是body，所以在页面滚动时，为了维护与body元素的相对位置关系，他也会相应地一定。改变上下文只需在该元素的祖先元素的position设定为relative即可。
- fixed: 固定定位。固定定位也会把元素彻底从文档流中拿出来。固定定位元素的定位上下文时视口（浏览器窗口或手持设备的屏幕），因此它不会随页面滚动而滚动。



### 7、如何在 CSS 中告诉浏览器使用不同的盒模型来渲染你的布局

CSS媒体查询

### 8、请用 CSS 实现多行文本的垂直居中

### 9、[CSS选择器优先级顺序](#3、CSS选择器优先级顺序)

1. !important
2. 内联选择器
3. id选择器
4. 类选择器、属性选择器、伪类选择器
5. 元素选择器、关系选择器、伪元素选择器
6. 通配符选择器

### 10、层叠规则

1. 规则一：包含 ID 的选择符胜过包含类的选择符，包含类的选择符胜过包含标签名的选择符；
2. 规则二：行内样式>嵌入样式>链接样式。在具有相同特指度的样式，后声明的胜过先声明的；
3. 规则三：设定的样式胜过继承的样式。即显示设定的样式优先。

### 11、CSS 样式命名规范

32. 以下哪个不属于CSS样式命名规范

    A. BEM B. OOCSS C. SMACSS D. Bootstrap

### 12、meta标签

#### 1. `meta`标签中的`initial-scale=1.0` 的含义。

`initial-scale` 属性接受一个 0.0-10.0的正数，该数值定义设备宽度（竖屏模式下为`device-width`的值，横屏模式下为`device-height`的值）与视口面积的比值

### 13、CSS 实现多行文本居中

1. `display:table-cell`

   给文本所在的标签声明 `display:table-cell;` 和 `vertical-align:middle;`。

2. `line-height` 和 `vertical-align` 

   父元素声明 `line-height` 值与 `height` 值一样，子元素声明 `display:inline-block;` 和 `vertical-align:middle;`。

3. `display:flex` 

   使用弹性布局，直接设置 `align-item` 属性，对子元素进行垂直居中

   `display:flex; align-item:center;`

### 14、伪类和伪元素的区别

css引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰==不在文档树中的部分==。

伪类分两种：

- **UI 伪类**会在 HTML 元素处于某个状态时（比如鼠标指针位于链接上），为该元素应用CSS样式。
- **结构化伪类**会在标记中存在某种结构上的关系（如某个元素是一组元素中的第一个或最后一个），为相应元素应用CSS样式

伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过::before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

有时你会发现伪元素使用了两个冒号（::）而不是一个冒号（:）。这是CSS3的一部分，并尝试区分伪类和伪元素。大多数浏览器都支持这两个值。按照规则应该使用（::）而不是（:），从而区分伪类和伪元素。但是，由于在旧版本的W3C规范并未对此进行特别区分，因此目前绝大多数的浏览器都支持使用这两种方式表示伪元素。



### 15、关于伪类 LVHA 的解释

a标签有四种状态：链接访问前、链接访问后、鼠标滑过、激活，分别对应四种伪类：`:link`、`:visited`、`:hover`、`:active`

当链接未访问过时：

1. 当鼠标滑过a链接时，满足 `:link` 和 `:hover` 两种状态，要改表a标签的颜色，就必须将 `:hover` 伪类在 `:link` 伪类后面声明；
2. 当鼠标点击激活a链接时，同时满足 `:link` 、`:hover` 、`:active`三种状态，要显示a标签激活时的样式(`:active`)，必须将 `:active` 声明放到 `:link` 和 `:hover` 之后。因此得出LVHA这个顺序



### 16、CSS中哪些属性能够继承

一般具有继承性的属性有：**字体**相关的属性，`font-size` 和 `font-weight` 等。**文本**相关的属性，color 和 text-align 等。表格的一些布局属性、列表属性如 `list-style` 等。还有光标属性 `cursor`、元素可见性 `visibility`。

当一个属性不是继承属性的时候，也可以将它的值设置为 inherit 来使它从父元素那获取同名的属性值来继承。

### 14、BFC 和 IFC



### LESS

31. 以下关于CSS预编译工具LESS的说法，错误的是：

    A. 支持变量定义 B. 支持嵌套 C. 支持条件判断 D. 支持导入

## 二、JavaScript问题

### 1. `target` 和 `currentTarget` 的区别

- `event.target`返回触发事件的元素
- `event.currentTarget`返回绑定事件的元素

```javascript
document.body.onclick = function(event) {
    alert(event.currentTarget === document.body);	//true
    alert(this === document.body);	//true
    alert(event.target === document.getElementId('myBtn'));	//true
}
```



### 2. `prototype` 和`__proto__` 的关系是什么

每个<u>实例对象</u>都有一个私有属性 `__proto__`，它指向对象构造函数的 `prototype`属性；**但是`Object.create(null)`创建的对象除外**，它没有 `__proto__`属性，也没有 `prototype` 属性。

```javascript
const obj = {}
obj.__proto__ === Object.prototype // true

function Test(){}
test.__proto__ == Test.prototype // true

const obj2 = Object.create(null)
obj2.__proto__ // undefined
obj2.prototype // undefined
```

所有的函数都同时拥有 `__proto__` 和`prototype`属性。

函数的 `__proto__`指向自己的函数实现，而 `prototype` 是一个对象，所以函数的 `prototype` 也有 `__proto__`属性，指向 `Object.prototype`。

```javascript
function func(){}
func.prototype.__proto__ === Object.prototype // true
// Object.prototype.__proto__ 指向null
Object.prototype.__proto__ // null
```

### 3. 有一个函数，参数是一个函数，返回值也是一个函数，返回的函数功能和入参的函数相似，但这个函数只能执行三次，再次执行无效，如何实现

这个题目时考察<u>闭包</u>的使用

```javascript
function sayHi(){
    console.log('hi')
}

function threeTimes(fn){
    let times = 0;
    return () => {
        if (times++ < 3 ) {
            fn()
        }
    }
}
const newFn = threeTimes(sayHi)
newFn()
newFn()
newFn()
newFn()
newFn()// 后面两次执行都无任何反应
```

通过<u>闭包</u>变量`times`来控制函数的执行

自己的见解：当 `if` 表达式中为 `false` 时，闭包的作用域才被销毁，在这之前，保持对 外部函数中局部变量的引用。

### 4、实现add函数，让add(a)(b)和add(a, b)两种调用结果相同

```javascript
function add(a, b) {
    if(b === undefined) {
        return function(x) {
            return a + x
        }
    }
    
    return a + b
}
```

调用`add(a)(b)`时，`add(a)`返回一个函数，之后的`(b)`传递参数b进行调用



### 5、变量提升

`var`会使变量提升，这意味着变量可以在声明之前使用。`let`和`const` 则不会使变量提升，提前使用会报错。变量提升（hoisting）是用于解释代码中变量声明行为的术语。使用`var`关键词声明或初始化的变量，会将声明语句“提升”到当前作用域的顶部。但是，只有声明才会触发提升，赋值语句将保持原样

### 6、使用let、var和const创建变量有什么区别

- 块级作用域：用`var`声明的变量的作用域是它当前的执行上下文（函数作用域），它可以是嵌套的函数，也可以是声明在任何函数外的变量。let 和 const 的声明范围是块级作用域，意味着它们只能在最近的一组花括号(function、if-else代码块或for循环)中访问。
- 暂时性死区：var会使变量提升，这意味着变量可以在声明之前使用。而 let 和 const 不会使变量提升，在 let 声明之前的执行瞬间被称为“暂时性死区”，在此阶段引用任何后面才声明的变量都会抛出 ReferenceError。
- 重复声明：用var重复声明不会报错，但 let 和 const 会。
- 全局声明：与 var 不同，使用 let/const 在全局作用域中声明的变量不会成为 window 对象的属性。
- let 和 const 的行为基本一样，唯二重要的区别在于：let 允许多次赋值，而 const 只允许一次，并且使用 const 声明变量时必须同时初始化变量，否则会导致运行错误。`SyntaxError: Missing initializer in const declaration`

### 7、浅拷贝和深拷贝

浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以**如果其中一个对象改变了这个地址，就会影响到另一个对象**。

深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且**修改新对象不会影响原对象**。

#### 1. 浅拷贝的实现方法

##### 	(1)、 `Object.assign()`

该方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回给目标对象。

```javascript
let obj1 = { person: {name: "kobe", age: 41},sports:'basketball' };
let obj2 = Object.assign({}, obj1);
obj2.person.name = "wade";
obj2.sports = 'football'
console.log(obj1); // { person: { name: 'wade', age: 41 }, sports: 'basketball' }
```

##### 	(2)、函数库 `lodash`的 `_.clone`方法

该函数库也有提供 `_.clone` 用来做 Shallow Copy，后面还会介绍利用这个库实现深拷贝。

```javascript
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.clone(obj1);
console.log(obj1.b.f === obj2.b.f);// true
```

##### 	(3)、展开运算符 `...`

展开运算符是一个 `es6`/`es2015` 特性，它提供了一种非常方便的方式来执行浅拷贝，这与 `Object.assign()` 的功能相同。

```javascript
let obj1 = {name : 'Kobe', address: {x:100, y:100}}
let obj2 = {... obj1}
obj1.address.x = 200
obj1.name = 'wade'
console.log('obj2',obj2)	//	obj2 { name: 'Kobe', address: {x:100, y:100}}
```

##### 	(4)、`Array.prototype.concat()`

```javascript
let arr = [1, 3, {
    username: 'kobe'
}];
let arr2 = arr.concat();
arr2[2].username = 'wade';
console.log(arr);	//[1, 3, { username: 'wade'}]
```

##### 	(5)、`Array.prototype.slice()`

```javascript
let arr = [1, 3, {
    username: 'kobe'
}];
let arr2 = arr.slice();
arr2[2].username = 'wade';
console.log(arr);	//[1, 3, { username: 'wade'}]
```



#### 2. 深拷贝的实现方式

##### 	(1)、`JSON.parse(JSON.stringify())`	!!important `不能处理函数和正则`

```javascript
let arr = [1, 3, {
    username: 'kobe'
}];
let arr2 = JSON.parse(JSON.stringify(arr))
arr2[2].username = 'wade';
console.log(arr);	//[1, 3, { username: 'wade'}]
```

**这种方式虽然可以实现数组或对象深拷贝，但不能处理函数和正则，**因为这两者基于`JSON.stringify`和`JSON.parse`处理后，得到的正则就不再是正则（变为空对象），得到的函数就不再是函数（变为null）了。

##### 	(2)、函数库`lodash`的`_.cloneDeep`方法

该函数页由提供`_.cloneDeep` 用来做 Deep Copy

```javascript
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);	//	false
```

##### 	(3)、`jQuery.extend()` 方法

`jquery`有提供一个 `$.extend` 

```javascript
$.extend([deepCopy,] target, object1, [objectN])	//	第一个参数为true就是深拷贝
```

##### 	(4)、手写递归方法

递归方法实现深度克隆原理：**遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝**。

有种特殊情况需注意就是对象存在**循环引用**的情况，即对象的属性直接的引用了自身的情况，解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
let obj = { name: 1, address: { x: 100 } };
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d);
```

### 8、`cookie`、`localStorage`、`sessionStorage` 的区别

| 特性           | Cookie                                                       | localStorage                                                 | sessionStorage                             |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------ |
| 数据的生命期   | 一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效 | 除非被清除，否则永久保存                                     | 仅在当前会话下有效，关闭页面或浏览器后清除 |
| 存放数据大小   | 4K左右                                                       | 5M                                                           | 同左                                       |
| 与服务器端通信 | 每次都会携带在HTTP头中，如果使用Cookie保存过多数据会带来性能问题 | 仅在客户端（即浏览器）中保存，不参与和浏览器的通信           | 同左                                       |
| 易用性         | 需要自己封装，原生的Cookie接口不友好                         | 原生接口可以接受，也可以再次封装来对 Object 和 Array 有更好的支持 | 同左                                       |

#### #`localStorage` 和 `sessionStorage` 有相同的方法：

##### 1、`setItem` 存储 `value`

```javascript
sessionStorage.setItem("key", "value");
localStorage.setItem("site", "js8.in");
```

##### 2、`getItem` 获取 `value`

```javascript
var value = sessionStorage.getItem("key");
var site = localStorage.getItem("site");
```

##### 3、`removeItem` 删除 `key`

```javascript
sessionStorage.removeItem("key");
localStorage.removeItem("site");
```

##### 4、`clear` 清楚所有 `key/value`

```javascript
sessionStorage.clear();
localStorage.clear();
```



### 9、 什么是自执行函数？用于什么场景？有什么好处？

#### 1. 自执行函数：

​	(1)、声明一个匿名函数

​	(2)、马上调用这个匿名函数

​	作用：创建一个独立的作用域

#### 2. 好处：

限制向全局作用域中添加过多的变量和函数，以免各种js库冲突，隔离作用域避免污染，或者截断作用域链，避免闭包造成引用变量无法释放。利用立即执行特性，返回需要的业务函数或对象，避免每次通过条件判断来处理。

#### 3. 场景：

一般用于框架、插件等场景



### 10、css动画和js动画的差异

1. 代码复杂度，js 动画代码相对复杂一些
2. 动画运行时，对动画的控制程度上，js能够让动画暂停，取消，终止，而css不能添加事件
3. 动画性能，js动画多了一个js解析的过程，性能不如css好



### 11、JavaScript的创建对象的方式和利弊

#### 1. 工厂模式

```javascript
function createObject(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job
    o.sayName = function() {
        console.log(this.name);
    };
    return o;
}
let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");
```

缺点：

没有解决对象标识问题（即新创建的对象是什么类型）

#### #2. 构造函数模式

这种方式内部代码实际上跟createPerson()基本是一样的，只是有以下区别

- 没有显示地创建对象
- 属性和方法直接赋值给了this
- 没有return

```javascript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log(this.name);
    };
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
```

###### #要创建Person的实例，应使用new操作符。以这种方式调用构造函数会执行如下操作：

1. 在内存中创建一个对象。
2. 这个新对象内部的[[Prototype]]特性被赋值为构造函数的prototype属性。
3. 构造函数内部的this被赋值为这个新对象（即this指向新对象）
4. 执行构造函数内部的代码
5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

缺点：

构造函数主要的问题在于，其定义的方法会在每个实例上都创建一遍。简单来说就是方法属性的引用不是指向同一个内存区域的。因此对前面的例子而言，person1和person2都有名为sayName()方法，但这两个方法不是同一个Function实例。

#### 3. 原型模式

==每个函数都会创建一个prototype属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。==

```javascript
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
    console.log(this.name);
};
let person1 = new Person();
person1.sayName();	// "Nicholas"
let person2 = new Person();
person2.sayName();	//	"Nicholas"

console.log(person1.sayName == person2.sayName);	//	"true"
```

缺点：

所有的实例默认都取得相同的属性；对于数值属性只需要每个实例定义同名属性覆盖就能解决，最大的问题在于引用属性，这个引用属性会被所有实例共享。

1. ###### 理解原型

   ![原型](C:\Users\Lenovo\Desktop\js\原型.png)

2. ###### 原型层级

   在通过对象访问属性时，会按照这个属性的名称开始搜索。搜索开始于对象实例本身。如果在这个实例上发现了给定的名称，则返回该名称对应的值。如果没有找到这个属性，则搜索会沿着指针进入原型对象，然后再原型对象上找到属性后，再返回对应的值。

   如果再实例上添加了一个与原型对象中同名的属性，那就会在实例上创建这个属性，这个属性会遮住原型对象上的属性。但是可以通过 `delete instance.property` 删除对应的实例上的属性，之后又可以访问原型对象上的属性了。

   这里介绍一个确定某个属性是否存在于原型上的方法：

   ```javascript
   function hasPrototypeProperty(object, name) {
       return !Object.hasOwnProperty(name) && (name in object);
   }
   ```

   `Object.keys(Person.prototype)`

   `Object.getOwnPropertyNames(Person.prototype)`

   `Object.getOwnPropertySymbols(Person.prototype)`

3. ###### 属性枚举顺序

   for-in循环、Object.keys()、Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()以及Object.assign()在属性枚举顺序方面有很大区别。

   for-in循环和Object.keys()的枚举顺序是不确定的；

   Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()和Object.assign()的枚举顺序是确定的，先以升序枚举数值键，然后以插入顺序枚举字符串和符号键。




### 12、JavaScript的继承方式和利弊

#### #1. 原型链

```javascript
function SuperType(){
    this.property = true
}

SuperType.prototype.getSuperValue = function () {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
    return this.subproperty;
};

let instance = new SubType();
console.log(instance.getSuperValue());	// true
```

优点：

1. 简单易于实现；
2. 父类新增原型方法/原型属性，子类都能访问到

缺点：

1. 由于父类的实例作为子类的原型，使得父类的实例属性变成了子类的原型属性，如果父类中有引用属性，这个引用值将被所有实例共享
2. 子类在实例化时不能给父类的构造函数传参。事实上，我们无法在不影响所有对象实例的情况下班参数传给父类构造函数
3. 无法实现多继承



#### 2. 盗用构造函数

**在子类型构造函数中通用call()调用父类型构造函数**

```javascript
function SuperType(name) {
    this.name = name;
}

function SubType() {
	// 继承 SuperType 并传参，通过使用call()方法，SuperType构造函数在为SubType的实例创建的新对象的上下文中执行了。这相当于新的 SubType 对象上运行了 SuperType() 函数中的所有初始化代码    
    SuperType.call(this, "Nicholas")
    this.age = 29;
}

let instance = new SubType();
console.log(instance.name);	// "Nicholas"
console.log(instance.age);	//	"29"
```

优点：

1. 解决了原型链继承中子类实例共享父类引用属性的问题；
2. 创建子类实例时可以向父类传参；
3. 可以实现多继承；

缺点：

也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。



#### 3. 组合继承

结合了原型链和盗用构造函数；使用原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性

```javascript
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
};

function SubType(name, age) {
 	// 继承属性   
    SuperType.call(this, name);			// 这里调用了第二次父类构造函数
    this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();	// 这里调用了第一次父类构造函数

SubType.prototype.sayAge = function() {
    console.log(this.age);
};

let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors);	//["red", "blue", "green", "black"]
instance1.sayName();	//	"Nicholas"
instance1.sayAge();	//	29

let instance2 = new SubType("Greg", 27);
console.log(instance1.colors);	//["red", "blue", "green"]
instance2.sayName();	//	"Greg"
instance2.sayAge();	//	27
```

优点：

1. 不存在引用属性共享问题；
2. 可以传参；
3. 函数属性可以复用

缺点：

调用了两次父类构造函数，生成了两份实例

#### 4. 原型式继承

适用情况：你有一个对象，你想在它的基础上再创建一个新对象。你需要把这个对象先传给object()，然后再对返回的对象进行适当修改。即适用于获取在源对象基础上对部分属性进行修改后的副本

```javascript
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

let anotherPerson = object(person);
// let anotherPerson = Object.create(person); // 与上面的object()方法效果相同
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.friends);	// "Shelby", "Court", "Van", "Rob", "Barbie"
```

关于`Object.create()`的第二个参数：与 `Object.defineProperties()` 的第二个参数一样。（会遮蔽原型对象上的同名属性）

```javascript
let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

let another = Object.create(person, {
    name:{
        value: "Greg",
    }
});
console.log(another.name);	// "Greg"
```

优点：

​	即使不自定义类型也可以通过原型实现对象之间的信息共享。

缺点：

1. 本质是源对象的一个副本
2. 存在引用属性共享问题

#### 5. 寄生式继承

背后的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。

```javascript
function createAnother(original) {
    let clone = object(original);	// 通过调用函数创建一个新对象
    clone.sayHi = function() {		// 以某种方式增强这个对象
        console.log("hi");
    };
    return clone;
}

let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

let anotherPerson = createAnother(person);
anotherPerson.sayHi();	// "hi"
```

缺点：函数难以重用，与构造函数模式类似。



#### 6. 寄生式组合继承

```javascript
// 这个函数实现了寄生式组合继承的核心逻辑。这个函数接收两个参数：子类构造函数和父类构造函数
function inheritPrototype(subType, superType) {
    // (prototype.__proto__ == superType.prototype)
    let prototype = object(superType.prototype);	// 创建对象
    prototype.constructor = subType;				// 增强对象
    subType.prototype = prototype;					// 赋值对象
}
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge() = function() {
    console.log(this.age);
};
```

优点：

解决了组合继承的问题，只调用了一次 `SuperType` 构造函数，避免了 `SubType.prototype` 上不必要也用不到的属性，因此可以说这种方法的效率更高。而且，原型链仍然保持不变，因此 `instanceof` 操作符和 `isPrototypeOf()` 方法正常有效。可以说是引用类型继承的最佳模式。



#### 7. ES6中 `class` 的继承

`class` 关键字只是原型的语法糖，JavaScript继承仍然是基于原型实现的。

```javascript
class Person {
    //调用类的构造函数
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    //定义一般方法
    showName() {
        console.log("调用父类的方法");
        console.log(this.name, this.age);
    }
}
let p1 = new Person("Nicholas", 29);
console.log(p1);

class Student extends Person {
    constructor(name, age, salary) {
        super(name, age);	//	通过super调用父类的构造方法
        this.salary = salary;
    }
    //在子类定义一般方法
    showName() {
        console.log("调用子类的方法");
        console.log(this.name, this.age, this.salary);
    }
}
let s1 = new Student("Kaffe", 18, 100000000);
console.log(s1);
s1.showName();
```

优点：

语法简单易懂，操作方便

缺点：

并不是所有的浏览器都支持class关键字



### 13、类（class）

虽然ES6类表面上看起来可以支持正式的面向对象编程，但实际上它背后使用的仍然是[原型和构造函数](#2. 构造函数模式)的概念

#### 1. 实例化

使用new操作符实例化Person的操作等于用[new调用其构造函数](#要创建Person的实例，应使用new操作符。以这种方式调用构造函数会执行如下操作：)。唯一可感知的不同之处就是，JavaScript解释器直到使用new和类意味着应该使用constructor函数进行实例化。

默认情况下，类构造函数会在执行之后返回this对象。构造函数返回的对象会被用作实例化的对象，如果没有什么引用新创建的this对象，那么这个对象会被销毁。不过，==如果返回的不是this对象，而是其他对象，那么这个对象不会通过 `instance` 操作符检测出跟类有关联，因为这个对象的原型指针没有被修改。(p252)==

```javascript
class Person1() {
    constructor() {
        return {};
    }
}
class Person2() {}
let p1 = new Person1();
let p2 = new Person2();
console.log(p1 instanceof Person1);	// false
console.log(p2 instanceof Person2);	// true

```

类构造函数与构造函数的主要区别是，调用类构造函数必须使用new操作符。而普通构造函数如果不适用new调用，那么就会以全局的this（通常是window）作为内部对象。调用类构造函数时如果忘了使用new则会抛出错误。

类构造函数会成为实例化对象的普通的实例方法（但作为类构造函数，仍然要使用new调用）。因此，实例化之后可以在实力上引用它：`new instance.constructor()`



#### 2. 把类当成特殊函数

类本身具有与普通构造函数一样的行为。在类的上下文中，类本身在使用new调用时就会被当成构造函数。重点在于，==类中定义的constructor方法不会被当成构造函数==，在对它使用instanceof操作符时会返回false。但是，如果在创建实例时直接将类构造函数当成普通构造函数来使用，那么instanceof操作符的返回值会反转：

```javascript
class Person{}
let p1 = new Person();
console.log(p1.constructor === Person);	// true
console.log(p1 instanceof Person);		// true
console.log(p1 instanceof Person.constructor);	// false

let p2 = new Person.constructor();
console.log(p2.constructor === Person);	// false
console.log(p2 instanceof Person);		// false
console.log(p2 instanceof Person.constructor);	// true
```



#### 3. 实例、原型和类成员

在构造函数定义的都是实例属性；

在类块中定义的所有内容都会定义在类的原型上，类定义也支持获取和设置访问器，语法与行为跟普通对象一样；

静态类方法this引用类自身，只能用类调用，实例无法调用；

```javascript
class Person {
    constructor() {
        // 添加到this的所有内容都会存在于不同的实例上
        this.locate = () => console.log('instance', this);
    }
    // 定义在类的原型上
    locate() {
        console.log('prototype', this);
    }
    //定义在类本身上
    static locate() {
        console.log('class', this)
    }
}
let p = new Person();
p.locate();		// instance, Person()  这里似乎指向的是实例的原型的constructor属性
Person.prototype.locate();	// prototype, {constructor: ...}
Person.locate();			// class, class Person{}
```

虽然类定义不显示支持在原型或类上添加成员数据，但在类定义外部，可以手动添加：

```javascript
class Person() {
    sayName() {
        console.log(`${Person.greeting} ${this.name}`);
    };
}

// 在类上定义数据成员
Person.greeting = 'My name is';
// 在原型上定义数据成员
Person.prototype.name = 'Jake';

let p = new Person();
p.sayName();	// My name is Jake
```

迭代器与生成器方法(p257)

#### 4. 继承

**虽然类继承使用的是新语法，但背后依旧使用的是[原型链](#1. 原型链)**。在使用super时要除以几个问题：

- 不能单独引用super关键字，要么用它来调用构造函数，要么用它引用方法。
- 调用 `super()` 会调用父类构造函数，并将返回的实例赋值给this。
- `super()` 的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。
- 如果没有定义类构造函数，在实例化派生类时会自动调用 `super()`，而且会传入所有传给派生类的参数。
- 不能再调用 `super()` 之前引用this
- 如果在派生类中显示定义了函数，则要么必须在其中调用 `super()`，要么必须在其中返回一个对象。
- `super` 作为对象时，在普通函数中指向父类的原型，在静态函数中指向父类本身

##### 抽象基类

一个类，它可供其他类继承，但本身不会被实例化。可以通过 `new.target` 实现。 `new.target` 保存通过new关键字调用的类或函数。通过在实例化时检测 `new.target` 是不是抽象基类，可以阻止对抽象基类的实例化：

```javascript
class Vehicle {
    constructor() {
        console.log(new.target);	// it refers to the constructed class
        if (new.target == Vehicle) {
            throw new Error('Vehicle cannot be directly instantiated');
        }
        
        if(!this.foo) {
            throw new Error('Inheriting class must define foo()');
        }
    }
}
// 派生类
class Bus extends Vehicle {
    foo(){}
}
// 派生类
class Van extends Vehicle {}
new Bus();	//class Bus{}
new Vehicle();	// class Vehicle{}
// Error: Vehicle cannot be directly instantiated
new Van();	// class Van{}
// Error: Inheriting class must define foo()
```

[MDN Description of `new.target`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target): 

The `new.target` syntax consists of the keyword `new`, a dot, and the identifier `target`. Normally, the left-hand side of the dot is the object on which property access is performed, but here, `new` is not an object.

The `new.target` pseudo-property is available in all functions.

In class constructors, ==**it refers to the constructed class.**==

In ordinary functions, it refers to the function itself, assuming it was invoked via the new operator; otherwise `new.target` is undefined.

In arrow functions, `new.target` is inherited from the surrounding scope.

##### 继承内置类型

可以直接继承，并对派生类添加新方法进行增强；

有些内置类型的方法会返回新实例。默认情况下，返回实力的类型与原始实例的类型是一致的。如果想覆盖这个默认行为，则可以==覆盖== `Symbol.species` 访问器，这个访问器决定在创建返回的实例时使用的类：

```javascript
class SuperArray extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}

let a1 = new SuperArray(1,2,3,4,5);
a1.filter(x => !!(x%2))

console.log(a1);	// [1,2,3,4,5]
console.log(a2);	// [1,3,5]
console.log(a1 instanceof SuperArray); // true
console.log(a2 instanceof SuperArray); // false
```



### 14、为什么会有跨域问题，怎么解决跨域问题？

#### 1. 为什么会有跨域问题？

同源策略：即通信只能在相同域名、相同端口和相同协议的前提下完成。访问超出这些限制之外的资源会导致安全错误，除非使用了正式的跨域方案，这个方案叫做跨域资源共享CORS。如果缺少了同源策略，浏览器很容易受到一些恶意行为，例如 XSS、CSRF 等攻击。

同源策略限制的内容有：

- Cookie、LocalStorage、IndexedDB 等存储性内容
- DOM节点
- AJAX 请求发送后，结果被浏览器拦截

但有三个标签时允许跨域加载资源的：

- `<img src="xxx">`
- `<link href="xxx">`
- `<script src="xxx">`

跨域并不是请求发不出去，请求能发出去，并且服务器端能收到请求并正常返回结果，只是结果被浏览器拦截了，浏览器会根据响应头的 `Access-Control-Allow-Origin` 字段的值来判断是否有权限获取数据。这就解释了Ajax为什么不能跨域的原因，也说明了跨域需要解决的问题就是：**如何从客户端拿到返回的数据？**



#### 2. 怎么解决跨域问题？

##### 	(1) JSONP

**JSONP** 请求本质上是利用 `script` 标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的 JSON 数据。JSONP请求一定需要对方的服务器做支持才可以。

JSONP和AJAX相比，AJAX属于同源策略，JSONP属于非同源策略；

优点：简单易用、兼容性好、可用于解决主流浏览器的跨域数据访问的问题。

缺点：如果这个域不可信，可能会遭受XSS攻击；仅支持GET方法；不好确定JSONP请求是否失败，虽然HTML5规定了 `<script>` 元素的onerror时间处理程序，但还没有被任何浏览器实现。为此，开发者经常使用计时器来决定是否放弃等待响应，这种方式并不准确。

```javascript
// jsonp 封装
const jsonp = ({ url, params, callbackName }) => {
    const generateURL = () => {
        let dataStr = "";
        for (let key in params) {
            dataStr += `${key}=${params[key]}&`;
        }
        dataStr += `callback=${callbackName}`;
        return `${url}?${dataStr}`;
    };
    return new Promise((resolve, reject) => {
        // 初始化回调函数名称
        callbackName = callbackName || "cb" + Math.random().toString().replace(".", "");
        let scriptEle = document.createElement("script");
        scriptEle.src = generateURL();
        document.body.appendChild(scriptEle);

        //绑定到 window 上，为了后面调用
        window[callbackName] = data => {
            resolve(data);
            // script 执行完了，成为无用元素，需要清除
            document.body.removeChild(scriptEle);
        }
    });
}

jsonp({
    url: "http://127.0.0.1:8000/",
    params: {
        name: "Kaffe",
        age: "18"
    },
    callbackName: "getData",
}).then(response => JSON.parse(response))
  .then(data => {
    console.log(data);
});
```



##### (2) CORS

**CORS**需要浏览器和后端同时支持。

浏览器会自动进行 CORS 通信，实现 CORS 通信的关键时后端。只要后端实现了 CORS，就实现了跨域。

服务端设置 `Access-Control-Allow-Origin` 就可以开启 CORS。该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求的时候出现两种情况：**简单请求**和**非简单请求**。

###### 简单请求

简单请求需要满足下列条件（[更多上MDN查阅](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)）：除此之外都是非简单请求

1. 请求方法是 **GET、HEAD 和 POST** 之一
2. 除了被用户代理自动设置的首部字段（例如 `Connection`，`User-Agent`）和在 Fetch规范中定义的对CORS 安全的首部字段集合。该集合为：
   - `Accept`
   - `Accept-Language`
   - `Content-Language`
   - `DPR`
   - `Downlink`
   - `Save-Data`
   - `Viewport-Width`
   - `Width`
   - `Content-type`: 该值仅限于下列三者之一
     - `text/plain`
     - `mutipart/form-data`
     - `application/x-www-form-urlencoded`



###### 非简单请求

1. 预检请求

非简单请求在进行真正的请求之前，浏览器会使用 OPTIONS 方法发送一个**预检请求**，OPTIONS 是 `HTTP/1.1` 协定中定义的方法，用以从服务器获取更多信息。通过该请求来知道服务端是否允许跨域请求。还包含以下头部：

- Origin：与简单请求相同。
- Access-Control-Request-Method：请求使用的方法。
- Access-Control-Request-Headers：（可选）要使用逗号分隔的自定义头部列表。

请求发送后，服务器可以确定是否允许这种类型的请求。服务器会通过在响应中发送以下头部与浏览器沟通这些信息。

- `Access-Control-Allow-Origin`：与简单请求相同。
- `Access-Control-Allow-Methods`：允许的方法（逗号分隔的列表）。
- `Access-Control-Allow-Headers`：服务器允许的头部（逗号分隔的列表）。
- `Access-Control-Max-Age`：缓存预检请求的秒数。

2. 凭据请求

默认情况下，跨院请求不提供凭据（cookie、HTTP 认证和客户端 SSL 证书）。可以通过将 `withCredentials` 属性设置为true来表明请求会发送凭据。如果服务器允许带凭据的请求，那么可以在响应中包含如下HTTP头部：

Access-Control-Allow-Credentials: true

如果发送了凭据请求而服务器返回的响应中没有这个头部，则浏览器不会把响应交给 JavaScript（responseText 是空字符串，status是0，onerror()被调用）。服务器也可以在预检请求的响应中发送这个头部，以表明这个源允许发送凭据请求。



##### (3) postMessage

postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：

- 页面和其打开的新窗口的数据传递
- 多窗口之间的消息传递
- 页面与嵌套的iframe消息传递
- 上面三个场景的跨域数据传递

**postMessage**允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。

###### syntax：`otherWindow.postMessage(message, targetOrigin, [transfer]);`

- `otherWindow`: 其他窗口的一个引用，比如iframe的contentWindow属性、执行 `window.open` 返回的窗口对象、或者是命名过或数值索引的`window.frames`。
- `message`: 将要发送到其他 window 的数据。它将会被**结构化克隆算法**序列化。这意味着可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化。
- `targetOrigin`: 通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以实字符串"*"（表示无限制）或者一个URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配targetOrigin提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。
- `transfer`（可选）: 是一串和message同时传递的 `Transferable` 对象。这些对象的所有权将被转移到给消息的接收方，而发送一方将不再保有所有权。

##### (4) Nginx Proxy

Nginx 相当于起了一个跳板机，这个跳板机的域名也是`client.com`，让客户端首先访问 `client.com/api`，这当然没有跨域，然后 Nginx 服务器作为反向代理，将请求转发给`server.com`，当响应返回时又将响应给到客户端，这就完成整个跨域请求的过程。

##### (5) Web Socket



### 15、关于单页面应用首屏加载速度慢，出现白屏时间过长的问题怎么处理？

- [ ] 将公用的JS库通过script标签在index.html中进行外部引入，减少我们打包出来的js文件的大小，让浏览器并行下载资源文件，提高下载速度；
- [ ] 在配置路由的时候进行路由的懒加载，在调用到该路由时再加载子路由相对应的js文件
- [ ] 加一个首屏loading图或骨架屏，提高用户体验
- [ ] 尽可能使用CSS Sprites和字体图标库
- [ ] 图片的懒加载等



### 16、JS的集中模块化方式

什么是模块定义规范(Module Definition Specification)？

模块系统的基本问题：

1. 模块是什么？模块是一段 JavaScript 代码，具有统一的基本**书写格式**；
2. 模块之间如何交互？ 模块之间通过基本**交互规则**，能彼此引用，协同工作。

对**书写格式**和**交互规则**的详细描述，就是模块定义规范。

[大前端模块化规范](#6、大前端模块化规范)

#### 1. 命名空间

#### 2. IIFE（自执行函数）

#### 3. CommonJs

CommonJs 是服务器端模块的规范，NodeJs 采用了这个规范。

CommonJs 是同步加载的，它是运行时加载。

CommonJs 模块化的规范中，每个文件都是一个模块，拥有独立的作用域、变量以及方法等，都是私有的，对其他模块不可见。

1. 基本用法：

   - 暴露模块：`module.exports = value / exports.xxx = value`  (`exports` 实际上是`module.exports` 的引用)
   - 引入模块：require(xxx)，如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径。

   CommonJS 暴露的模块到底是什么？

   该规范规定每个模块内部，module 变量表示当前模块，它是一个对象，它的 exports 属性是对外的接口，加载某个模块，其实是加载该模块的 module.exports 属性（该对象只在脚本运行完才会生成）。require命令用于加载模块文件。**require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错**。

2. 特点：
   - 所有代码都运行在模块作用域，不会污染全局作用域
   - 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
   - 模块加载的顺序，按照其在代码中出现的顺序

3. 加载机制

   CommonJS 模块的加载机制是，输出的是值的拷贝。也就是说，一旦输出一个值，**模块内部的变化就影响不到这个值。**



#### 4. AMD 规范

AMD(Asynchronous Module Definition) 是在 Require.JS 推广的过程中对模块定义的规范化产出。

AMD 推崇依赖前置——即提前加载所有依赖，是 CommonJs 模块化规范的超集，作用在浏览器上。

==Require.js 会将模块中用到的所有的依赖先加载下来。==

AMD 是异步的，利用浏览器的并发能力，让模块的依赖阻塞减少。

语法：

```javascript
define(id?, dependencies?, factory){}
require([module], callback)
```

id 是模块的名字；dependencies 指定了该模块所依赖的模块列表，是一个数组；每个依赖的模块的输出都将作为参数依次传入 factory 构造函数中。id 和 dependencies 是可选的；factory 还可以是一个对象、字符串。

```javascript
// 如果有依赖参数，模块加载器不应该在工厂方法中扫描依赖性。
define(['module1', 'module2'], function(module1, module2) {
    function foo(){}
    return {foo: foo};
})
// AMD 规范允许输出模块兼容 CommonJS 规范，这时 define 方法如下
define(function(require, exports, module) {
    var requestedModule1 = require('./module1')
    var requestedModule2 = require('./module2')
    function foo(){}
    return {foo: foo}
})

// factory 为对象和字符串时
define({"foo": "bar"});
define(`I am a template. My name is {{name}}.`)
```

优点：适合在浏览器环境中加载模块，可以实现并行加载多个模块。

缺点：提高了开发成本，并不能按需加载，而是提前加载所有的依赖



#### 5. CMD 规范

CMD(Common Module Definition) 是 Sea.JS 推广的过程中对模块定义的规范化产出。

CMD 推崇依赖就近（按需加载）。CMD 规范尽量保持简单，并与 CommonJS 规范中的 Module 保持兼容，**通过 CMD 规范编写的模块，可以在 NodeJS 中运行**。

CMD 中 require 依赖的描述用数组，则是异步加载，如果是单个依赖使用字符串，则是同步加载。

==SeaJS 与 RequireJS 不同，SeaJS 是遇到了 require 方法才会加载依赖，遵循 CMD 规范==

#### 6. UMD 规范

UMD(Universal Module Definition) 是随着大前端的趋势产生，希望提供一个前后端跨平台的解决方案（支持 AMD / CMD / CommonJS 模块方式）。

实现原理：

- 先判断是否支持 Node.js 模块格式（exports 是否存在），存在则使用 Node.js 模块格式
- 判断是否支持 AMD 模块格式 （define 是否存在），存在则使用 AMD 模块格式
- 前两个都不存在则将模块公开到全局

```javascript
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));
```



#### 7. ES Module

ES Module 的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。

CommonJS 和 AMD 模块，其本质实在运行时生成一个对象进行导出，成为“**运行时加载**”，没法进行“**编译优化**”，而 ES Module 不是对象，而是通过 export 命令显示指定输出的代码，再通过 import 命令输入。

这称为“编译时加载”或者静态加载，即 ES Module 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES Module 模块本身，因为它不是对象。

语法：

​	export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

特点：

- 静态编译
- 输出的是值引用，而非值拷贝
- import 只能写在顶层，因为是静态语法

[ES6-Babel-Browserify使用教程](#ES6-Babel-Browserify使用教程)

​	简单来说就一句话：**使用Babel将ES6编译为ES5代码，使用Browserify编译打包js**。



#### CommonJS 与 ES6 模块的差异

- CommonJS 模块输出的是**值的拷贝**，ES6 模块输出的是**值的引用**。

  ES6 模块的运行机制与 CommonJS 不一样。**ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块**。也就是说，一旦输出一个值，**CommonJS 模块内部的变化就影响不到这个值。而 ES6 模块内部的变化会影响到这个值**。

- CommonJS 模块是**运行时加载**，ES6 模块是**编译时输出接口**。

  因为 CommonJS 加载的是一个对象（module.exports），对象只有在有脚本运行的时候才能生成。而 ES6 模块不是一个对象，只是一个静态的定义。在代码解析阶段就会生成。

  

  ES6 模块是编译时输出接口，因此有如下2个特点：

  - import 命令会被 JS 引擎静态分析，优先于模块内的其他内容执行
  - export 命令会有变量声明提升的效果,所以import 和 export 命令在模块中的位置并不影响程序的输出。

  异步加载模块，不会造成因网络问题而出现的假死。

  显式地列出其依赖关系，并以函数(定义此模块的那个函数)参数的形式将这些依赖进行注入。

  在模块开始时，加载所有所需依赖。即在 import 时可以指定加载某个输出值而不是加载整个模块。

#### AMD 和 CMD 的区别有哪些？

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从2.0开始也改成可以延迟执行（根据写法不同，处理方式也不同）。CMD 推崇 as lazy as possible。

2. CMD 推崇**依赖就近**，AMD 推崇**依赖前置**。看代码：

   ```javascript
   // CMD
   define(function(require, exports, module) {
       var a = require('./a')
       a.doSomething()
       // ...
       var b = require('./b') // 依赖可以就近书写
       b.doSomething()
       // ...
       exports.xxx = xxx
   })
   
   // AMD
   define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
       a.doSomething()
       // ...
       b.doSomething()
       // ...
       return {xxx, xxxx}
   })
   ```

3. AMD 的 API 默认是**一个当多个用**，CMD 的 API 严格区分，推崇**职责单一**。比如 AMD 里，require 分局部 require 和全局 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 `seajs.use` 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。

   --玉伯

#### 模块化的好处

- 模块的版本管理：通过别名等配置，配合构建工具，可以轻松实现模块的版本管理
- 提高可维护性：模块化可以实现每个文件的职责单一，非常有利于代码的维护，减少全局变量污染
- 可复用性：前端模块功能的封装，极大的提高了代码的可复用性
- 前端性能优化：对于前端开发来说，异步加载模块对于页面性能非常有益。
- 跨环境共享模块：CMD 模块定义规范与 NodeJS 的模块规范非常相近，所以通过 Sea.JS 的 NodeJS 版本，可以方便的实现模块的跨服务器和浏览器共享。

#### 总结

- CommonJS规范主要用于服务端编程，加载模块是同步的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。
- AMD规范在浏览器环境中异步加载模块，而且可以并行加载多个模块。不过，AMD规范开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅。
- CMD规范与AMD规范很相似，都用于浏览器编程，依赖就近，延迟执行，可以很容易在Node.js中运行。不过，依赖SPM 打包，模块的加载逻辑偏重
- **ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案**。

### 18、forEach、for-in、for-of 三者的区别

#### 1. forEach

对数组的每一个元素执行一次提供的函数，并且不能用 `return`、`break` 等中断循环，不会改变原数组，无返回值。

- 默认数组forEach回调函数内部的 this 指向的是 window 对象。

#### 2. for-in

for-in语句是一种严格的迭代语句、用于**枚举**对象中的**非符号键**属性。

The **`for...in` statement** iterates over all **enumerable properties**(enumerable: true) of an object that are **keyed by strings** (ignoring ones keyed by **Symbols**), including inherited enumerable properties. The loop will iterate over all enumerable properties of the object itself and those the object inherits from its prototype chain (properties of nearer prototypes take precedence over those of prototypes further away from the object in its prototype chain).

```javascript
for (const propName in window) {
    document.write(propName);
}
```

这个例子使用了 for-in 循环显示了 BOM 对象 window 的所有属性。每次执行循环，都会给变量 propName 赋予一个 window 对象的属性名作为值，直到 window 的所有==可枚举==属性都被枚举一遍（返回的顺序因浏览器而异）。也可以用于遍历数组元素，但是不能保证它会以任何特定的顺序返回索引，同时，数组的 `non-integer` 属性以及其他继承的属性也会遵循以上规则返回。

#### 3. for-of

for-of 语句是一种严格的迭代语句，用于遍历**可迭代对象**的元素。==数组适用于这种迭代语句。==

for-of 循环会按照**可迭代对象**的 next()方法产生值的顺序迭代元素。

#### 4. Difference between `for...of` and `for...in`

Both `for...in` and `for...of` statements iterate over something. The main difference between them is in what they iterate over.

The `for...in` statement iterates over the **enumerable properties** of an object, in an arbitrary order.

The `for...of` statement iterates over values that the **iterable object** defines to be iterated over.

### 19、迭代器与生成器



### 20、JSON

- 对象中包含的 undefined 值会被忽略，如果是数组则会被置为Null
- 对象属性必须加双引号

### 21、DOM

- 尝试访问一个不存在的节点时，返回 null
- nodeType: 1——元素节点，2——属性节点，3——文本节点



### 22、事件

#### 1	事件冒泡

**事件冒泡**是指当目标元素事件被触发，该事件会沿 DOM 树一路向上，在经过的每个节点上依次触发，直至到达 document 对象。

- 不是所有事件都可以冒泡，例如让元素获得输入焦点的focus事件以及失去输入焦点的blur事件就都不会冒泡。(不会向外传递事件。但是仍然会捕获)

#### 2	事件委托

”过多事件处理程序“的解决方案就是使用**事件委托**。使用该方法可以改善页面性能。事件委托利用事件冒泡，可以只使用一个事件处理程序来管理一种类型的事件。这意味着可以为整个页面指定一个 onclick 事件处理事件，而不用为每个可点击元素分别指定事件处理程序。

如果对页面中所有需要使用 onclick 事件处理程序的元素都如发炮制，结果就会出现大片雷同的只为指定事件处理程序的代码。如果使用**事件委托**，只要给所有元素的共同祖先节点添加一个事件处理程序，就可以解决问题。

- 利用事件委托可以实现动态绑定，不需要等待监听的 DOM 节点加载。[link1](https://blog.csdn.net/lqx_sunhan/article/details/79448960?utm_medium=distribute.pc_relevant_bbs_down.none-task-blog-baidujs-1.nonecase&depth_1-utm_source=distribute.pc_relevant_bbs_down.none-task-blog-baidujs-1.nonecase) [link2](https://blog.csdn.net/qq_32791691/article/details/63684507?biz_id=102&utm_term=javascript%E5%88%A9%E7%94%A8%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%89%98%E5%AE%9E%E7%8E%B0%E5%8A%A8%E6%80%81%E7%BB%91%E5%AE%9A&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-5-63684507&spm=1018.2118.3001.4187)

**Note:** Delegated event handlers do not work for SVG.

#### 3	事件捕获



#### 4	事件处理程序

在HTML需要进行转移的字符：&、"、<、>



### 23、正则表达式

### 24、offsetHeight, clientHeight, scrollHeight, height的区别

#### 1	offsetHeight -- with the exception of margin

`HTMLElement.offsetHeight` returns the height of an element, including vertical padding and borders, as an integer. Typically, `offsetHeight` is a measurement in pixels of the element's CSS height, including any **==borders, padding, and horizontal scrollbars==**(if renderd).

If the element is hidden (for example, by setting `style.display` on the element or one of its ancestors to `none`), then `0` is returned.	**--MDN**

#### 2	clientHeight -- 内部高度

returns the inner height of an element in pixels, including **==padding==** but not the horizontal scollbar height, border, or margin.	**--stackoverflow**

`clientHeight` can be calculated as: **==CSS height + CSS padding - height of horizontal scrollbar==** (if present).

When `clientHeight` is used on the root element (the `<html>` element), (or on `<body>` if the document is in quirks mode), the viewport's height(excluding any scrollbar) is returned.	**--MDN**

#### 3	scrollHeight

`scrollHeight` is a measurement of the height of an element's content **==including not visible on the screen due to overflow==**.

`scrollHeight` 的值等于该元素在不使用滚动条的情况下为了适应视口中所用内容所需的最小高度。 没有垂直滚动条的情况下，`scrollHeight` 值与元素视图填充所有内容所需要的最小值 `clientHeight` 相同。包括元素的padding，但不包括元素的border和margin。**==`scrollHeight` 也包括 ::before 和 ::after这样的伪元素。==**

未滚动部分：`scrollHeight - scrollTop - clientHeight`

#### 4	height

The `height` CSS property specifies the height of an element. By default the property defines the height of the **==content area==**. If `box-sizing` is set to `border-box`, however, it instead determines the height of the border area(content + padding + border).



### 25、escape()、encodeURI() 与 encodeURIComponent()

### 26、callback

A *callback* is a function that is passed as an argument to another function and is ==**executed after its parent function has completed**==. Callbacks are special because they patiently wait to execute until their parent finishes. Meanwhile, the browser can be executing other functions or doing all sorts of other work.

### JQuery

#### 1. `$().append()` 和 `$().appendTo()` 的区别

两个方法都是用于在被选元素的结尾（内部）插入指定元素，不同之处在于：内容的位置和选择器

Syntax: 

- $(selector).append(content)

- $(content).appendTo(selector)

  | 参数     | 描述                               |
  | -------- | ---------------------------------- |
  | context  | 必须。规定要插入的内容。           |
  | selector | 必须。规定把内容追加到哪个元素内。 |

  

#### 2. $().clone(true|false(default))

参数规定是否需要同时复制**元素的属性**和**事件处理程序**。

#### 3. `$(document) .ready()` 与 `window. onload` 的区别

$(document).ready: executes when HTML-Document is loaded and DOM is ready

$(window).load: executes when complete page is fully loaded, including all frames, objects and images.

​	---stackoverflow

load 在window 上当页面加载完成后触发，在窗套（<feameset>）上当所有窗格（<frame>）都加载完成后触发，在 `<img>` 元素上当图片完全加载后触发，在 `<object>` 元素上当相应对象加载完成后触发。——《红宝书》。

window.onload 必须等到页面内包括图片的所有元素和资源加载完毕后才能执行，也就是[图片](#4、$(document) .ready()与window. onload的时间点)中的时间点2； $(document).ready()是DOM加载完毕后就执行，不必等到整个网页资源加载完毕，也就是在上述图片的时间点1。所以，使用document.ready()方法的执行速度比window.onload的方法要快。


### 库的使用

#### #ES6-Babel-Browserify使用教程

##### 1. babel-cli & babel-preset-es2015

用于把 ES6 转换成 ES5；

语法：`babel [input_dir] -d [output_dir]`

##### 2. browserify

打包工具，将一个js入口文件作为目标，根据目标路径生成一个文件（xxx/bundle.js)，该文件打包入口文件及其所有依赖到一个js文件中

语法：`browserify [Entry(xxx/app.js)] -o [Output(xxx/bundle.js)]`


## 三、网络

一些名词：

- 最大传送单元MTU(Maximum Transfer Unit): 数据链路层协议规定的一个数据帧中的数据字段最大长度。例如，最常用的以太网规定其MTU值是1500字节。
- 报文段往返时间RTT
- ARQ(Automatic Repeat reQuest): TCP中的自动重传请求
- 最大报文段长度MSS(Maximum Segment Size): MSS是每一个TCP报文段中的**数据字段**的最大长度。
- rwnd(receiver window): TCP协议中接收方的接收窗口，用于流量控制
- cwnd(congestion window): TCP协议中发送方让自己的发送窗口等于拥塞窗口
- ssthresh: 拥塞算法中的慢开始门限
- 最长报文段寿命MSL(Maximum Segment Lifetime): 在客户端发送确认连接释放报文后进入**TIME-WAIT**状态，经过**时间等待计时器**设置的时间**2MSL**后，客户端才进入到CLOSED状态
- ARP(Address Resolution Protocol) 协议: 根据 IP 地址获取**物理地址(MAC地址)**的一个TCP/IP协议

### #11、HTTP 协议

#### 1. HTTP请求

- 请求行

- 请求报头

  请求报头允许客户端向服务器传递请求的附加信息和客户端自身的信息。常见的请求报头有：

  - Accept：浏览器可以处理的内容类型。
  - Accept-Charset：浏览器可以显示的字符集。
  - Accept-Encoding：浏览器可以处理的压缩编码类型。
  - Accept-language：浏览器使用的语言。
  - Connection：浏览器与服务器的连接类型。
  - Content-Type：浏览器提交的内容类型（如 `application/x-www-formurlencoded` 为提交表单时使用的)。
  - Cookie：页面中设置的Cookie。
  - Host：发送请求的页面所在的域。
  - Referer：发送请求的页面URI。
  - User-Agent：浏览器的用户代理字符串。

- 请求正文

  当使用POST, PUT等方法时，通常需要客户端向服务器传递数据，这些数据就存储在请求正文中。在请求报头中有一些与请求正文相关的信息，例如现在的web应用通常采用REST架构，请求的数据格式一般为json。这时就需要设置Content-Type: application/json。

#### 2. 服务器处理请求并返回HTTP报文

- 状态码由3位数构成，第1个数字定义了响应的类别，且有无重可能的取值：

  - 1xx: 指示信息--表示请求已接受，继续处理。

  - 2xx: 成功--表示请求已被成功接收、理解、接收。

  - 3xx: 重定向--要完成请求必须进行更进一步操作

  - 4xx: 客户端错误--请求有语法错误或请求无法实现

  - 5xx: 服务器端错误--服务器未能实现合法的请求。

    比较常见的状态码由：200、204、301、302、304、400、401、403、404、422、500 [状态码图](#1、状态码图)

- 响应报头

- 响应报文

#### 3. 状态码

- 301：永久性重定向。该状态码表示请求的资源已经被分配了新的URI，以后应使用资源所指的URI。也就是说，如果已经把资源对应的URI保存为标签了，这时应该按Location首部字段提示的URI重新保存。
- 302：临时性重定向。该状态码表示请求的资源已经被分配了新的URI，希望用户（本次）能使用新的URI访问。不会改变标签中的URI。
- 400：客户端请求报文中存在语法错误。
- 404：该状态码表示在服务器上找不到请求的资源。也可以在服务器端拒绝请求且不想说明理由时使用。
- 500：该状态码表示服务器端在执行请求时发生了错误。也可能是Web 应用存在bug或某些临时的故障。

#### 4. HTTPS

<img src="C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20201027223007861.png" alt="image-20201027223007861" style="zoom:67%;" />

#### 5. 端口号

- 80: HTTP
- 443: HTTPS

### 12、Ajax



### 13、从输入网址到网页渲染完成经历了什么？

1. 发送DNS服务器进行DNS解析，获取到我们对应web服务器对应的ip地址。
2. 与Web服务器建立TCP连接（三次握手 & 四次挥手）
3. 浏览器向Web服务器发送HTTP请求（[见11、HTTP协议](#11、HTTP 协议)）
4. 服务器处理请求并指定的url数据（这里也可能是错误信息或者重定向到新的url地址等）
5. 浏览器下载Web服务器返回的数据及解析html源文件
6. 根据文件生成DOM树和样式树合成我们的渲染树，解析js，最后渲染我们的页面然后显示出来。[浏览器解析渲染页面](#21、浏览器解析渲染页面)

### 14、DNS

DNS解析过程有两种查询方式：递归查询和迭代查询

域名服务器分为：根域名服务器->顶级域名服务器->权限域名服务器->本地域名服务器

下面是[迭代查询](#5、DNS迭代查询过程)的几个查询步骤：

1. **主机**m.xyz.com先向其**本地域名服务器**dns.xyz.com进行递归查询；
2. **本地域名服务器**采用迭代查询。它先向一个**根域名服务器**查询。
3. **根域名服务器**告诉**本地域名服务器**，下一个应查询的**顶级域名服务器**dns.com的IP地址。
4. **本地域名服务器**向**顶级域名服务器**dns.com进行查询。
5. **顶级域名服务器**dns.com告诉**本地域名服务器**，下一个应查询的**权限域名服务器**dns.abc.com的IP地址
6. **本地域名服务器**向**权限域名服务器**dns.abc.com进行查询
7. **权限域名服务器**dns.abc.com告诉**本地域名服务器**，所查询的主机的IP地址。
8. **本地域名服务器**最后把查询结果告诉**主机**m.xyz.com



### 15、运输层UDP和TCP的复用和分用

复用：应用层所有的应用进程都可以通过运输层再传送到网络层。

分用：运输层从IP层收到发送给各应用进程的数据后，必须分别交付指明的各应用进程。

### 18、GET和POST的区别

|                          | GET                                                          | POST                                                         |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 后退按钮/刷新            | 无害                                                         | 数据会被重新提交（浏览器应该告知用户数据会被重新提交。       |
| 书签                     | 可收藏为书签                                                 | 不可收藏为书签                                               |
| 缓存                     | 能被缓存                                                     | 不能缓存                                                     |
| 编码类型                 | application/x-www-form-urlencoded                            | application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码。 |
| 历史                     | 参数保留在浏览器历史中                                       | 参数不保留在浏览器历史中                                     |
| 对数据长度的限制         | 当发送数据时，GET 方法向 URL 添加数据；URL的长度是受限制的（URL的最大长度是2048个字符）。 | 无限制                                                       |
| 对数据类型的限制         | 只允许ASCII字符                                              | 没有限制。也允许二进制数据                                   |
| 安全性                   | 与 POST 相比，GET 的安全性较差，因为所发送的数据是 URL 的一部分 | 较安全，因为参数不会被保存在浏览器历史或web服务器日志中。    |
| 可见性                   | 数据在 URL 中对所有人都是可见的                              | 数据不会显示在 URL 中                                        |
| 幂等性                   | GET 请求被执行一次与连续执行多次的效果是一样的，这取决于后端服务器的实际状态 | 而 POST 不是，如果调用多次，就会增加多行记录                 |
| 是否会修改服务器中的数据 | 不会                                                         | 会                                                           |



### 20、HTTP缓存

## 四、Vue 问题

### 1、MVVM

MVVM分为Model、View、ViewModel三者

- Model: 代表数据模型，数据和业务逻辑都是在Model层中定义
- View: 代表UI视图，负责对数据的展示
- ViewModel: 负责监听Model中数据的改变并控制视图的更新，处理用户交互操作

Model和View并没有直接关联，而是通过ViewModel来进行联系，Model和ViewModel之间有着双向数据绑定的联系。因此当Model中的数据改变时会触发View层的刷新，View中由于用户交互操作而改变的数据也会在Model中同步。

这种模式实现了Model和View的数据自动同步，因此开发者只需要专注对数据的维护操作即可，而不需要自己操作dom。

### 2、Vue 组件通信

- [ ] 父传子用`props`传递

- [ ] 子传父用`$emit`传递

- [ ] 祖孙之间的传值可以利用provide inject模式

- [ ] 非父子之间的传值，挂载一个空实例，中央事件总线机制。例如：

  ```javascript
  <body>
    <div id="root">
      <child content="child1"></child>
      <child content="child2"></child>
    </div>
  
    <script>
      Vue.prototype.bus = new Vue()
  
      Vue.component('child', {
        data() {
          return {
            selfContent: this.content
          }
        },
        props: {
          content: String
        },
        template: `<div @click="handleClick">{{ selfContent }}</div>`,
        methods: {
          handleClick() {
            this.bus.$emit('change', this.selfContent)
          }
        },
        mounted() {
          var this_ = this
          this.bus.$on('change', function (msg) {
            console.log(msg)
          })
        }
      })
  
      var vm = new Vue({
        el: '#root'
      })
    </script>
  </body>
  ```

  

### 3、给 Vue 添加/删除 响应式数据

使用vm.\$set() 和 vm.\$delete()

### 4、在vue中怎么监听数据

1. watch 属性中监听：

   - 监听简单数据类型

     ```javascript
     watch: {
         obj(newVal, oldVal) {
             console.log(newVal, oldVal)
         }
     }
     ```

   - 监听引用数据类型

     ```javascript
     watch: {
     	obj: {
     		handle(newVal, oldVal) {
     			console.log(222)
     			console.log(newVal, oldVal)
     		},
     		deep: true
     	}
     }
     ```

     

2. computed 属性中监听

### 5、怎么解决刷新页面vuex中的数据消失的问题

实现数据持久化，配合localStorage使用，把vuex中的数据同步到[localStorage](#`localStorage` 和 `sessionStorage` 有相同的方法：)当中：

```javascript
localStorage.setItem('state', state)
```

 

### 6、VUE3与2在响应式的实现上的区别

vue2采用的使 defineProperty去定义get，set，而vue3改用了proxy。也代表着vue 放弃了兼容ie

### 7、像vue-router、vuex他们都是作为vue插件，请说一下他们分别都是如何在vue中生效的？

通过vue的插件系统，用vue.mixin混入到全局，在每个组件的生命周期的某个阶段注入组件实例

### 8、请你说一下vue的设计架构

vue2采用的是典型的混入式架构，类似于express和jquery，各部分分模块开发，再通过一个mixin去混入到最终暴露到全局的类上。



## 五、浏览器

### #17、Reflows & Repaints

A **repaint** occurs when changes are made to an elements skin that changes visibly, but do not affect its layout.

Examples of this include `outline`, `visibility`, `background`, or `color`. According to Opera, repaint is expensive because the browser must verify the visibility of all other nodes in the DOM tree.

A **reflow** is even more critical to performance because it involves changes that affect the layout of a portion of the page (or the whole page).

Examples that cause reflows include: adding or removing content, explicitly or implicitly changing `width`, `height`, `font-family`, `font-size` and more.

​																																					——StackOverFlow

### 

### #21、浏览器解析渲染页面

浏览器再收到HTML,CSS,JS文件后，它是如何把页面呈现到屏幕上的？[浏览器渲染过程图](#2、浏览器渲染过程图)

浏览器是一个边解析边渲染的过程。首先浏览器解析HTML文件构建DOM树，然后解析CSS文件构建样式树，合成渲染树，等到渲染树构建完成后，浏览器开始布局渲染树并将其绘制到屏幕上。这个过程涉及到[Reflows & Repaints](#17、Reflows & Repaints)



## 六、算法

### 1、编写一个函数，该函数返回一个字符串的第一个只出现一次的字符

### 2、编写一个函数，该函数通过二分法将数组升序排序

### 3、用递归方法手写深拷贝，要同时考虑循环引用的情况

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj == null) return obj;  // 如果对象是 null 或 undefined，不需要深拷贝
  if (obj instanceof Date) return new Date(obj);  // Date
  if (obj instanceof RegExp) return new RegExp(obj);  // RegExp
  // 函数不需要深拷贝
  if (typeof obj !== "object") return obj;  // function
  // 解决循环引用
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);
  for (let prop in obj) {
    // 因为 cloneObj 跟 obj 是同一类型的，所以 cloneObj 和 obj原型链是相同的，不需要克隆原型链上的属性
    if (obj.hasOwnProperty(prop)) {
      cloneObj[prop] = deepClone(obj[prop], hash);
    }
  }
  return cloneObj;
}
```



## 其他

### 前端优化的方案

### Git 和 SVN

#### 关于Git和SVN版本管理工具，以下说法错误的是：

A. Git是分布式，SVN是中心式

B. Git没有全局的版本号，而SVN有

C. Git和SVN都在本地保存日志

D. Git重命名文件历史会丢失，SVN则会保留



### 面试题

#### 以下关于前端移动端的观点，错误的说法是：

A. 移动端建议用 touch 事件代替 click , 因为 click 事件有延迟

B. 可以用 translate3D 来触发GPU加速动画效果

C. viewport的 initial-scale=1.0 表示网页初始大小占屏幕100%

D. 移动设备横竖屏翻转，页面不会出现重绘

#### 指定Git分支的若干个提交合并到主分支的命令是

A. push ==B. cherry-pick== C. pull D. merge

#### 浏览器渲染引擎有哪些

[1] IE浏览器 (trident内核)

[2] Mozilla firefox (gecko内核)

[3] Safari (webkit内核）

[4] Chrome (Blink内核)

[5] Opera (原为Presto内核，现为Blink内核)

## 附录

#### #1、状态码图

![状态码](https://github.com/JA-Coding-J/Front-end_FQ/blob/master/images/%E7%8A%B6%E6%80%81%E7%A0%81.png)



#### #2、浏览器渲染过程图

![浏览器渲染过程](https://github.com/JA-Coding-J/Front-end_FQ/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E8%BF%87%E7%A8%8B.png)

#### #3、CSS选择器优先级顺序

<img src="https://github.com/JA-Coding-J/Front-end_FQ/blob/master/images/css%E9%80%89%E6%8B%A9%E5%99%A8%E4%BC%98%E5%85%88%E7%BA%A7%E9%A1%BA%E5%BA%8F.png" alt="css选择器优先级顺序" style="zoom: 67%;" />

#### #4、$(document) .ready()与window. onload的时间点

![区别](https://github.com/JA-Coding-J/Front-end_FQ/blob/master/images/%24(document)%20.ready()%E4%B8%8Ewindow.%20onload%E7%9A%84%E5%8C%BA%E5%88%AB.png)

#### #5、DNS迭代查询过程

![DNS迭代查询过程](https://github.com/JA-Coding-J/Front-end_FQ/blob/master/images/DNS%E8%BF%AD%E4%BB%A3%E6%9F%A5%E8%AF%A2%E8%BF%87%E7%A8%8B.webp)

#### #6、大前端模块化规范

![大前端模块化规范](https://github.com/JA-Coding-J/Front-end_FQ/blob/master/images/%E5%A4%A7%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96%E8%A7%84%E8%8C%83.webp)
