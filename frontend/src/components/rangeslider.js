import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.currentRange);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleFilterChange(newValue);
  };

  return (
    <div className={classes.root} style={{margin:"10px"}}>
      <Typography id="range-slider" gutterBottom>
        {props.filterName}
      </Typography>
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
  );
}
