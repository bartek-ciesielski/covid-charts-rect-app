import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Totals from './Totals';
import CounriesTable from './TableCountries'


import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Bartek Ciesielski
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 740,
  },
}));

export default function Dashboard() {

  /* lato-regular - latin */
  const lato = {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 400,
    src: `local('Lato Regular'), local('Lato-Regular'),
        url('../fonts/lato-v16-latin-regular.eot'),
       url('../fonts/lato-v16-latin-regular.eot?#iefix'),
       url('../fonts/lato-v16-latin-regular.woff2'),
       url('../fonts/lato-v16-latin-regular.woff'),
       url('../fonts/lato-v16-latin-regular.ttf'),
       url('../fonts/lato-v16-latin-regular.svg#Lato') format('svg'),`
  }

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: cyan['200'],
      },
      secondary: {
        main: '#ff9800',
      },
    },
    typography: {
      fontFamily: 'Lato',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [lato],
        },
      },
    },
  });

  console.log(theme.typography, 'TYPPOGRPHY')

  // const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [country1chosen, setCountry1] = React.useState('');
  const [country2chosen, setCountry2] = React.useState('');
  const [count, setCount] = React.useState('');
  const [count2, setCount2] = React.useState('');
  const [chartFactor, setChartFactor] = React.useState('');

  const handleChangeCountryName1 = (el, el2, el3) => {
    setCountry1(el);
    setCount(el2);
    setChartFactor(el2);
  };

  const handleChangeCountryName2 = (el, el2, el3) => {
    setCountry2(el);
    setCount2(el2);
    setChartFactor(el3);
  };


  console.log(country1chosen, count, "DASHBOARD COUTRY 3");
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Coronavirus Charts
          </Typography>

            {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          { /*<Divider />
        <List>{secondaryListItems}</List> */ }
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  className={fixedHeightPaper}
                  style={{ alignItems: "center", justifyContent: 'center' }}
                >
                  <Chart
                    handleDashboardCountryName1={handleChangeCountryName1}
                    handleDashboardCountryName2={handleChangeCountryName2}
                  />
                </Paper>
              </Grid>
              {/* Totals */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Totals
                    country1={country1chosen}
                    sickCount={count}
                    country2={country2chosen}
                    sickCount2={count2}
                    factor={chartFactor} />
                </Paper>
              </Grid>
              {/* TableCountry */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <CounriesTable />
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}