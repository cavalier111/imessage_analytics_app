import React, {Component} from 'react';
import { connect } from 'react-redux'
import { toggleStopWords, handleFilterApply } from "../redux/actions/word";
import { getDataType, getFilter } from "../redux/selectors/word";
import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import RangeSlider from './rangeslider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TagsInput from './tagsinput';
import store from "../redux/store/store";
import Drawer from '@material-ui/core/Drawer';
import './filtersection.scss';

const mapStateToProps = (state) => ({
  dataType: getDataType(state),
  maxEnd: getFilter(state,'maxEnd'),
  stopWordsEnabled: getFilter(state,'stopWordsEnabled'),
  startEnd: getFilter(state,'startEnd'),
  polarity: getFilter(state,'polarity'),
  subjectivity: getFilter(state,'subjectivity'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleFilterApply: (payload) => dispatch(handleFilterApply(payload)),
    toggleStopWords: () => dispatch(toggleStopWords()),
  };
}

class FilterSection extends Component {
    constructor(props) {
      super(props);
      this.state = {
        startEnd: this.props.startEnd,
        polarity: this.props.polarity,
        subjectivity: this.props.subjectivity,
        stopWordsEnabled: store.getState().word.filters.words.stopWordsEnabled,
        sideBarOpen: false,
      }
    }

    handleFilterChange = (type, newValues) => {
       this.setState({
         [type]: newValues,
      });
     }

    componentDidUpdate(prevProps) {
      if(prevProps.dataType !== this.props.dataType) {
        this.setState({
          startEnd: this.props.startEnd,
          polarity: this.props.polarity,
          subjectivity: this.props.subjectivity,
          stopWordsEnabled: store.getState().word.filters.words.stopWordsEnabled,
        });
      }
    }

    toggleStopWords = () => {
      this.setState({
        stopWordsEnabled: !this.state.stopWordsEnabled,
      });
      this.props.toggleStopWords();
    }

    toggleSidebar = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.setState({ sideBarOpen: open });
    };

    render() {
        return (
          <React.Fragment>
            <Button onClick={this.toggleSidebar(true)}>Filters</Button>
            <Drawer anchor='right' open={this.state.sideBarOpen} onClose={this.toggleSidebar(false)}>
            <div className="sideBar">
            {/*<DropdownButton id="dropdown-basic-button" title="Filters">*/}
            <div className="header">
              <h3>Filters</h3>
              <Button variant="link" onClick={this.toggleSidebar(false)} className="closeButton">Close</Button>
            </div>  
              <RangeSlider handleFilterChange={(newValues) => this.handleFilterChange('startEnd', newValues)} filterName="Start and End point" range={[1,this.props.maxEnd]} step={1} currentRange={this.state.startEnd} />
              {this.props.dataType!='links' ?
                <div>
                  <RangeSlider handleFilterChange={(newValues) => this.handleFilterChange('polarity', newValues)} filterName="Polarity" range={[-1,1]} step={.05} currentRange={this.state.polarity} />
                  <RangeSlider  handleFilterChange={(newValues) => this.handleFilterChange('subjectivity', newValues)} filterName="Subjectivity" range={[0,1]} step={.05} currentRange={this.state.subjectivity} />
                </div>
              : false }
              {this.props.dataType=='words' ?
                <div>
                  <FormControlLabel
                    control={<Switch checked={this.state.stopWordsEnabled} onChange={this.toggleStopWords} name="excludedwords" />}
                    label="Enabled excluded words"
                  />
                  <TagsInput/>
                </div>
              : false }
              <Button onClick={() => this.props.handleFilterApply(this.state)} variant="outline-primary" size="sm" id="reset" style={{textAlign: "center", margin: "10px"}}>Apply filters</Button>
            {/*</DropdownButton>*/}
            </div>
            </Drawer>
          </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterSection);
