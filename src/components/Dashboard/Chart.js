import React, { onError, onComplete } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import Title from './Title';
import { readRemoteFile, readString, Papa } from 'react-papaparse'
import dataCSV  from '../Dashboard/data'

console.log(dataCSV)

const countries = dataCSV.data
console.log(countries, "DUPA - Kraje");

const country1 = countries.filter(el => el['Country/Region'] === 'Poland');
// const country2 = countries.filter(el => el['Country/Region'] == 'Italy');
const country2 = countries.filter(el => el['Country/Region'] === 'Thailand');


// console.log(DUPA, "DUPA");
console.log(countries, "DUPA - Kraje");
console.log(country1, "DUPA - Polska");
console.log(country2, "DUPA - italy");




// Generate Sales Data
function createData(date, amount) {
    return { date, amount };
}



// const data = [
//     {day: 1, poland: 1, italy: 2},
//     {day: 2, poland: 1, italy: 2},
//     {day: 3, poland: 5, italy: 2},
//     {day: 4, poland: 5, italy: 2},
//     {day: 5, poland: 11, italy: 2},
//     {day: 6, poland: 16, italy: 2},
//     {day: 7, poland: 22, italy: 2},
//     {day: 8, poland: 31, italy: 3},
//     {day: 9, poland: 49, italy: 3},
//     {day: 10, poland: 68, italy: 3},
//     {day: 11, poland: 103, italy: 3},
//     {day: 12, poland: 119, italy: 3},
//     {day: 13, poland: 156, italy: 3},
//     {day: 14, poland: 156, italy: 3},
//     {day: 15, poland: 156, italy: 3},

//     {day: 16, poland: 119, italy: 3},
//     {day: 17, poland: 119, italy: 3},
//     {day: 18, poland: 119, italy: 3},
//     {day: 19, poland: 119, italy: 3},
//     {day: 20, poland: 119, italy: 3},
//     {day: 21, poland: 119, italy: 3},
//     {day: 22, poland: 119, italy: 20},
//     {day: 23, poland: 119, italy: 62},
//     {day: 24, poland: 119, italy: 155},
//     {day: 25, poland: 119, italy: 229},
//     {day: 26, poland: 119, italy: 322},
//     {day: 27, poland: 119, italy: 453},
//     {day: 28, poland: 119, italy: 655},
//     {day: 29, poland: 119, italy: 888},
//     {day: 30, poland: 119, italy: 1128},
//     {day: 31, poland: 119, italy: 1694},

// {day: 32, poland: 119, italy: 2036},
// {day: 33, poland: 119, italy: 2502},
// {day: 34, poland: 119, italy: 3089},
// {day: 35, poland: 119, italy: 3858},
// {day: 36, poland: 119, italy: 4636},
// {day: 37, poland: 119, italy: 5883},
// {day: 38, poland: 119, italy: 7375},
// {day: 39, poland: 119, italy: 9171},
// {day: 40, poland: 119, italy: 10149},
// {day: 41, poland: 119, italy: 12462},
// {day: 42, poland: 119, italy: 12462},
// {day: 43, poland: 119, italy: 17660},
// {day: 44, poland: 119, italy: 21157},
// {day: 45, poland: 119, italy: 24747},

//   ];

const data = [
    { day: 1, poland: 1, italy: 2 },
    { day: 2, poland: 1, italy: 2 },
    { day: 3, poland: 5, italy: 2 },
    { day: 4, poland: 5, italy: 2 },
    { day: 5, poland: 11, italy: 2 },
    { day: 6, poland: 16, italy: 2 },
    { day: 7, poland: 22, italy: 20 },
    { day: 8, poland: 31, italy: 62 },
    { day: 9, poland: 49, italy: 155 },
    { day: 10, poland: 68, italy: 229 },
    { day: 11, poland: 103, italy: 322 },
    { day: 12, poland: 119, italy: 453 },
    { day: 13, poland: 177, italy: 655 },
    { day: 14, poland: 208, italy: 888 },
    // {day: 15, poland: 208, italy: 1128},

    // {day: 32, poland: 119, italy: 2036},
    // {day: 33, poland: 119, italy: 2502},
    // {day: 34, poland: 119, italy: 3089},
    // {day: 35, poland: 119, italy: 3858},
    // {day: 36, poland: 119, italy: 4636},
    // {day: 37, poland: 119, italy: 5883},
    // {day: 38, poland: 119, italy: 7375},
    // {day: 39, poland: 119, italy: 9171},
    // {day: 40, poland: 119, italy: 10149},
    // {day: 41, poland: 119, italy: 12462},
    // {day: 42, poland: 119, italy: 12462},
    // {day: 43, poland: 119, italy: 17660},
    // {day: 44, poland: 119, italy: 21157},
    // {day: 45, poland: 119, italy: 24747},


];

const dataParsed = [];

let chartStartDay = 1;
let chartStartDayCounter = 0;
let Counter2 = 0;
// let maxTime = Object.values(country1[0]).length;
let maxTime = 9;


Object.values(country1[0]).forEach((el, index) => {
    if (parseInt(el) >= chartStartDay && index > 3) {
        dataParsed.push(
            {
                day: chartStartDayCounter,
                country1: el,
                country2: null,
            })
        chartStartDayCounter++;
    }
});


console.log(dataParsed, "Parsed");

Object.values(country2[0]).forEach((el, index) => {
    if (parseInt(el) >= chartStartDay && index > 3 && dataParsed.length > Counter2) {
        dataParsed[Counter2][`country2`] = el;
        ++Counter2
    }
    if(dataParsed.length <= Counter2 && dataParsed.length < maxTime && index > 3 && parseInt(el) > chartStartDay){
        console.log("hhhhhhhhh")
        ++Counter2
        dataParsed.push(
        {
            day: Counter2,
            country1: null,
            country2: el,
        })
       
    }
});





console.log(dataParsed, "Parsed");

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>{'Zestawienie od momentu wykrycia 20 przypadków'}</Title>
            <ResponsiveContainer>
                <LineChart
                    data={dataParsed}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
                    <XAxis type="number" dataKey="day" stroke={theme.palette.text.secondary} tickCount={10} />
                    <YAxis type="number" stroke={theme.palette.text.secondary} tickCount={10}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Liczba zachorowań
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="country1" stroke={theme.palette.primary.main} dot={false} />
                    <Line type="monotone" dataKey="country2" stroke={theme.palette.secondary.main} dot={false} />

                </LineChart>
            </ResponsiveContainer>

        </React.Fragment>
    );
}