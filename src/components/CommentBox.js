import React from 'react';

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
    }
    changeHandle(e) {
        console.log(e.target.value)
        this.props.changeHandle(e.target.value)
        e.target.value = null
        e.stopPropagation();
    }
    render() {
        return (
            <div>
                <input className="" onChange={this.changeHandle.bind(this)}></input>
            </div>
        )
    }
}

export default CommentBox;