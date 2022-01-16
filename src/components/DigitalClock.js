import React from 'react';
import { setInterval } from 'timers';

class DigitalClock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            value: 'a'
        }
    }
    onChangeHandle(e) {
        console.log('e',e.target.value)
        this.setState({
            value: e.target.value
        })
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 6000)
    }
    componentDidUpdate(currentProps, currentState) {
        // console.log(currentState)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        return (
            // <div>{this.state.date.toLocaleTimeString()}</div>
            <input value={this.state.value} onChange={this.onChangeHandle.bind(this)}></input>
        )
    }
}

export default DigitalClock;