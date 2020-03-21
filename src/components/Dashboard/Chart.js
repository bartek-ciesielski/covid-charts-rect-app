import React, { onError, onComplete } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Legend, Tooltip } from 'recharts';
import Title from './Title';
import dataCSV from '../Dashboard/data'
import Select from './Select'




export default function Chart(props) {

    const theme = useTheme();

    const [country1chosen, setCountry1] = React.useState('Italy');
    const [country2chosen, setCountry2] = React.useState('Poland');
    const countries = dataCSV.data


    let country1 = []
    if (country1chosen.split(' - ').length > 1) {
        country1 = countries.filter(el => el['Province/State'] === country1chosen.split(' - ')[1] && el['Country/Region'] === country1chosen.split(' - ')[0]);
    }
    else { country1 = countries.filter(el => el['Country/Region'] === `${country1chosen}`); }


    let country2 = []
    if (country2chosen.split(' - ').length > 1) {
        country2 = countries.filter(el => el['Province/State'] === country2chosen.split(' - ')[1] && el['Country/Region'] === country2chosen.split(' - ')[0]);
    }
    else { country2 = countries.filter(el => el['Country/Region'] === `${country2chosen}`); }


    const sickNumberArray1 = Object.values(country1[0]).splice(4)
    const sickNumberArray2 = Object.values(country2[0]).splice(4);
    const actualSickAmount1 = sickNumberArray1[sickNumberArray1.length - 1];
    const actualSickAmount2 = sickNumberArray2[sickNumberArray1.length - 1];

    let dataParsed = [];

    let chartStartSickNumber = 1;
    let chartStartDayCounter = 0;
    let Counter2 = 0;
    const maxTime = Object.values(country1[0]).length;
    const minYvalue = chartStartSickNumber;
    const maxYvalue = Math.max(...sickNumberArray1, ...sickNumberArray2);

    const setDataArray = () => {
        if (country1chosen !== '') sickNumberArray1.forEach((el, index) => {
            if (parseInt(el) >= chartStartSickNumber && index > 3 && chartStartDayCounter < maxTime) {
                dataParsed.push(
                    {
                        day: chartStartDayCounter,
                        [country1chosen]: el,
                        [country2chosen]: null,
                    })
                chartStartDayCounter++;
            }
        });

        if (country2chosen !== '') sickNumberArray2.forEach((el, index) => {
            if (parseInt(el) >= chartStartSickNumber && index && dataParsed.length > Counter2) {
                dataParsed[Counter2][`${country2chosen}`] = el;
                Counter2++
            }
            if (dataParsed.length <= Counter2 && dataParsed.length < maxTime && index > 3 && parseInt(el) > chartStartSickNumber) {
                dataParsed.push(
                    {
                        day: Counter2,
                        [country1chosen]: null,
                        [country2chosen]: el,
                    })
                Counter2++;
            }
        });

        if (country1chosen === country2chosen) { dataParsed.pop() };
    }

    const maxXvalue = dataParsed.length;


    const getIntroOfPage = (label) => {
        if (label === 'Page A') {
            return "Page A is about men's clothing";
        } if (label === 'Page B') {
            return "Page B is about women's dress";
        } if (label === 'Page C') {
            return "Page C is about women's bag";
        } if (label === 'Page D') {
            return 'Page D is about household goods';
        } if (label === 'Page E') {
            return 'Page E is about food';
        } if (label === 'Page F') {
            return 'Page F is about baby food';
        }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            console.log(payload, "PAYLOAD", label, "label")
            return (
                <div className="custom-tooltip">
                    <p className="label">{`DAY ${label}`}</p>
                    <p className="label">{`${payload[0]["dataKey"]} : ${payload[0].value}`}</p>
                    <p className="label">{payload.length > 1 ? `${payload[1]["dataKey"]} : ${payload[1].value}` : null}</p>
                </div>
            );
        }

        return null;
    };


    setDataArray();

    const handleChange1 = event => {
        dataParsed = []
        setCountry1(event)
    };

    const handleChange2 = event => {
        dataParsed = []
        return setCountry2(event);
    };

    props.handleDashboardCountryName1(country1chosen, actualSickAmount1)
    props.handleDashboardCountryName2(country2chosen, actualSickAmount2)

    console.log(country1, "COUNTRY 1", dataParsed)
    return (
        <React.Fragment>
            <Title>COVID-19 Comparison</Title>
            <p variant="subtitle2">from First Confirmed Case in each Country</p>
            <ResponsiveContainer>
                <AreaChart
                    width={500}
                    height={400}
                    data={dataParsed}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <CartesianGrid stroke="#ccc" strokeDasharray="0 0" strokeOpacity={0.2} strokeWidth={1} fillOpacity={0.5} verticalFill={['#555555']}/>
                    <XAxis type="number" dataKey="day" stroke={theme.palette.text.primary} tickCount={10} domain={[0, maxXvalue - 1]} />
                    <YAxis type="number" stroke={theme.palette.text.secondary} tickCount={10} domain={[minYvalue, maxYvalue]}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Cumulative Confirmed Cases
                        </Label>
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey={`${country1chosen}`} stroke={theme.palette.secondary.light} strokeWidth={2} fill={theme.palette.secondary.main} dot={false} />
                    <Area type="monotone" dataKey={`${country2chosen}`} stroke={theme.palette.primary.light} strokeWidth={2} fill={theme.palette.primary.main} dot={false} />
                </AreaChart>
            </ResponsiveContainer>
            <Select
                country1={country1chosen}
                country2={country2chosen}
                handleChangeParent={handleChange1}
                handleChangeParent2={handleChange2} />
        </React.Fragment>
    );
}