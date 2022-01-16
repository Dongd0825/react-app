import React, {Component} from 'react';
import './App.css';
import Button from './components/button'
import DigitalClock from './components/DigitalClock'
import Comment from './components/Comment'
import ThemeContext from './theme-context'
import ThemeBar from './components/ThemeBar';

const themes = {
    light: {
        color: '#fff'
    },
    dark: {
        color: '#000'
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'light'
        }
        this.clickHandle = this.clickHandle.bind(this)
    }
    clickHandle(type) {
        this.setState({
            theme: type
        })
    }
    render() {
        const v = themes[this.state.theme]
        return (
            <ThemeContext.Provider value={v}>
                <div className="App">
                    {/* <Button text="click me1"></Button> */}
                    {/* <DigitalClock></DigitalClock> */}
                    {/* <Comment></Comment> */}
                    <button onClick = { () => this.clickHandle('light')}>浅色主题</button>
                    <button onClick = { () => this.clickHandle('dark')}>深色主题</button>
                    <ThemeBar></ThemeBar>
                </div>
            </ThemeContext.Provider>
        );
    }
}

export default App;
