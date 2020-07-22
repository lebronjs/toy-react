import { ToyReact, Component } from './ToyReact';

class Square extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            value: 'o',
            index: this.props.value,
        };
    }
    render() {
        return (
            <button
                className="square"
                onClick={() => {
                    this.setState({ value: 'X' });
                }}
            >
                {this.props.value}
            </button>
        );
    }
}
class Board extends Component {
    renderSquare(i) {
        return <Square value={i} />;
    }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div>{this.children}</div>
            </div>
        );
    }
}

// class MyComponent extends Component {
//     render() {
//         return (
//             <div>
//                 <h3>湖人总冠军</h3>
//                 <ul>
//                     <li id="1">{Number(false)}</li>
//                     <li id="2">1</li>
//                     <li id="3">{1 + 1}</li>
//                     <li id="3">{this.children}</li>
//                 </ul>
//             </div>
//         );
//     }
// }

// 先调 ToyReact.createElement 这个方法
let a = (
    <Board>
        <h2>123</h2>
    </Board>
);

// let a = (
//     <MyComponent name="a" id="ida">
//         <span>lebronjs</span>
//     </MyComponent>
// );

// 再调 ToyReact.render 挂载到 body
ToyReact.render(a, document.body);
