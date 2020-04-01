import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { AreaChart, Area, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import Title from './Title';
import dataCSVconfirmedLocal from '../../Data/data'
import dataCSVdeathsLocal from '../../Data/dataDeaths'
import dataCSVrecoveredLocal from '../../Data/dataRecovered'
import Select from './Select'
import './CSS/Chart.css'
import { Typography } from '@material-ui/core';

import { readString } from 'react-papaparse'

export default function Chart(props) {

    const theme = useTheme();
    const [country1chosen, setCountry1] = React.useState('Italy');
    const [country2chosen, setCountry2] = React.useState('Poland');
    const [startNumber, setStartNumber] = React.useState(1);
    const [chartFactor, setChartFactor] = React.useState('Confirmed');
    const [scaleYmax, setScaleYmax] = React.useState(1);
    const [dataConfirmed, setDataConfirmed] = React.useState(dataCSVconfirmedLocal)
    const [dataDeaths, setDataDeaths] = React.useState(dataCSVdeathsLocal)
    const [dataRecovered, setDataRecovered] = React.useState(dataCSVrecoveredLocal)

    const API_URL_CONFIRMED = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
    const API_URL_DEATHS = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'
    const API_URL_RECOVERED = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv'

    const getDataConfirmed = () => {
        return fetch(API_URL_CONFIRMED)
          .then((response) => response.text())
          .then((dataString) => {
            const dataCSVfetch= readString(`${dataString}`,
            {
                header: true,
            }
        )
            setDataConfirmed(dataCSVfetch)
          })
      }

      useEffect(() => {
        getDataConfirmed()
      }, [])


      const getDataDeaths = () => {
        return fetch(API_URL_DEATHS)
          .then((response) => response.text())
          .then((dataString) => {
            const dataCSVfetch= readString(`${dataString}`,
            {
                header: true,
            }
        )
            setDataDeaths(dataCSVfetch)
          })
      }

      const getDataRecovered = () => {
        return fetch(API_URL_RECOVERED)
          .then((response) => response.text())
          .then((dataString) => {
            const dataCSVfetch= readString(`${dataString}`,
            {
                header: true,
            }
        )
            setDataRecovered(dataCSVfetch)
          })
      }


      useEffect(() => {
        getDataConfirmed()
        getDataDeaths()
        getDataRecovered()
      }, [])


    let countries = []
    let dataCSVchartConfirmed = {}
    let dataCSVchartDeaths = dataDeaths
    let dataCSVchartRecovered = dataRecovered

    dataConfirmed.data.length > 0 ? dataCSVchartConfirmed = dataConfirmed : dataCSVchartConfirmed = dataCSVconfirmedLocal;
    dataDeaths.data.length > 0 ? dataCSVchartDeaths = dataDeaths : dataCSVchartDeaths = dataCSVdeathsLocal;
    dataRecovered.data.length > 0 ? dataCSVchartRecovered = dataRecovered : dataCSVchartRecovered = dataCSVrecoveredLocal;


    if (chartFactor === 'Confirmed') { countries = dataCSVchartConfirmed.data };
    if (chartFactor === 'Deaths') { countries = dataCSVchartDeaths.data };
    if (chartFactor === 'Recovered') { countries = dataCSVchartRecovered.data };

    let country1 = []
    if (country1chosen.split(' - ').length > 1) {
        country1 = countries.filter(el => el['Province/State'] === country1chosen.split(' - ')[1] && el['Country/Region'] === country1chosen.split(' - ')[0]);
    }
    else { country1 = countries.filter(el => el['Country/Region'] === `${country1chosen}` && el['Province/State'] === ''); }

    let country2 = []
    if (country2chosen.split(' - ').length > 1) {
        country2 = countries.filter(el => el['Province/State'] === country2chosen.split(' - ')[1] && el['Country/Region'] === country2chosen.split(' - ')[0]);
    }
    else { country2 = countries.filter(el => el['Country/Region'] === `${country2chosen}` && el['Province/State'] === ''); }

    const chartDateArr = Object.keys(country1[0])
    const chartDate = new Date(chartDateArr[chartDateArr.length - 1]).toLocaleDateString().replace(/\//g, '-')
    const sickNumberArray1 = Object.values(country1[0]).splice(4)
    const sickNumberArray2 = Object.values(country2[0]).splice(4);
    const actualSickAmount1 = sickNumberArray1[sickNumberArray1.length - 1];
    const actualSickAmount2 = sickNumberArray2[sickNumberArray1.length - 1];

    let dataParsed = [];
    let chartStartSickNumber = startNumber;
    let chartStartDayCounter = 0;
    let Counter2 = 0;
    const maxTime = Object.values(country1[0]).length;
    // const minYvalue = chartStartSickNumber;
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


    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload) {
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

    const handleChangeChartFactor = event => {
        dataParsed = []
        return setChartFactor(event);
    };

    const handleChangeStartNumber = event => {
        dataParsed = []
        return setStartNumber(event);
    };

    const handleChangeScaleYmax = event => {
        return setScaleYmax(event);
    };


    useEffect(() => {
        props.handleDashboardCountryName1(country1chosen, actualSickAmount1, chartFactor)
        props.handleDashboardCountryName2(country2chosen, actualSickAmount2, chartFactor)
    });



    return (
        <React.Fragment>
            <Title>COVID-19 Comparison</Title>
            <Typography variant="caption">
            <p style={{marginTop: '5px'}}>{chartDate}</p>
            </Typography>
            <ResponsiveContainer>
                <AreaChart
                    width={400}
                    height={300}
                    data={dataParsed}
                    margin={{
                        top: 0,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <CartesianGrid
                        stroke="#ccc"
                        strokeDasharray="0 0"
                        strokeOpacity={0.2}
                        strokeWidth={1} fillOpacity={0.5}
                        verticalFill={['#555555']}
                    />
                    <XAxis type="number"
                        dataKey="day"
                        stroke={theme.palette.text.primary}
                        tickCount={6} domain={[0, (maxXvalue - 1)]}
                        allowDecimals={false}
                    >
                        <Label
                            position="insideBottomRight"
                            offset={45}
                            style={{
                                fill: theme.palette.text.primary,
                                textAnchor: 'middle'
                            }}
                        >
                            DAYS
                        </Label>
                    </XAxis>
                    <YAxis type="number"
                        stroke={theme.palette.text.secondary}
                        domain={[0, dataMax => ((maxYvalue / scaleYmax).toFixed())]}
                        tickCount={10}
                        mirror={true}
                        scale='auto'
                    >
                        <Label
                            angle={270}
                            position="left"
                            offset={15}
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            {`Cumulative - ${chartFactor}`}
                        </Label>
                    </YAxis>
                    {dataParsed.length > 0 ? <Tooltip content={<CustomTooltip />} /> : null}
                    <Area type="monotone" dataKey={`${country1chosen}`} stroke={theme.palette.secondary.light} strokeWidth={2} fill={theme.palette.secondary.main} dot={false} />
                    <Area type="monotone" dataKey={`${country2chosen}`} stroke={theme.palette.primary.light} strokeWidth={2} fill={theme.palette.primary.main} dot={false} />
                </AreaChart>

            </ResponsiveContainer>
            <Select
                factor={chartFactor}
                country1={country1chosen}
                country2={country2chosen}
                handleChangeParent={handleChange1}
                handleChangeParent2={handleChange2}
                handleChangeYmaxParent={handleChangeScaleYmax}
                handleChangeChartFactorParent={handleChangeChartFactor}
                handleChangeStartNumberParent={handleChangeStartNumber} />
        </React.Fragment>
    );
}