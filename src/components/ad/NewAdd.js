import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AdService from '../providers/ad-service'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: 200,
  // },
  // dense: {
  //   marginTop: 19,
  // },
  // menu: {
  //   width: 200,
  // },
}));

export default function NewAdd(props) {
  const service = new AdService();
  const classes = useStyles();
  const [values, setValues] = useState({
    description: '',
    title: '',
    imageFile: '',
    price: '',
    state: '',
    city: '',
    // status: '',
  });

  const [listState, setListState] = useState([]);

  const [listCity, setListCity] = useState([]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const title = values.title;
    const description = values.description;
    const imageFile = values.imageFile;
    const price = values.price;
    const state = values.state;
    const city = values.city;

    const data = new FormData() 
    data.append('photo', values.imageFile)

    service.addAd(title, description, price, state, city, imageFile)
    .then(res => {
      return (<Redirect push to ='/' />);
    })
    .catch( error => console.log(error) )
  }

  const onFileChangeHandler=event=>{
    setValues({...values, imageFile: event.target.files[0] })
  }

  // get state list, when page load
  function getListState() {
    service.getListState()
      .then(res => {
        setListState(res);
      })
      .catch(error => console.log(error));
  }

  useEffect(getListState, []);

  function getListCity() {
    if (!values.state) return;
    setListCity([]);
    service.getListCity(values.state)
      .then(res => {
        setListCity(res);
        console.log('tá chamando');
      })
      .catch(error => console.log(error));
  }

  useEffect(getListCity, [values.state]);

  
  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data" className={classes.container} noValidate autoComplete="off">
      <TextField
          id="title"
          name="title"
          label="Título"
          variant="outlined"
          fullWidth
          required
          className={classes.textField}
          style={{ margin: 8 }}
          onChange={handleChange('title')}
          />
      <TextField
        id="description"
        label="Descrição"
        variant="outlined"
        fullWidth
        required
        multiline
        rows="10"
        className={classes.textField}
        margin="normal"
        style={{ margin: 8 }}
        onChange={handleChange('description')}
      />
      
      <TextField
        id="price"
        label="Valor do produto - R$"
        variant="outlined"
        // value={values.age}
        onChange={handleChange('price')}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        style={{ margin: 8 }}
      />

      <TextField
        id="photo"
        name="photo"
        label="Selecione uma imagem"
        variant="outlined"
        onChange={(e)=> onFileChangeHandler(e)}
        type="file"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        style={{ margin: 8 }}
      />
      <Button
          variant="outlined" 
          color="primary"
          type="submit">
          Login
      </Button>
      <TextField
        id="states"
        select
        label="Selecione um estado"
        className={classes.textField}
        value={values.state}
        onChange={handleChange('state')}
        margin="normal"
      >
        {listState.map(option => (
          <MenuItem key={option.stateID} value={option.stateID}>
            {option.sigla}
          </MenuItem>
        ))}
      </TextField>

      {values.state  && listCity.length && <TextField
        id="cities"
        select
        label="Selecione uma cidade"
        className={classes.textField}
        value={values.city}
        onChange={handleChange('city')}
        margin="normal"
      >
        {listCity.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>}
    </form>
  );
}