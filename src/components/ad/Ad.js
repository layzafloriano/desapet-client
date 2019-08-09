import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Fab from "@material-ui/core/Fab";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AdService from '../../providers/ad-service';
import AdminService from '../../providers/admin-service';
import Button from '@material-ui/core/Button';
import Promote from './Promote';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  productDetails: {
    display: 'flex',
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
  contentCard: {
    padding: 15,
    height: '100%',
  },
  imageAd: {
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
    margin: theme.spacing(5, 0, 0),
  },
  title: {
    fontWeight: 'bold',
    width: '100%',
    wordWrap: 'break-word',
  },
  price: {
    margin: theme.spacing(2, 0),
  },
  alert: {
    color: '#FF0000',
  },
  showcaseTitle: {
    marginBottom: theme.spacing(2),
  },
  relatedAd: {
    margin: theme.spacing(4, 0),
  },
  titleShowCase: {
    marginBottom: theme.spacing(2),
  }
}));


export default function Ad(props) {
  const service = new AdService();
  const adminService = new AdminService();
  const classes = useStyles();
  const { id } = props.match.params;
  const [adData, setAd] = useState({});
  const [adCategory, setAdCategory] = useState('');
  const [adShopCase, setAdShopCase] = useState([]);
  const [showPromote, setShowPromote] = useState(false);
  const [showOptionPromote, setShowOptionPromote] = useState(false);

  function getAd() {
    service.internAd(id)
      .then(res => {
        setAd(res.ad);
        setAdCategory(res.categoryName);
        adminService.showCaseOnDisplay(res.shopWindow[0]._id)
          .then(resShopcase => {
            setAdShopCase(resShopcase.ad)
          })
          .catch(err => console.log(err));
      })
      .catch(error => console.log(error));
  }
  
  console.log(adShopCase);


  function checkIfOwner() {
    service.checkIfOwner(id)
      .then(res => {
        setShowOptionPromote(true);
      })
      .catch(error => console.log(error));
  }


  function makeReservation(event) {
    event.preventDefault();
    service.makeReservation(id)
      .then(res => {
        getAd();
      })
      .catch(error => console.log(error));
  }

  function initialVerifications() {
    getAd();
    checkIfOwner()
  }
    
  

  useEffect(initialVerifications, []);

  function formatMoney(money) {
    return money ? money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
  }

  function promoteClick() {
    setShowPromote(!showPromote);
  }

  function showcaseList(list) {
    return (
      list && <Grid container spacing={4}>
        {list.slice(0,4).map(card => (
          <Grid item key={card} xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={card.imagePath}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography className={classes.titleShowCase}>
                  <strong>{card.title}</strong>
                </Typography>
                <Typography>
                  {formatMoney(card.price)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={ Link } to={`/anuncio/${card._id}`} size="small" color="primary">
                  Ver mais
                </Button>
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
    <Container component="main" maxWidth="md">
      <div className={classes.productDetails}>
        <Grid container spacing={4}>
          <Grid className={classes.containerPicture} item key="details" xs={12} sm={6} md={6}>
            <Card className={classes.card}>
              <picture>
                {adData.imagePath && <img className={classes.imageAd} src={adData.imagePath} alt="Imagem do produto"></img>}
              </picture>
            </Card>
          </Grid>
          <Grid className={classes.containerContent} item key="details" xs={12} sm={6} md={6}>
            <Card className={classes.contentCard}>
              <div>
                {
                  adData.status==='Pending Confirmation' && <Typography className={ classes.alert } variant="subtitle2" gutterBottom>
                  Este pedido está pendente de aprovação. Qualquer dúvida entre em contato com o nosso suporte.
                </Typography>
                }
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Categoria: <strong>{adCategory}</strong>
                </Typography>
                <Typography variant="h4" className={classes.title} gutterBottom>
                  {adData.title}
                </Typography>
                <Typography className={classes.price} variant="h5" gutterBottom>
                  Valor: <span className={classes.title}>{formatMoney(adData.price)}</span>
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  <strong>Detalhes do produto:</strong>
                </Typography>
                <Typography variant="body2" component="p">
                  {adData.description}
                </Typography>
                <Typography className={classes.price} variant="h6" gutterBottom>
                  Contato com o vendedor: <span className={classes.alert}>{adData.contact}</span>
                </Typography>

                {adData.status === 'Reserved' && <Fab
                    type="submit"
                    size="large"
                    variant="extended"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) => makeReservation(e)}
                    disabled={true}
                    >
                    Produto Reservado
                  </Fab>}

                {adData.status !== 'Reserved' && <Fab
                    type="submit"
                    size="large"
                    variant="extended"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) => makeReservation(e)}
                    >
                    Reservar
                  </Fab>}

                  {showOptionPromote &&<Fab
                    size="large"
                    variant="extended"
                    color="primary"
                    className={classes.submit}
                    onClick={() => promoteClick()}
                    >
                    Promover
                  </Fab>
                }
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>

      <div className={classes.relatedAd}>
        {
          showPromote && <Promote { ...adData }/>
        }
        <Typography className={classes.showcaseTitle} component="h1" variant="h5" align="left" gutterBottom>
          Produtos similares
        </Typography>
        {showcaseList(adShopCase)}
      </div>
    </Container>
    </>
  )

}