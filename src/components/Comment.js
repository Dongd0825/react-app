import React from 'react'
import CommentBox from './CommentBox'
import CommentList from './CommentList'

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: ['a','b']
        }
    }

    addComment(newComment) {
        this.setState({
            comments: [...this.state.comments, newComment]
        })
    }

    render() {
        return (
            <div>
                <CommentList comments = {this.state.comments}></CommentList>
                <CommentBox changeHandle = {this.addComment.bind(this)} comments = {this.state.comments}></CommentBox>
            </div>
        )
    }
}

export default Comment;