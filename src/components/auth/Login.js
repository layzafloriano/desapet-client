import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Error from '../error/Error';
import AuthService from '../../providers/auth-service';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(1, 0 , 3),
  },
  submit: {
    width: '100%',
    margin: theme.spacing(3, 0, 4),
  },
  avatar: {
    margin: theme.spacing(1, 1, 3),
  },
  avatarImg: {
    objectFit: 'cover',
    width: 140,
    height: 140,
    borderRadius: 300,
    overflow: 'hidden',
  }
}));

const Login = (props) => {
  const service = new AuthService();
  const classes = useStyles();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({
    hasError: false,
    message: '',
  });
  const [iconRandom] = useState(generateIconRandom());

  function handleChange(name) {
    return event => setLoginData({ ...loginData, [name]: event.target.value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const user = loginData.username;
    const pass = loginData.password;
    service.login(user, pass)
      .then(response => {
        props.getUser(response);
        window.location.href = '/';
      })
      .catch(err => {
        setError({ ...error, hasError: true, message: err.message });
      })
  }

  function generateIconRandom() {
    return `./assets/pet-random-${Math.floor(Math.random() * 5)}.gif`;
  }

  function closeError() {
    setError({ ...error, hasError: false, message: '' });
  }

  return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {iconRandom && <picture className={classes.avatar}>
          <img
            className={classes.avatarImg}
            src={iconRandom}
            alt="Pet fofinho"
          />
        </picture>}

        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <form onSubmit={handleFormSubmit} className={classes.form}>
          <TextField
            id="username"
            name="username"
            label="Email"
            variant="outlined"
            fullWidth
            required
            className={classes.textField}
            margin="normal"
            autoComplete="email"
            autoFocus
            onChange={handleChange('username')}
          />
          <TextField
            id="standard-password-input"
            name="password"
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            required
            className={classes.textField}
            autoComplete="current-password"
            margin="normal"
            onChange={handleChange('password')}
          />

          {error.hasError && 
            <Error
              message={error.message}
              onClose={closeError}>
            </Error>
          }

          <Fab
            type="submit"
            size="large"
            variant="extended"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Fab>

          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link to={"/signup"}>
                Ainda não tem conta? Cadastre-se
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default Login;
