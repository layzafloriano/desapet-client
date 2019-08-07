import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../search/SearchBar'
import clsx from 'clsx';
import AuthService from '../../providers/auth-service';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PetsIcon from '@material-ui/icons/Pets';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: 64,
    marginBottom: theme.spacing(4),
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
    padding: '0 8px',
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
  iconWhite: {
    color: '#FFFFFF'
  },
  link: {
    color: '#000000 !important',
    textDecoration: 'none !important',
  },
}));

export default function Navbar(props) {
  const service = new AuthService();
  const classes = useStyles();
  const [session, setSession] = useState({ loggedInUser: null });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setSession({ loggedInUser: props.userInSession });
  }, [props.userInSession]);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function logoutUser() {
    service.logout()
      .then(() => {
        setSession({ loggedInUser: props.userInSession });
        window.location = '/login';
      });
  }

  function menuContent() {
    let options = [];
  
    if(session.loggedInUser){
      options = [
        {
          text: `Olá, ${session.loggedInUser.username}`,
          link: '',
          icon: (<AccountCircleIcon />),
        },
        {
          text: 'Página Inicial',
          link: '/',
          icon: (<HomeIcon />),
        },
        {
          text: 'Criar novo anúncio',
          link: '/novo-anuncio',
          icon: (<PetsIcon />),
        },
        {
          text: 'Meus anúncios',
          link: '/meus-anuncios',
          icon: (<PetsIcon />),
        },
        {
          text: 'Minhas reservas',
          link: '/minhas-reservas',
          icon: (<PetsIcon />),
        },
        {
          text: 'Sair',
          onClick: logoutUser,
          icon: (<ExitToAppIcon />),
        },
      ];
    } else {
      options = [
        {
          text: 'Página Inicial',
          link: '/',
          icon: (<HomeIcon />),
        },
        {
          text: 'Login',
          link: '/login',
          icon: (<AccountCircleIcon />),
        },
        {
          text: 'Signup',
          link: '/signup',
          icon: (<PersonAddIcon />),
        },
      ];
    }

    function itemContent(item, index) {
      return (
        <ListItem button key={`menuItem${index}`}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      );
    }

    function itemLink(item, index) {
      return (
        <Link
          to={item.link}
          className={classes.link}
          key={`itemLink${index}`}>
          {itemContent(item, index)}
        </Link>
      );
    }

    function itemClick(item, index) {
      return (
        <div
          onClick={item.onClick}
          key={`itemClick${index}`}>
          {itemContent(item, index)}
        </div>
      );
    }

    return (
      <List>
        {options.map((item, index) => {
          return item.onClick ? itemClick(item, index) : itemLink(item, index);
        })}
      </List>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <IconButton>
              <PetsIcon className={classes.iconWhite} />
            </IconButton>
            DesaPet
          </Typography>
          <SearchBar />
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
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {menuContent()}
      </Drawer>
    </div>
  );
};
