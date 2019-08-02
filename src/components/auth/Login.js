import React, { useState } from 'react';
import AuthService from '../providers/auth-service';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
// import { flexbox } from '@material-ui/system';

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
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const user = values.username;
    const pass = values.password;
    console.log(`username: ${user}, password: ${pass}`);
    service.login(user, pass)
    .then( response => {
        this.setState({ username: '', password: '' });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }

  return(
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <form onSubmit={handleFormSubmit} className={classes.container} noValidate autoComplete="off">

          <TextField
          id="username"
          name="username"
          label="Email"
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
