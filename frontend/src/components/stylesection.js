import React, {Component} from 'react';
import { connect } from 'react-redux'
import { updateStyle } from "../redux/actions/word";
import { getDataType, getStyle, getVizType } from "../redux/selectors/word";
import Button from 'react-bootstrap/Button';
import store from "../redux/store/word";
import Drawer from '@material-ui/core/Drawer';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './stylesection.scss';
import { fontFamilys } from './constants/fonts';
import { colorPalette } from './constants/colors';
import { HuePicker, CirclePicker } from 'react-color';

const mapStateToProps = (state) => ({
  dataType: getDataType(state),
  vizType: getVizType(state),
  color: getStyle(state, 'color'),
  colorCodedBy: getStyle(state, 'colorCodedBy'),
  font: getStyle(state, 'font'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateStyle: (payload) => dispatch(updateStyle(payload)),
  };
}

class StyleSection extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sideBarOpen: false,
        hueColor: this.props.color == "rainbow" ? "#FF0000" : this.props.color,
      }  
    }

    toggleSidebar = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.setState({ sideBarOpen: open });
    };

     componentDidUpdate(prevProps) {
      if((prevProps.dataType !== this.props.dataType) ||  (prevProps.vizType !== this.props.vizType)){
        if(this.props.color == "rainbow") {
          this.setState({
            hueColor: "#FF0000",
          });
          if(document.getElementsByClassName("rainbowCircle")[0]) {
            document.getElementsByClassName("rainbowCircle")[0].style.boxShadow = "black 0px 0px 0px 3px inset";
          }
        } else {
          this.setState({
            hueColor: this.props.color,
          });
          if(document.getElementsByClassName("rainbowCircle")[0]) {
            document.getElementsByClassName("rainbowCircle").style.boxShadow = "none";
          }
        }
      }
    }

    updateColor = (color) => {
      const words = document.getElementsByClassName("word");
      for (var i = 0; i < words.length; i++) {
          words[i].style.fill=color.hex;
      }
      this.setState({hueColor: color.hex});
      document.getElementsByClassName("rainbowCircle")[0].style.boxShadow = "none";
    }

    handleRainbowClick = () => {
      this.setState({hueColor:"#FF0000"});
      this.props.updateStyle({type: "color", value: "rainbow"});
      document.getElementsByClassName("rainbowCircle")[0].style.boxShadow = "black 0px 0px 0px 3px inset";
    }

    render() {
        return (
          <React.Fragment>
            <Button onClick={this.toggleSidebar(true)}>Styles</Button>
            <Drawer anchor='right' open={this.state.sideBarOpen} onClose={this.toggleSidebar(false)}>
            <div className="sideBar">
              <div className="header">
                <h3>Filters</h3>
                <Button variant="link" onClick={this.toggleSidebar(false)} className="closeButton">Close</Button>
              </div>  
              {(this.props.color && (this.props.colorCodedBy=='none' || !this.props.colorCodedBy)) ?
                <div>
                  <h5>
                    Choose a color for the
                    {this.props.vizType == "wordcloud" ? <span> words</span> :  <span> bars</span> }
                  </h5>
                  <HuePicker
                    className="hueColorPicker"
                    color={this.state.hueColor}
                    onChange={this.updateColor}
                    onChangeComplete={(color) => this.props.updateStyle({type: "color", value: color.hex})}
                  />
                  <CirclePicker
                    className="circleColorPicker"
                    color={this.state.hueColor}
                    colors={colorPalette}
                    onChange={this.updateColor}
                    width="316px"
                    onChangeComplete={(color) => this.props.updateStyle({type: "color", value: color.hex})}
                  />
                  <div onClick={this.handleRainbowClick} className="rainbowCircle"></div>
                </div>
              : false }
              {this.props.colorCodedBy ?
                <div>
                  
                </div>
              : false }
              {this.props.font ?
                <FormControl>
                  <InputLabel>Font</InputLabel>
                  <Select
                    value={this.props.font}
                    onChange={(e) => this.props.updateStyle({type: "font", value: e.target.value})}
                  >
                    {fontFamilys.map((currentFont, index) => {
                      return <MenuItem value={currentFont}>{currentFont}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              : false }
            </div>
            </Drawer>
          </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleSection);
