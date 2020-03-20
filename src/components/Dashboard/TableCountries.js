import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import dataCSV from './data';


import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';


console.log("DATA CSV RAW", dataCSV.data);

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'sickCount', label: 'Liczba chorych', minWidth: 100 },
    {
        id: 'deathCount',
        label: 'zagony',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString(),
    },
    {
        id: 'healCount',
        label: 'wyzdroweinia',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString(),
    },

];

function createData(name, sickCount, deathCount, healCount) {
    return { name, sickCount, deathCount, healCount };
}


const rowsUnsorted = dataCSV.data.map(el => {
    return createData(el['Province/State'] === '' ? el['Country/Region'] : `${el['Country/Region']} - ${el['Province/State']}`,
        Object.values(el)[Object.values(el).length - 1],
        10,
        10)
});

const rows = rowsUnsorted.sort(function (a, b) {
    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
    if (nameA < nameB) //sort string ascending
        return -1
    if (nameA > nameB)
        return 1
    return 0 //default return value (no sorting)
})

// const rows = rowsUnsorted.sort(function(a,b){return b.sickCount-a.sickCount});
//descending

console.log("ROOOWS", rows)

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    container: {
        // backgroundColor: "red",
        maxHeight: 440,
    },
}));


export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchValue, setSearchValue] = React.useState('');
    const [sortMetod, setSearchAscend] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeSearch = (event) => setSearchValue(event.target.value)

    const rowsSearched = [];
    const checkSearch = () => {
        rows.forEach(el => {
            if (el.name.toLowerCase().includes(searchValue.toLowerCase()) || !searchValue) rowsSearched.push(el);
        }
        );
        if (rowsSearched.length === 0) { rowsSearched.push(createData("BRAK DANYCH", "-", "-", "-")) }
    }
    checkSearch();
    console.log("SEARCHED", rowsSearched)



    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-search"
                        label="Find Country"
                        type="search"
                        variant="outlined"
                        onChange={handleChangeSearch} />
                </form>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsSearched.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow hover={true} role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}




