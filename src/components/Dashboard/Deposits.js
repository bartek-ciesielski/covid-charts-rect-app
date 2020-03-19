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

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Polska - Total</Title>

      <Typography component="p" variant="h4" className={classes.depositContext}>
        156
      </Typography>
      <Typography color="primary" >
        <p color="primary">Polska</p>
      </Typography>
      <Typography color="secondary" className={classes.depositContext}>
      <p color="secondary">Włochy</p>
    </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
         
        </Link>
      </div>
    </React.Fragment>
  );
}