class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(vchild) {
        vchild.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

const insertChildren = (element, children) => {
    for (const child of children) {
        if (typeof child === 'object' && child instanceof Array) {
            insertChildren(child);
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
        insertChildren(element, children);
        return element;
    },
    render(vdom, parent) {
        vdom.mountTo(parent);
    },
};

export class Component {
    constructor() {
        this.children = [];
    }
    mountTo(parent) {
        let vdom = this.render();
        vdom.mountTo(parent);
    }
    setAttribute(name, value) {
        this[name] = value;
    }
    appendChild(vchild) {
        this.children.push(vchild);
    }
}
