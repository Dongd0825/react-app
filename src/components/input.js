import React from 'react';
import { setInterval } from 'timers';

class DigitalClock extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            value: 'a',
            timer: null
        }
    }
    onChangeHandle(e) {
        this.setState({
            value: e.target.value
        })
    }
    componentDidMount() {
        this.state.timer = setInterval(() => {
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
            // <input value={this.state.value} onChange={this.onChangeHandle.bind(this)}></input>
            <input ref={(inputRef)=> this.inputRef = inputRef}></input>
        )
    }
}

export default DigitalClock;