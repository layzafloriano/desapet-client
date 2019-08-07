
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  imageMobile: {
    width: '100%',
    height: 200
  },
  title: {
    fontWeight: 'bold',
    width: '100%',
    wordWrap: 'break-word',
    marginBottom: theme.spacing(2),
  },
  btnGreen: {
    background: '#4caf50'
  },
  btnRed: {
    background: '#ef5350'
  },
}));

export default function AdminModeration() {
  const classes = useStyles();

  const adminModeration = [
    {
      title: 'Título do anúncio',
      value: 254.0,
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
    {
      title: 'Título do anúncio',
      value: 254.0,
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
    {
      title: 'Título do anúncio',
      value: 254.0,
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
    {
      title: 'Título do anúncio',
      value: 254.0,
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
  ];

  function formatMoney(money) {
    return money ? money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
  }

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Typography variant="h5" className={classes.title} gutterBottom>
          Moderação de conteúdo
        </Typography>
        <Grid container spacing={4} className={classes.cardGrid}>
          {adminModeration.map((post, index) => (
            <Grid item key={`myad-${index}`} xs={12} md={12}>
              <Card>
                <Hidden smUp>
                  <CardMedia
                    className={classes.imageMobile}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                </Hidden>
                <div className={classes.card}>
                  <Hidden xsDown>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                  </Hidden>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {post.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        Valor: {formatMoney(post.value)}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {post.description}
                      </Typography>

                      <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button>Ver anúncio</Button>
                        <Button className={classes.btnGreen}>Aprovar</Button>
                        <Button className={classes.btnRed}>Recusar</Button>
                      </ButtonGroup>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
