import React from 'react';
import './button.css';

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0
        }
    }
    likeButton() {
        // console.log(this.state.likes);
        console.log(this)
        // alert(this.state.likes)
        this.setState({
            likes: ++this.state.likes
        })
    }
    // bind(fn, this, ...args) {
    //     fn.apply(this, args);
    // }
    render() {
        const {text } =  this.props;
        return (
            <div>
                <button className="button" value="button" onClick={this.likeButton.bind(this)}>
                    {text || 'click me '}
                </button>{this.state.likes}
            </div>
        )
    }
}

export default Button;