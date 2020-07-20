import { ToyReact, Component } from './ToyReact';

class MyComponent extends Component {
    render() {
        return <div>cool</div>;
    }
}

// 调 ToyReact.createElement 这个方法
let a = (
    <MyComponent name="a" id="ida">
        <span id="lbj">lebronjs</span>
    </MyComponent>
);

// 调 ToyReact.render 挂载到 body
ToyReact.render(a, document.body);
