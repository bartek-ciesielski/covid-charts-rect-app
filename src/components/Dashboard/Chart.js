import React, { onError, onComplete } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import Title from './Title';
import { readRemoteFile, readString, Papa } from 'react-papaparse'
import dataCSV from '../Dashboard/data'
import Search from './Search'

console.log(dataCSV)




export default function Chart() {
    const theme = useTheme();
    const [country1chosen, setCountry1] = React.useState('Poland');
    const [country2chosen, setCountry2] = React.useState('Poland');


    const countries = dataCSV.data


    const country1 = countries.filter(el => el['Country/Region'] === `${country1chosen}`);
    const country2 = countries.filter(el => el['Country/Region'] === `${country2chosen}`);

    console.log(country1, "COUNTRY 1")
    const sickNumberArray1 = Object.values(country1[0]).splice(4)
    const sickNumberArray2 = Object.values(country2[0]).splice(4);
    const actualSickAmount1 = sickNumberArray1[sickNumberArray1.length - 1];
    const actualSickAmount2 = sickNumberArray2[sickNumberArray1.length - 1];



    console.log(sickNumberArray1, "fffffffff")
    console.log(actualSickAmount1, "fffffffffFFFFFFF")

    let dataParsed = [];

    let chartStartSickNumber = 1;
    let chartStartDayCounter = 0;
    let Counter2 = 0;
    const maxTime = Object.values(country1[0]).length;
    // let maxTime = 45;
    const minYvalue = chartStartSickNumber;
    const maxYvalue = Math.max(...sickNumberArray1,...sickNumberArray2);
    console.log(maxYvalue, "yyyyyyyyy")


    if (country1chosen !== '') sickNumberArray1.forEach((el, index) => {
        if (parseInt(el) >= chartStartSickNumber && index > 3 && chartStartDayCounter < maxTime) {
            dataParsed.push(
                {
                    day: chartStartDayCounter,
                    country1: el,
                    country2: null,
                })
            chartStartDayCounter++;
        }
        // if (dataParsed.length <= chartStartDayCounter && dataParsed.length < maxTime && index > 3 && parseInt(el) > chartStartSickNumber) {
        //     dataParsed.push(
        //         {
        //             day: chartStartDayCounter,
        //             country1: el,
        //             country2: null,
        //         })
        //     chartStartDayCounter++;
        // }

    });

    if (country2chosen !== '') sickNumberArray2.forEach((el, index) => {
        if (parseInt(el) >= chartStartSickNumber && index > 3 && dataParsed.length > Counter2) {
            dataParsed[Counter2][`country2`] = el;
            Counter2++
        }
        if (dataParsed.length <= Counter2 && dataParsed.length < maxTime && index > 3 && parseInt(el) > chartStartSickNumber) {
                dataParsed.push(
                {
                    day: Counter2,
                    country1: null,
                    country2: el,
                })
                // dataParsed[Counter2-1].day = Counter2-1;
                // dataParsed[Counter2].country2 = null;
            Counter2++;
        }
    });

    const maxXvalue = dataParsed.length;
    console.log(dataParsed, "DATA PARSED");
    // const minYvalue = chartStartSickNumber;
    // let maxYvalue = 0;

    //  if (country1 && country2){
    // dataParsed[dataParsed.length-1].country1 > dataParsed[dataParsed.length-1].country1 ?
    // maxYvalue = parseInt(dataParsed[dataParsed.length-1].country1) : maxYvalue = parseInt(dataParsed[dataParsed.length-1].country2)
    // };

    console.log(maxYvalue, "MAX Y VALUE");


    // dataParsed.length > 0 ?

    // !country1 && !country2 ? maxYvalue = 1000 : null;

    // country1 && !country2 ? maxYvalue = dataParsed[dataParsed.length-1].country1 : maxYvalue = 1000;
    // !country1 && country2 ? maxYvalue = dataParsed[dataParsed.length-1].country2 : maxYvalue = 1000;





    const handleChange1 = event => {
        dataParsed = []
        return setCountry1(event);
    };

    const handleChange2 = event => {
        dataParsed = []
        return setCountry2(event);
    };

    console.log(country1, "COUNTRY 1", dataParsed)
    return (
        <React.Fragment>
            <Title>{'Zestawienie od momentu wykrycia 20 przypadków'}</Title>
            <ResponsiveContainer>
                <LineChart
                    width={500}
                    height={300}
                    data={dataParsed}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
                    <XAxis type="number" dataKey="day" stroke={theme.palette.text.secondary} tickCount={10} domain={[0, maxXvalue]}/>
                    <YAxis type="number" stroke={theme.palette.text.secondary} tickCount={10} domain={[minYvalue, maxYvalue]}>
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
            <Search handleChangeParent={handleChange1} handleChangeParent2={handleChange2} />
        </React.Fragment>
    );
}