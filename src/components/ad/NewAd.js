import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AdService from '../../providers/ad-service'
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import Success from '../success/Success';
import Error from '../error/Error';

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
    margin: theme.spacing(1, 0, 5),
  },
  submit: {
    minWidth: 250,
    margin: theme.spacing(1, 0, 2),
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

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale="2"
      fixedDecimalScale={true}
      prefix="R$ "
    />
  );
}

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
    category: '',
    contact: '',
  });
  const [successModal, setSuccessModal] = useState({
      display: false,
      title: 'Sucesso!',
      message: 'Seu anúncio foi salvo, e será analisado pela nossa equipe',
      buttonOne: {
        text: 'Adicionar novo',
        callback: redirectNewAd,
      },
  });

  const [error, setError] = useState({
    hasError: false,
    message: '',
  });

  const [listState, setListState] = useState([]);

  const [listCity, setListCity] = useState([]);

  const [listCategory, setListCategory] = useState([]);

  const [iconRandom] = useState(generateIconRandom());

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
    const category = values.category;
    const contact = values.contact;

    const data = new FormData() 
    data.append('photo', values.imageFile)

    service.addAd(title, description, price, state, city, imageFile, category, contact)
    .then(res => {
      console.log(res)
      setSuccessModal({
        ...successModal,
        display: true,
        buttonTwo: {
          text: 'Ver anúncio',
          callback: () => redirectToAd(res._id),
        },
      });
    })
    .catch( err => setError({ ...error, hasError: true, message: err.message }))
  }

  function closeError() {
    setError({ ...error, hasError: false, message: '' });
  }

  function redirectNewAd() {
    window.location.href = '/novo-anuncio';
  }

  function redirectToAd(id) {
    window.location.href = `/anuncio/${id}`;
  }

  function generateIconRandom() {
    return `./assets/pet-random-${Math.floor(Math.random() * 5)}.gif`;
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

  function getListCategory() {
    service.getCategory()
      .then(res => {
        setListCategory(res);
        console.log(res)
      })
      .catch(error => console.log(error));
  }

  useEffect(getListState, []);

  useEffect(getListCategory, []);

  function getListCity() {
    if (!values.state) return;
    setListCity([]);
    service.getListCity(values.state)
      .then(res => {
        setListCity(res);
      })
      .catch(error => console.log(error));
  }

  useEffect(getListCity, [values.state]);


  console.log(values);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <picture className={classes.avatar}>
          <img
            className={classes.avatarImg}
            src={iconRandom}
            alt="Pet fofinho"
          />
        </picture>
        <Typography component="h1" variant="h5">
          Criar anúncio
        </Typography>

        <form
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
          className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title"
                name="title"
                label="Título"
                variant="outlined"
                fullWidth
                required
                className={classes.textField}
                margin="normal"
                autoFocus
                onChange={handleChange('title')}
              />
            </Grid>

            <Grid item xs={12}>
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
                onChange={handleChange('description')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="price"
                label="Valor do produto - R$"
                variant="outlined"
                onChange={handleChange('price')}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.textField}
                fullWidth
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
                required
                fullWidth
                SelectProps={{
                  native: true
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="states"
                select
                label="Selecione um estado"
                className={classes.textField}
                value={values.state}
                onChange={handleChange('state')}
                margin="normal"
                // required
                variant="outlined"
                fullWidth
                SelectProps={{
                  native: true
                }}
              >
                <option />
                {listState.map(option => (
                  <option key={option.stateID} value={option.stateID}>
                    {option.sigla}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              {values.state  && !!listCity.length &&
                <TextField
                  id="cities"
                  select
                  label="Selecione uma cidade"
                  className={classes.textField}
                  value={values.city}
                  onChange={handleChange('city')}
                  margin="normal"
                  // required
                  variant="outlined"
                  fullWidth
                  SelectProps={{
                    native: true
                  }}
                >
                  <option />
                  {listCity.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="categories"
                select
                label="Selecione uma categoria"
                className={classes.textField}
                value={values.category}
                onChange={handleChange('category')}
                margin="normal"
                // required
                variant="outlined"
                fullWidth
                SelectProps={{
                  native: true
                }}
              >
                <option />
                {listCategory.map(option => (
                  <option key={option.category} value={option._id}>
                    {option.category}
                  </option>
                ))}
              </TextField>
            </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                id="contact"
                label="Dado de contato"
                variant="outlined"
                onChange={handleChange('contact')}
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.textField}
                fullWidth
                margin="normal"
                required
              />
            </Grid>

            {error.hasError && 
            <Error
              message={error.message}
              onClose={closeError}>
            </Error>
            }

            <Grid item xs={12}>
              <Fab
                type="submit"
                size="large"
                variant="extended"
                color="primary"
                className={classes.submit}
                >
                Publicar
              </Fab>
            </Grid>
          </Grid>

          <Success
            display={successModal.display}
            title={successModal.title}
            message={successModal.message}
            buttonOne={successModal.buttonOne}
            buttonTwo={successModal.buttonTwo}>
          </Success>
        </form>
      </div>
    </Container>
  );
}