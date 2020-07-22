class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            console.log(RegExp.$1);
            let eventName = RegExp.$1.replace(/^[\s\S]/, (s) =>
                s.toLocaleLowerCase()
            );
            this.root.addEventListener(eventName, value);
        }
        if (name === 'className') {
            name = 'class';
        }
        this.root.setAttribute(name, value);
    }
    appendChild(vchild) {
        let range = document.createRange();
        if (this.root.children.length) {
            range.setStartAfter(this.root.lastChild);
            range.setEndAfter(this.root.lastChild);
        } else {
            range.setStart(this.root, 0);
            range.setEnd(this.root, 0);
        }
        vchild.mountTo(range);
    }
    mountTo(range) {
        range.deleteContents && range.deleteContents();
        range.insertNode(this.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
    mountTo(range) {
        range.deleteContents && range.deleteContents();
        range.insertNode(this.root);
    }
}

export class Component {
    constructor() {
        this.children = [];
        this.props = Object.create({ toyname: 'react' });
    }
    setAttribute(name, value) {
        this[name] = value;
        this.props[name] = value;
    }
    appendChild(vchild) {
        this.children.push(vchild);
    }
    mountTo(range) {
        this.range = range;
        this.update();
    }
    update() {
        this.range.deleteContents && this.range.deleteContents();
        let vdom = this.render();
        vdom.mountTo(this.range);
    }
    setState(state) {
        let merge = (oldState, newState) => {
            for (const p in newState) {
                if (typeof newState[p] === 'object') {
                    if (typeof oldState[p] !== 'object') {
                        oldState[p] = {};
                    }
                    merge(oldState[p], newState[p]);
                } else {
                    oldState[p] = newState[p];
                }
            }
        };
        if (!this.state && state) {
            this.state = {};
        }
        console.log(this.state, state);
        merge(this.state, state);
        this.update();
    }
}

export let ToyReact = {
    createElement(type, attributes, ...children) {
        let element;
        /** 1、创建标签 */
        if (typeof type === 'string') {
            // 原生标签元素
            element = new ElementWrapper(type);
        } else {
            // 自定义标签元素
            element = new type();
        }
        /** 2、调用各自的 setAttribute 方法设置属性 */
        for (const name in attributes) {
            if (attributes.hasOwnProperty(name)) {
                const value = attributes[name];
                element.setAttribute(name, value);
            }
        }
        /** 3、插入子元素 */
        const insertChildren = (element, children) => {
            //console.log(element, children);
            for (const child of children) {
                if (typeof child === 'object' && child instanceof Array) {
                    insertChildren(element, child);
                } else {
                    if (
                        !(child instanceof Component) &&
                        !(child instanceof ElementWrapper) &&
                        !(child instanceof TextWrapper)
                    ) {
                        child = String(child);
                    }
                    if (typeof child === 'string') {
                        child = new TextWrapper(child);
                    }
                    element.appendChild(child);
                }
            }
        };
        insertChildren(element, children);
        //console.log(element);
        return element;
    },
    render(vdom, parent) {
        console.log('toyrender', vdom, parent);
        let range = document.createRange();
        if (parent.children.length) {
            range.setStartAfter(parent.lastChild);
            range.setEndAfter(parent.lastChild);
        } else {
            range.setStart(parent, 0);
            range.setEnd(parent, 0);
        }
        vdom.mountTo(range);
    },
};
