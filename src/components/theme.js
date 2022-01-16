import React from 'react';

class Theme extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
        <div>
            <button>浅色主题</button>
            <button>深色主题</button>
        </div>)
    }
}

export default Theme;