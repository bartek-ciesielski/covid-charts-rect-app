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
      <Title>Liczby</Title>

      <Typography component="p" variant="h4" className={classes.depositContext}>
       DANE
      </Typography>
      <Typography color="secondary" >
        <p color="primary"> { props.country1 } - { props.sickCount } </p>
      </Typography>
      <Typography color="primary" className={classes.depositContext}>
      <p color="secondary">{ props.country2 } - { props.sickCount2 }</p>
    </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
         
        </Link>
      </div>
    </React.Fragment>
  );
}