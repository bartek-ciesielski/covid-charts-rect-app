import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import TextField from '@material-ui/core/TextField';
import dataCSV from '../Dashboard/data'

console.log(dataCSV.data, "RAW DATACSV")


// Generate Order Data
function createData(id, name, sickCount, deathCount, healCount) {
  return { id, name, sickCount, deathCount, healCount };
}

const rows = [
  createData(0, 'Polska', 156, 3, 0, 205),
  createData(1, 'Włochy', 24747, 2158, "?"),
  createData(1, 'Włochy', 24747, 2158, "?"),
  createData(1, 'Włochy', 24747, 2158, "?"),
  createData(1, 'Włochy', 24747, 2158, "?"),
  createData(1, 'Włochy', 24747, 2158, "?"),
  createData(1, 'Włochy', 24747, 2158, "?"),
  createData(1, 'Włochy', 24747, 2158, "?"),
  createData(1, 'Włochy', 24747, 2158, "?"),
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

      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-search" label="Search country" type="search" variant="outlined" />
      </form>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Kraj</TableCell>
            <TableCell align="center">Zachorowania</TableCell>
            <TableCell align="center">Zgony</TableCell>
            <TableCell align="center">Wyzdrowienia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell >{row.name}</TableCell>
              <TableCell align="right">{row.sickCount}</TableCell>
              <TableCell align="right">{row.deathCount}</TableCell>
              <TableCell align="right">{row.healCount}</TableCell>
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






