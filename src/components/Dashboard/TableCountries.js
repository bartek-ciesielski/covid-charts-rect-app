import React, { useEffect } from 'react';
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
import dataCSVdaily from '../../Data/dataTableDaily';
import ImportExportTwoToneIcon from '@material-ui/icons/ImportExportTwoTone';
import moment from 'moment';

import { readString } from 'react-papaparse'


const columns = [
    { id: 'name', label: 'Country', minWidth: 150 },
    { id: 'sickCount', label: 'Confirmed Cases', minWidth: 40, align: 'right', },
    {
        id: 'deathCount',
        label: 'Deaths',
        minWidth: 40,
        align: 'right',
        format: value => value.toLocaleString(),
    },
    {
        id: 'recoveredCount',
        label: 'Recovered',
        minWidth: 40,
        align: 'right',
        format: value => value.toLocaleString(),
    },

];

function createData(name, sickCount, deathCount, recoveredCount) {
    return { name, sickCount, deathCount, recoveredCount };
}

// const rowsUnsorted = dataCSVdaily.data.map((el) => {
//     return createData(
//         el['Province_State'] === '' ? el['Country_Region'] : `${el['Country_Region']} - ${el['Province_State']}`,
//         el.Confirmed,
//         el.Deaths,
//         el.Recovered)
// });

let rowsUnsorted = [];

const sortByName = () => rowsUnsorted.sort(function (a, b) {
    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
    if (nameA < nameB) //sort string ascending
        return -1
    if (nameA > nameB)
        return 1
    return 0 //default return value (no sorting)
});


let rows = [];
const rowsSortedbyNameAsc = () => rows = sortByName()
const rowsSortedbyNameDesc = () => rows = sortByName().reverse()
const rowsSortedbySickDesc = () => rows = rowsUnsorted.sort(function (a, b) { return b.sickCount - a.sickCount });
const rowsSortedbySickAsc = () => rows = rowsUnsorted.sort(function (a, b) { return b.sickCount - a.sickCount }).reverse();
const rowsSortedbyDeathDesc = () => rows = rowsUnsorted.sort(function (a, b) { return b.deathCount - a.deathCount });
const rowsSortedbyDeathAsc = () => rows = rowsUnsorted.sort(function (a, b) { return b.deathCount - a.deathCount }).reverse();
const rowsSortedbyRecoveredDesc = () => rows = rowsUnsorted.sort(function (a, b) { return b.recoveredCount - a.recoveredCount });
const rowsSortedbyRecoveredAsc = () => rows = rowsUnsorted.sort(function (a, b) { return b.recoveredCount - a.recoveredCount }).reverse();

// rowsSortedbyNameAsc()

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            maxWidth: '58vw',
        },
    },
    container: {
        // backgroundColor: theme.palette.grey[200],
        // maxHeight: 440,
    },
}));

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchValue, setSearchValue] = React.useState('');
    const [sortName, setSortName] = React.useState(false);
    const [sortSick, setSortSick] = React.useState(false);
    const [sortDeath, setSortDeath] = React.useState(false);
    const [sortRecovered, setSortRecovered] = React.useState(false);
    const [dataDaily, setDataDaily] = React.useState(dataCSVdaily)

    const raportDate = moment(Date.now() - 24 * 60 * 60 * 1000).format('MM-DD-YYYY');
    console.log(raportDate, "DATE")
    const API_URL_DAILY = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${raportDate}.csv`

    const getDataDaily = () => {
        return fetch(API_URL_DAILY)
          .then((response) => response.text())
          .then((dataString) => {
            const dataCSVfetch= readString(`${dataString}`,
            {
                header: true,
            }
        )
            setDataDaily(dataCSVfetch)
          })
      }

      useEffect(() => {
        getDataDaily()
        rowsSortedbyNameAsc()
      }, [])


    let dataDailyTableData = [];
    dataDaily.data.length > 0 ? dataDailyTableData = dataDaily.data.slice(0, dataDaily.data.length-1) : dataDailyTableData = dataCSVdaily.data;

    rowsUnsorted = dataDailyTableData.map((el) => {
        return createData(
            el['Province_State'] === '' ? el['Country_Region'] : `${el['Country_Region']} - ${el['Province_State']}`,
            el.Confirmed,
            el.Deaths,
            el.Recovered)
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSort = property => event => {
        if (property === 'name') {
            sortName === true ? rowsSortedbyNameAsc() : rowsSortedbyNameDesc()
            setSortName(!sortName)
        }
        if (property === 'sickCount') {
            sortSick === true ? rowsSortedbySickDesc() : rowsSortedbySickAsc()
            setSortSick(!sortSick)
        }
        if (property === 'deathCount') {
            sortDeath === true ? rowsSortedbyDeathDesc() : rowsSortedbyDeathAsc()
            setSortDeath(!sortDeath)
        }
        if (property === 'recoveredCount') {
            sortRecovered === true ? rowsSortedbyRecoveredDesc() : rowsSortedbyRecoveredAsc()
            setSortRecovered(!sortRecovered)
        }
    }

    const handleChangeSearch = (event) => setSearchValue(event.target.value)
    const rowsSearched = [];
    const checkSearch = () => {
        rows.forEach(el => {
            if (el.name.toLowerCase().includes(searchValue.toLowerCase()) || !searchValue) rowsSearched.push(el);
        }
        );
        if (rowsSearched.length === 0) { rowsSearched.push(createData("NO DATA", "-", "-", "-")) }
    }

    checkSearch();

    return (
        <Paper className={classes.root} id='compare'>
            <TableContainer className={classes.container}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField className={'search'}
                        id="outlined-search"
                        label="Find Country"
                        type="search"
                        variant="outlined"
                        onChange={handleChangeSearch}
                    />
                </form>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            {columns.map((column, i) => (
                                <TableCell
                                    key={i}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    onClick={handleSort(column.id)}
                                >
                                    <div style={column.id === 'name' ?
                                        { display: 'flex', justifyContent: 'flex-start', alignItems: 'center' } :
                                        { display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        {column.label}<ImportExportTwoToneIcon style={{ marginLeft: '10px', fontSize: 'medium' }} />
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsSearched.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i)=> {
                            return (
                                <TableRow  key={i} hover={true} role="checkbox" tabIndex={-1} >
                                    {columns.map((column, i) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={i} align={column.align}>
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




