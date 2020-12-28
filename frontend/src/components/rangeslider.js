import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './rangeslider.scss';

export default function RangeSlider(props) {
  const [value, setValue] = React.useState(props.currentRange);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleFilterChange(newValue);
  };

  React.useEffect(() => {
    setValue(props.currentRange)
  }, [props.currentRange]);

  return (
    <div className="sliderWrapper">
      <div className="sliderHeader">
        <Typography id="range-slider" gutterBottom>
          {props.filterName}
        </Typography>
      </div>
      <div className="rangeSlider">
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={props.range[0]}
      		max={props.range[1]}
      		step={props.step}
        />
      </div>
    </div>
  );
}
