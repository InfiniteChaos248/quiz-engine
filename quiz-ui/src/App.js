import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './pages/home'
import Toolbar from '@material-ui/core/Toolbar';
import SiteAppBar from './components/appbar';
import SiteDrawer from './components/drawer';
import QuizBuilder from './pages/builder';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    textAlign: 'center',
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
}));

function App() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <SiteAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
        <SiteDrawer open={open} handleDrawerClose={handleDrawerClose} />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Toolbar />
          <Switch>
            <Route exact path="/"> <Home /> </Route>
            <Route path="/create"> <QuizBuilder /> </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
