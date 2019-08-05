import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Fab from "@material-ui/core/Fab";


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  productDetails: {
    display: 'flex',
  },
  imageAd:  {
    border: 'solid 1px #DCDCDC',
    width: '100%',
  },
  containerPicture: {
    display: 'flex',
    justifyContent: 'center',
  },
  containerContent: {
    width: '50%'
  },
  submit: {
    width: '100%',
    margin: theme.spacing(3, 0, 4),
  },
  title: {
    fontWeight: 'bold',
    width: '100%',
    wordWrap: 'break-word',
  },
  price: {
    margin: theme.spacing(4, 0),
  }
}));

export default function Ad() {
  const classes = useStyles();
  return (
    <>
    <CssBaseline />
    <Container component="main" maxWidth="xl">
      <div className={classes.productDetails}>
      <Grid container spacing={2}>
        <Grid className={classes.containerPicture} item key="details" xs={12} sm={12} md={6}>
          <picture>
            <img className={classes.imageAd} src="https://res.cloudinary.com/layzafloriano/image/upload/v1564496790/project-management-gallery/coleira.jpg.jpg" alt="Imagem do produto"></img>
            {/* <img className={classes.imageAd} src="https://images.unsplash.com/photo-1475598322381-f1b499717dda?auto=format&fit=crop&w=1600&h=500&q=60" alt="Imagem do produto"></img> */}
          </picture>
        </Grid>
        <Grid className={classes.containerContent} item key="details" xs={12} sm={12} md={6}>
          <div>
            <Typography variant="h4" className={classes.title} gutterBottom>
              Título do produto
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Categoria: Cachorros
            </Typography>
            <Typography className={classes.price} variant="h5" gutterBottom>
              Valor: <span className={classes.title}>R$ 10,00</span>
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Detalhes do produto
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel ipsum ligula. Phasellus lacus nisl, tempus eget sollicitudin a, vehicula ac nisi. Ut iaculis neque ex, sit amet egestas risus commodo a. Mauris luctus sit amet eros placerat tempus. Nunc luctus sem nec nisi egestas malesuada. Sed laoreet luctus lorem quis dictum. Aliquam et dapibus turpis, quis placerat sem. Pellentesque molestie odio ultricies vulputate venenatis. Donec commodo et risus efficitur luctus. Ut at efficitur metus, a fermentum lacus. Vivamus blandit malesuada vehicula. Mauris at sem ut est laoreet maximus eget in magna. Phasellus posuere turpis lacinia, ornare erat ac, commodo nisi. Sed scelerisque, diam sit amet hendrerit facilisis, quam diam efficitur ex, eget tempus mi massa vitae turpis.
              Aenean nibh arcu, varius in ultricies vel, maximus at est. Phasellus pellentesque vel urna ut aliquam. Mauris id lorem iaculis, faucibus odio nec, aliquet eros. Etiam dui arcu, auctor a mi quis, sagittis laoreet enim. Praesent at vestibulum enim. Vivamus vulputate lacus id dolor accumsan, eu eleifend nisi tempus. Nulla facilisi. Morbi diam neque, tincidunt quis purus vel, rutrum vulputate nisl.
            </Typography>
            <Fab
                type="submit"
                size="large"
                variant="extended"
                color="primary"
                className={classes.submit}
                >
                Reservar
              </Fab>
          </div>
        </Grid>
      </Grid>
      </div>
    </Container>
    </>
  )

}