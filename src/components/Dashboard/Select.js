import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import dataCSV from './data'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



const countries = dataCSV.data;
const countryName = countries.map(el => {
    return el['Province/State'] === '' ? el['Country/Region'] : `${el['Country/Region']} - ${el['Province/State']}`
}).sort();
const chartFactorArr = ['Confirmed', 'Deaths', 'Recovered'];

const marks = [
    {
        value: 1,
        label: '1',
    },

    {
        value: 500,
        label: '500',
    },
    {
        value: 1000,
        label: '1k',
    },
];

const marksYmax = [
    {
        value: 1,
        label: '',
    },

    {
        value: 10,
        label: '10%',
    },

];

function valuetext(value) {
    return `${value}`;
}

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect(props) {
    const classes = useStyles();
    const handleChange1 = (event) => props.handleChangeParent(event.target.value)
    const handleChange2 = (event) => props.handleChangeParent2(event.target.value)
    const handleChangeStart = (event, value) => { props.handleChangeStartNumberParent(value) }
    const handleChangeChartFactor = (event) => { props.handleChangeChartFactorParent(event.target.value) }
    const handleChangeYmax = (event, value) => { props.handleChangeYmaxParent(value) }

    return (
        <div style={{
            display: 'flex',
            // border: '1px solid',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            minWidth: '70%'
        }}>
            <FormControl variant="outlined" color='secondary' className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Country 1</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.country1}
                    onChange={handleChange1}
                    label="country1"
                >
                    {countryName.map((name, index) => (
                        <MenuItem key={index} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Country 2</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.country2}
                    onChange={handleChange2}
                    label="country2"
                >
                    {countryName.map((name, index) => (
                        <MenuItem key={index} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" color='secondary' className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Chart Factor</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.factor}
                    onChange={handleChangeChartFactor}
                    label="chartFactor"
                >
                    {chartFactorArr.map((name, index) => (
                        <MenuItem key={index} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <FormControl variant="outlined" className={classes.formControl} style = {{paddingLeft: 20 }}>
                <div >
                    <Typography variant='caption'>
                        Start Number
                    </Typography>
                    <Slider
                        defaultValue={1}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-always"
                        step={1}
                        min={1}
                        max={1000}
                        marks={marks}
                        valueLabelDisplay="auto"
                        onChange={handleChangeStart}
                    />
                </div>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl} style = {{ paddingLeft: 20 }}>
            <div>
                <Typography variant='caption'>
                    Y scale
                </Typography>
                <Slider
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-always"
                    step={0.1}
                    min={1}
                    max={10}
                    marks={marksYmax}
                    valueLabelDisplay="off"
                    onChange={handleChangeYmax}
              />
            </div>
        </FormControl>
        </div>
        </div>

    );
}
