import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Icon from '@material-ui/core/Icon';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import dataCSVdaily from './dataTableDaily';
import './Totals.css'
import { cyan } from '@material-ui/core/colors';



function createData(name, confirmed, deaths, recovered) {
  return { name, confirmed, deaths, recovered };
}



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({

});

export default function Totals(props) {
  const classes = useStyles();

  console.log(props, "PROOOOOPS")

  const countriesGlobal = dataCSVdaily.data.map(el => {
    return createData(
      el['Province/State'] === '' ? el['Country/Region'] : `${el['Country/Region']} - ${el['Province/State']}`,
      el.Confirmed,
      el.Deaths,
      el.Recovered)
  });


  let country1global = []
  let country2global = []

  props.country1 !== "" ? country1global = countriesGlobal.filter(el => el.name === props.country1) :
    country1global = countriesGlobal.filter(el => el.name === 'Italy');

  props.country1 !== "" ? country2global = countriesGlobal.filter(el => el.name === props.country2) :
    country2global = countriesGlobal.filter(el => el.name === 'Poland');

  // console.log(country1global[0].name, "IF PROPS")
  console.log(country1global[0], " COUNTRY 1 GLOBAL ")






  return (
    <React.Fragment >
      {console.log(props, "PROOOOOPS 22222222")}
      <div style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
        {console.log(props, "PROOOOOPS 33333333")}
        {/*<Title>{props.factor}</Title>
        <p>TOTAL</p>*/}
        <Typography color="secondary" variant="h5" >
          <p style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', marginTop: 50, flexBasis: '100%'}}>
            <PeopleAltTwoToneIcon style={{ fontSize: 60, marginRight: 30 }} />{props.country1}
          </p>
        </Typography>
        {/*<p style={{ fontSize: 30 }}>{props.sickCount}</p>*/}
        <p style={{ fontSize: '1rem', flexBasis: '100%' }}>Confirmed: <span style={{color: '#ff9800'}}>{country1global[0].confirmed}</span></p>
        <p style={{ fontSize: '1rem',  flexBasis: '100%' }}>Deaths: <span style={{color: '#ff9800'}}>{country1global[0].deaths}</span></p>
        <p style={{ fontSize: '1rem',  flexBasis: '100%' }}>Recovered: <span style={{color: '#ff9800'}}>{country1global[0].recovered}</span></p>
        <Typography color="primary" variant="h7">
          <p style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', marginTop: 90 }}>
            <PeopleAltTwoToneIcon style={{ fontSize: 60, marginRight: 30 }} />{props.country2}
          </p>
        </Typography>
        {/*<p style={{ fontSize: 30 }}>{props.sickCount2} </p>*/}
        <p style={{ fontSize: '1rem', flexBasis: '100%'  }}>Confirmed: <span style={{color: '#80deea'}}>{country2global[0].confirmed}</span></p>
        <p style={{ fontSize: '1rem',  flexBasis: '100%' }}>Deaths: <span style={{color: '#80deea'}}>{country2global[0].deaths}</span></p>
        <p style={{ fontSize: '1rem',  flexBasis: '100%', marginBottom: 50 }}>Recovered: <span style={{color: '#80deea'}}> {country2global[0].recovered}</span></p>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}