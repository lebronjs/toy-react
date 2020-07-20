import { ToyReact, Component } from './ToyReact';

class MyComponent extends Component {
    render() {
        return (
            <div>
                <h3>湖人总冠军</h3>
                <ul>
                    <li id="1">{Number(false)}</li>
                    <li id="2">1</li>
                    <li id="3">{1 + 1}</li>
                </ul>
            </div>
        );
    }
}

// 先调 ToyReact.createElement 这个方法
let a = (
    <MyComponent name="a" id="ida">
        lebronjs
    </MyComponent>
);

// 再调 ToyReact.render 挂载到 body
ToyReact.render(a, document.body);
