import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { getVizType } from "../redux/selectors/word";
import Wordheader from './wordheader';
import Wordcloud from './wordcloud';
import Bargraph from './bargraph';
import './App.css'


class VizWizard extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    return (
      <div>
        <Wordheader/>
        {this.props.vizType == 'wordcloud' ? <Wordcloud/> : <Bargraph/>}
        {/* <span> {this.state.error} </span> */}
      </div>
    );
  }
}

export default connect(state => ({ vizType: getVizType(state) }))(VizWizard);