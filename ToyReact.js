class ElementWrapper {
    constructor(type) {
        this.type = type;
        this.props = Object.create(null);
        this.children = [];
    }
    setAttribute(name, value) {
        // if (name.match(/^on([\s\S]+)$/)) {
        //     console.log(RegExp.$1);
        //     let eventName = RegExp.$1.replace(/^[\s\S]/, (s) =>
        //         s.toLocaleLowerCase()
        //     );
        //     this.root.addEventListener(eventName, value);
        // }
        // if (name === 'className') {
        //     name = 'class';
        // }
        this.props[name] = value;
    }
    appendChild(vchild) {
        this.children.push(vchild);
    }
    mountTo(range) {
        range.deleteContents && range.deleteContents();
        let element = document.createElement(this.type);
        for (let name in this.props) {
            let value = this.props[name];
            if (name.match(/^on([\s\S]+)$/)) {
                console.log(RegExp.$1);
                let eventName = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLocaleLowerCase());
                element.addEventListener(eventName, value);
            }
            if (name === 'className') {
                name = 'class';
            }
            element.setAttribute(name, value);
        }
        for (const child of this.children) {
            let range = document.createRange();
            if (element.childNodes.length) {
                range.setStartAfter(element.lastChild);
                range.setEndAfter(element.lastChild);
            } else {
                range.setStart(element, 0);
                range.setEnd(element, 0);
            }
            child.mountTo(range);
        }
        range.insertNode(element);
    }
}

class TextWrapper {
    constructor(content) {
        this.type = '#vtext';
        this.props = Object.create(null);
        this.children = [];
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
        console.log(this.props);
    }
    get type() {
        return this.constructor.name;
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
        let vdom = this.render();
        if (this.oldVdom) {
            console.log('news', vdom);
            console.log('old', this.oldVdom);
            let isSameNode = (node1, node2) => {
                if (node1.type !== node2.type) {
                    return false;
                }
                if (Object.keys(node1.props).length !== Object.keys(node2.props).length) {
                    return false;
                } else {
                    for (const name in node1.props) {
                        if (node1.props[name] !== node2.props[name]) {
                            return false;
                        }
                    }
                }
                return true;
            };
            let isSameTree = (node1, node2) => {
                if (!isSameNode(node1, node2)) {
                    return false;
                }
                if (node1.children.length !== node2.children.length) {
                    return false;
                }
                for (let i = 0; i < node1.children.length; i++) {
                    const child1 = node1.children[i];
                    const child2 = node2.children[i];
                    if (!isSameTree(child1, child2)) {
                        return false;
                    }
                    return true;
                }
            };
            if (isSameTree(this.oldVdom, vdom)) {
                return true;
            } else {
                vdom.mountTo(this.range);
            }
        } else {
            vdom.mountTo(this.range);
        }
        this.oldVdom = vdom;
    }
    setState(state) {
        let merge = (oldState, newState) => {
            for (const p in newState) {
                if (typeof newState[p] === 'object' && newState[p]) {
                    if (typeof oldState[p] !== 'object') {
                        Array.isArray(newState[p]) ? (oldState[p] = []) : (oldState[p] = {});
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
            console.log('insert:', element, children);
            for (const child of children) {
                if (typeof child === 'object' && child instanceof Array) {
                    insertChildren(element, child);
                } else {
                    if (child === null || child === void 0) {
                        child = '';
                    }
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
