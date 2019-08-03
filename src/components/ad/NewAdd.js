import React from 'react';
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
  const [values, setValues] = React.useState({
    description: '',
    title: '',
    imageFile: '',
    state: '',
    city: '',
    price: '',
    // status: '',
  });

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
    .catch( error => console.log(error) )
  }

  const onFileChangeHandler=event=>{
    console.log(event.target.files[0]);
    setValues({...values, imageFile: event.target.files[0] })
  }


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
          // margin="normal"
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
      {/* <TextField
        id="standard-select-currency"
        select
        label="Select"
        className={classes.textField}
        value={values.currency}
        onChange={handleChange('currency')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select your currency"
        margin="normal"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}
    </form>
  );
}