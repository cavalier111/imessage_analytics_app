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
import { colorPalette, colorPaletteBg } from './constants/colors';
import { colorScales } from './constants/colorScales';
import { HuePicker, CirclePicker } from 'react-color';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const mapStateToProps = (state) => ({
  dataType: getDataType(state),
  vizType: getVizType(state),
  color: getStyle(state, 'color'),
  background: getStyle(state, 'color'),
  colorCodedBy: getStyle(state, 'colorCodedBy'),
  font: getStyle(state, 'font'),
  codeByOpacity: getStyle(state, 'codeByOpacity'),
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
        this.setState({
          codeByOpacity: !this.state.codeByOpacity,
        });
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

    toggleCodeByOpacity = () => {
      this.props.updateStyle({type: "codeByOpacity", value: !this.state.codeByOpacity})
      if(!this.state.codeByOpacity) {
        document.getElementById("colorPickerSection").className = "normal";
      } else if (this.props.colorCodedBy != 'none'){
        document.getElementById("colorPickerSection").className = "greyOut";
      }
      this.setState({
        codeByOpacity: !this.state.codeByOpacity,
      });
    }

    updateColor = (color) => {
      document.getElementById("colorPickerSection").className = "normal";
      const desiredClass = this.props.vizType == "wordcloud" ? 'word' : 'bar';
      const elements = document.getElementsByClassName(desiredClass);
      for (var i = 0; i < elements.length; i++) {
        console.log(color.hex);
          elements[i].style.fill=color.hex;
      }
      this.setState({hueColor: color.hex});
      if(!this.props.codeByOpacity) {
        document.getElementById("colorCodingSection").className = "greyOut";
        this.props.updateStyle({type: "colorCodedBy", value: 'none'});
      }
      document.getElementsByClassName("rainbowCircle")[0].style.boxShadow = "none";
    }

    handleRainbowClick = () => {
      if (this.props.vizType == "wordcloud") {
        this.setState({hueColor:"#FF0000"});
      } else {
        const elements = document.getElementsByClassName('bar');
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add("rainbowBars");
        }
      }
      this.props.updateStyle({type: "color", value: "rainbow"});
      document.getElementsByClassName("rainbowCircle")[0].style.boxShadow = "black 0px 0px 0px 3px inset";
    }

    updateBackground = (color) => {
      const body = document.getElementsByTagName("BODY")[0];
      body.style.background = color.hex;
      this.setState({bgColor: color.hex});
    }

    render() {
        return (
          <React.Fragment>
            <Button onClick={this.toggleSidebar(true)}>Styles</Button>
            <Drawer anchor='right' open={this.state.sideBarOpen} onClose={this.toggleSidebar(false)}>
            <div className="sideBar">
              <div className="header">
                <h3>Styles</h3>
                <Button variant="link" onClick={this.toggleSidebar(false)} className="closeButton">Close</Button>
              </div>  
              {(this.props.color) ?
                <div id="colorPickerSection" className={(this.props.colorCodedBy=='none' || !this.props.colorCodedBy || this.props.codeByOpacity) ? "normal" : "greyOut"}>
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
              {(this.props.colorCodedBy) ?
                <div id="colorCodingSection" className={(this.props.colorCodedBy && this.props.colorCodedBy != 'none') ? "normal" : "greyOut"}>
                  <h5>
                    Color code the visualization by one of the following variables:
                  </h5>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="scaleOption" id='nonescale' value='nonescale' checked={this.props.colorCodedBy === 'none'} onChange={() => this.props.updateStyle({type: "colorCodedBy", value: 'none'})} />
                    <label className="form-check-label" htmlFor='nonescale'>
                      none
                    </label>
                  </div>
                  {Object.keys(colorScales[this.props.dataType]).map((scale,i) => 
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="scaleOption" id={`scale${i}`} value={`scale${i}`} checked={this.props.colorCodedBy === scale} onChange={() => this.props.updateStyle({type: "colorCodedBy", value: scale})} />
                      <label className="form-check-label" htmlFor={`scale${i}`}>
                        {scale}
                      </label>
                    </div>
                  )}
                  <FormControlLabel
                    control={<Switch checked={this.state.codeByOpacity} onChange={this.toggleCodeByOpacity} name="opacityToggle" />}
                    label="Code by opacity instead of color"
                  />
                </div>
              : false }
              {this.props.background ?
                <div>
                  <h5>
                    Choose a color for the background
                  </h5>
                  <HuePicker
                    className="hueColorPicker"
                    color={this.state.bgColor}
                    onChange={this.updateBackground}
                    onChangeComplete={(color) => this.props.updateStyle({type: "background", value: color.hex})}
                  />
                  <CirclePicker
                    className="circleColorPicker"
                    color={this.state.bgColor}
                    colors={colorPaletteBg}
                    onChange={this.updateBackground}
                    width="316px"
                    onChangeComplete={(color) => this.props.updateStyle({type: "background", value: color.hex})}
                  />
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
