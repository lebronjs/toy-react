import { ToyReact, Component } from './ToyReact';

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
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
                {this.state.value || this.props.value}
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

// 先调 ToyReact.createElement 这个方法
let a = (
    <Board>
        <h2>123</h2>
    </Board>
);

// 再调 ToyReact.render 挂载到 body
ToyReact.render(a, document.body);
