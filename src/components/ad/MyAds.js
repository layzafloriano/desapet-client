
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import AdService from '../../providers/ad-service';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
}));

export default function MyAds() {
  const classes = useStyles();
  const service = new AdService();

  const [listAd, setListAd] = useState([]);

  function getAds() {
    service.myAds()
      .then(res => {
        setListAd(res);
      })
      .catch(error => console.log(error));
  }

  useEffect(getAds, []);

  console.log(listAd);

  function formatMoney(money) {
    return money ? money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
  }

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Typography variant="h5" className={classes.title} gutterBottom>
          Meus anúncios
        </Typography>
        <Grid container spacing={4} className={classes.cardGrid}>
          {listAd && listAd.map((ad, index) => (
            <Grid item key={`myad-${index}`} xs={12} md={12}>
              <CardActionArea component="a" href="#">
                <Card>
                  <Hidden smUp>
                    <CardMedia
                      className={classes.imageMobile}
                      image={ad.imagePath}
                      title="Image title"
                    />
                  </Hidden>
                  <div className={classes.card}>
                    <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image={ad.imagePath}
                        title="Image title"
                      />
                    </Hidden>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component="h2" variant="h5">
                          {ad.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Valor: {formatMoney(ad.price)}
                        </Typography>
                        <Button component={Link} to={`/anuncio/${ad._id}`} size="small" color="primary">
                          Ver mais
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
