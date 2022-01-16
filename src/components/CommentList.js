import React from 'react';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { comments } = this.props
        return (
            <ul>
                {comments.map(item => {
                    return <li>{item}</li>
                })}
            </ul>
        )
    }
}

export default CommentList;