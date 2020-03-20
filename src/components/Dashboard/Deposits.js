import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';



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
    <React.Fragment>
      <Title >CURRENT NUMBER</Title>

      <Typography color="secondary" variant="h5" >
        <p > { props.country1 } - { props.sickCount } </p>
      </Typography>
      <Typography color="primary" variant="h5" className={classes.depositContext}>
      <p >{ props.country2 } - { props.sickCount2 }</p>
    </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
         
        </Link>
      </div>
    </React.Fragment>
  );
}