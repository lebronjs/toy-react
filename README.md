# ToyReact

React 基本原理实现玩具版

---

## day 1

### 1、`@babel/plugin-transform-react-jsx`

> webpack babel-loader 的插件, 将 JSX 转变成 React 函数调用。  
>  `pragma`: 替换编译 JSX 表达式时使用的函数。  
> 默认是：`React.createElement`, 这里替换成了`ToyReact.createElement`

### 2、`let a = <MyComponent name="a" id="ida"><span id="lbj">lebronjs</span></MyComponent>`编译以后:

先获取元素`children`， 执行`... createElement("span" ....` 从内部一层层返回

```
var a = _ToyReact__WEBPACK_IMPORTED_MODULE_0__["ToyReact"].createElement(MyComponent, {
  name: "a",
  id: "ida"
}, _ToyReact__WEBPACK_IMPORTED_MODULE_0__["ToyReact"].createElement("span", {
  id: "lbj"
}, "lebronjs"));
```

### 3、调用的`render`，触发自定义组件的`mountTo`, 返回一个个`jsx`转义后的`createElement`函数

---

## day 2

### 1、 实现 `setState` 的功能

### 2、 实现 `on` 事件的监听

### 3、`document.createRange()`

> 返回一个 range 对象，可通过 `setStart` 、 `setEndAfter` 等设置指定节点内容范围

> range 可实现局部 re-render

---

## day 3

### 1、虚拟 dom
