import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Icon from '@material-ui/core/Icon';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';

// React.useEffect(() => {
//   loadCSS(
//     'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
//     document.querySelector('#font-awesome-css'),
//   );
// }, []);



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  return (
    <React.Fragment >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Title>CONFIRMED CASES</Title>
        <p>TOTAL</p>

        <Typography color="secondary" variant="h5" >
          <p style={{ fontSize: 18, display: 'flex', alignItems: 'center', marginTop: 70 }}>
            <PeopleAltTwoToneIcon style={{ fontSize: 60, marginRight: 30 }} />{props.country1 }
          </p>
        </Typography>
        <p style={{ fontSize: 30 }}>{props.sickCount} </p>
        <Typography color="primary" variant="h7">
          <p style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}>
            <PeopleAltTwoToneIcon style={{ fontSize: 60, marginRight: 30 }} />{props.country2 }
          </p>
        </Typography>
        <p style={{ fontSize: 30 }}>{props.sickCount2} </p>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}