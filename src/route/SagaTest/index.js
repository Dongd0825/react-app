import React from 'react';
import { connect } from 'react-redux';
import actions from './actions'

class Counter extends React.Component {
  constructor(props){
    super(props);
  }
  
    render(){
      return (
        <div>
          <p>{this.props.num}</p>
          <button onClick={this.props.add}>+1</button>
        </div>
      )
    }
}
const mapStateToProps = (state) => {
  return state
}

export default connect(
  mapStateToProps,
  actions,
)(Counter);