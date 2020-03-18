import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount, population) {
  return { id, date, name, shipTo, paymentMethod, amount, population };
}

const rows = [
  createData(0, 'Polska', 156, 3, 0, 205, 400000),
  createData(1, 'Włochy', 24747, 2158, "?", 24747, 600000),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{Date()}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Kraj</TableCell>
            <TableCell>Zachorowania</TableCell>
            <TableCell>Zgony</TableCell>
            <TableCell>Wyzdrowienia</TableCell>
            <TableCell align="right">Przyrost</TableCell>
            <TableCell align="right">Procent Populacji</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.amount/row.population}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}

