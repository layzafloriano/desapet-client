import React, { useState } from 'react';
import AuthService from '../providers/auth-service';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Error from '../error/Error';


const useStyles = makeStyles(theme => ({
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   flexDirection: 'column',
  // },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
  card: {
    maxWidth: 500,
    margin: '0 auto',
    marginTop: 100,
    padding: 30
  },
}));

const Login = (props) => {
  const service = new AuthService();
  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: '',
    hasError: false,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const user = values.username;
    const pass = values.password;
    console.log(`Request é user: ${user} pass: ${pass}`);
    console.log(`state: user: ${values.username} pass: ${values.username} `)
    service.login(user, pass)
    .then( response => {
        props.getUser(response);
        window.location.href = '/';
    })
    .catch( error => {
      console.log(error);
      setValues({ ...values, hasError: true });
     })
  }

  const renderError = () => {
    if( values.hasError === true ) {
      return (<Error></Error>)
    }
  }

  return(
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <form onSubmit={handleFormSubmit} className={classes.container} noValidate autoComplete="off">
          <div>{renderError()}</div>
          <TextField
          id="username"
          name="username"
          label="Email"
          variant="outlined"
          fullWidth
          required
          className={classes.textField}
          helperText="Digite seu e-mail aqui"
          // margin="normal"
          style={{ margin: 8 }}
          onChange={handleChange('username')}
          />

          <TextField
          id="standard-password-input"
          label="Password"
          variant="outlined"
          fullWidth
          required
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          // margin="normal"
          style={{ margin: 8 }}
          onChange={handleChange('password')}
          />

          <Button
          variant="outlined" 
          color="primary"
          type="submit">
          Login
          </Button>
          
        </form>
        <p>If you don't have an account yet, you can create your account
            <Link to={"/signup"}> Here</Link>
        </p>
      </Card>
    </Container>
  )
}

export default Login;
