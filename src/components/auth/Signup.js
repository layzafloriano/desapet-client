import React, { useState } from 'react';
import AuthService from '../providers/auth-service';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Error from '../error/Error'


const useStyles = makeStyles(theme => ({
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


const Signup = (props) => {
  const service = new AuthService();
  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const renderError = () => {
    if( values.hasError === true ) {
      return (<Error></Error>)
    }
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const user = values.username;
    const pass = values.password;
    console.log(`username: ${user}, password: ${pass}`);
    service.signup(user, pass)
    .then( response => {
        setValues({ username: '', password: '' });
        props.getUser(response)
        window.location.href = '/';
    })
    .catch( error => console.log(error) )
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
          style={{ margin: 8 }}
          onChange={handleChange('username')}
          />

          <TextField
          id="standard-password-input"
          label="Senha"
          variant="outlined"
          fullWidth
          required
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          style={{ margin: 8 }}
          onChange={handleChange('password')}
          />

          <Button
          variant="outlined" 
          color="primary"
          type="submit">
          Criar conta
          </Button>
          
        </form>
        <p>Já possui conta?
            <Link to={"/signup"}> Entre aqui</Link>
        </p>
      </Card>
    </Container>
  )
}

export default Signup;