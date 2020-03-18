import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import dataCSV from '../Dashboard/data'

const countries = dataCSV.data;
const countryName = countries.map(el => {
    return el['Province/State'] === '' ? el['Country/Region'] : `${el['Country/Region']} - ${el['Province/State']}`
}).sort();

console.log('SEEEEEEEEERCH', dataCSV.data)
console.log('SEEEEEEEEERCH name', countryName)

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect() {
    const classes = useStyles();
    const [country1, setCountry1] = React.useState('');
    const [country2, setCountry2] = React.useState('');

    const handleChange1 = event => {
        setCountry1(event.target.value);
    };

    const handleChange2 = event => {
        setCountry2(event.target.value);
    };

    return (
        <div>
            <FormControl variant="outlined" color='secondary' className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Kraj 1</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={country1}
                    onChange={handleChange1}
                    label="country1"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {countryName.map((name, index) => (
                        <MenuItem key={index} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Kraj 2</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={country2}
                    onChange={handleChange2}
                    label="country2"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {countryName.map((name, index) => (
                        <MenuItem key={index} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
