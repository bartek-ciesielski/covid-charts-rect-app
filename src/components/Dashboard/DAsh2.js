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


import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


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
  toolbar1: {

    background: 'linear-gradient(45deg, #FF8E53 30%,  #d32f2f 90%)',
    boxShadow: '0 2px 3px 2px rgba(255, 105, 135, .3)',

  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar1}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
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
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

        <main  className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}>

          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg"  className={classes.drawerHeader}>
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