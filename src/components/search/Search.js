import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AdService from '../../providers/ad-service';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  colorWhite: {
    color: '#FFFFFF',
  },
  showcaseTitle: {
    margin: theme.spacing(3),
  }
}));

export default function Search(props) {
  const classes = useStyles();
  const { search } = props.match.params;
  const service = new AdService();

  const [listResult, setListResult] = useState({
    quantity: 0,
    search: [],
  });

  function getResults() {
    service.search(search)
      .then(res => {
        setListResult({search: res.search, quantity: res.quantity})
      })
      .catch(error => console.log(error));
  }

  useEffect(getResults, []);

  function formatMoney(money) {
    return money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function showcaseList(list) {
    return (
      <Grid container spacing={4}>
        {list.map(card => (
          <Grid item key={card} xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={card.imagePath}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
              <Typography>
                  {card.title}
                </Typography>
                <Typography>
                  {formatMoney(card.price)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/anuncio/${card._id}`} size="small" color="primary">
                  Ver mais
                </Button>
                {/* <Button size="small" color="primary">
                  Reservar
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography className={classes.showcaseTitle} component="h1" variant="h5" align="left" gutterBottom>
            {`Encontramos ${listResult.quantity} resultados para: ${search}`}
          </Typography>
          {showcaseList(listResult.search)}
        </Container>
      </main>
    </>
  );
}
