import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import AdminService from '../../providers/admin-service';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: '#fbe1b7',
    padding: theme.spacing(0),
    marginTop: theme.spacing(-5),
    backgroundImage: 'url(./assets/desapet.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '4% 40%',
    // backgroundSize: 'cover',
    minHeight: 400,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
  },
  card: {
    position: 'relative',
    width: '100%',
    height: 360,
    overflow: 'hidden',
    borderRadius: 5,
    transition: 'transform 5s',
  },
  cardFront: {
    width: '100%',
    height: 360,
    background: '#fff',
    transition: 'all 100ms ease-out',
    "&:hover>div:nth-of-type(3)": {
      opacity: 0.7,
    },
    "&:hover>a": {
      opacity: 1,
    },
    "&:hover>div:nth-of-type(4)": {
      top: 175,
      "&>div:nth-of-type(3)": {
        whiteSpace: 'pre-wrap',
      },
    },
  },
  cardShadow: {
    width: '100%',
    height: 360,
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 3,
    display: 'none',
    background: 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
  },
  cardMedia: {
    width: '100%',
    height: 230,
  },
  cardImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: theme.palette.primary.main,
    opacity: 0,
  },
  cardViewDetails: {
    display: 'block',
    position: 'absolute',
    top: 80,
    left: '50%',
    marginLeft: -85,    
    border: '2px solid #fff',
    color: '#fff',
    fontSize: 19,
    textAlign: 'center',
    padding: theme.spacing(3, 0),
    lineHeight: 0,
    width: 172,
    opacity: 0,
    borderRadius: 4,
    transition: 'all 200ms ease-out',
    textDecoration: 'none',
    "&:hover": {
      background: '#fff',
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
  statsContainer: {
    background: '#fff',
    position: 'absolute',
    top: 230,
    left: 0,
    width: '100%',
    height: 190,
    padding: theme.spacing(2),
    transition: 'all 200ms ease-out',
  },
  cardPrice: {
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 600,
    paddingTop: 3,
  },
  cardTitle: {
    fontSize: 20,
    color: '#393c45',
  },
  cardText: {
    fontSize: 16,
    color: '#b1b1b3',    
    margin: theme.spacing(1, 0),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  colorWhite: {
    color: 'black',
  },
  showcaseTitle: {
    marginTop: theme.spacing(3),
  },
 }));


export default function Home() {
  const classes = useStyles();
  const service = new AdminService()
  const [showCaseListDog, setshowCaseListDog] = useState([]);
  const [showCaseListCat, setshowCaseListCat] = useState([]);
  const [showCaseListOther, setshowCaseListOther] = useState([]);

  const cards = [0, 1, 2, 3];
  const testText = 'Phasellus eu commodo diam. Curabitur dui sapien, consectetur id diam eu, maximus posuere ante. Donec malesuada vel tellus non tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus.';
  
  function limitText(text) {
    return text.length > 120 ? `${text.substr(0, 110)}...` : text;
  }

  // function getShowCases() {
  //   service.getShowCases()
  //     .then(res => {
  //       setshowCaseList(res.active);
  //       res.active.map(ad => {
  //         return (service.showCaseOnDisplay(ad._id)
  //         .then(res => {
  //           console.log(res)
  //           setshowCaseList([...showCaseList, res]);
  //         })
  //         .catch(error => console.log(error)))
  //       })
        
  //     })
  //     .catch(error => console.log(error));
  // }

    function getDogs() {
      service.showCaseOnDisplay('5d4c73af0581b333aecccb13')
          .then(res => {
            console.log(res.ad)
            setshowCaseListDog(res.ad);
          })
          .catch(error => console.log(error))
    }  

    function getCats() {
      service.showCaseOnDisplay('5d4c74080581b333aecccb14')
          .then(res => {
            console.log(res.ad)
            setshowCaseListCat(res.ad);
          })
          .catch(error => console.log(error))
    } 

    // function getOthers() {
    //   service.showCaseOnDisplay('5d4c74080581b333aecccb14')
    //       .then(res => {
    //         console.log(res.ad)
    //         setshowCaseListOther(res.ad);
    //       })
    //       .catch(error => console.log(error))
    // } 


  useEffect(getDogs, []);
  useEffect(getCats, []);
  // useEffect(getOthers, []);

  function formatMoney(money) {
    return money ? money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
  }

  function showCaseCard(list) {
    return (
      list && <Grid container spacing={4}>
        {list.slice(0,4).map(card => (
          <Grid item key={card} xs={12} sm={3} md={3}>
            <Box boxShadow={2} className={classes.card}>
              <div className={classes.cardFront}>
                <div className={classes.cardShadow}></div>
                <CardMedia
                  className={classes.cardMedia}
                  image={card.imagePath}
                  title="Image title"
                />
                <div className={classes.cardImageOverlay}></div>
                <Link
                  className={classes.cardViewDetails}
                  to={`/anuncio/${card._id}`}>
                  Ver anúncio
                </Link>
                <div className={classes.statsContainer}>
                  <div className={classes.cardTitle}>{card.title}</div>
                  <div className={classes.cardPrice}>{formatMoney(card.price)}</div>
                  <div className={classes.cardText}>
                    {limitText(card.description)}
                  </div>
                </div>
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maWidth="xl">
            <Typography component="h1" variant="h2" align="center" className={classes.colorWhite} gutterBottom>
              DESAPET
            </Typography>
            <Typography variant="h5" align="center" className={classes.colorWhite} paragraph>
              Dê um novo sentido para as coisas que o seu bichinho não gosta mais.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Veja alguns produtos
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="xl">
          

          {/* {showCaseList.map((showcase, index) => {
          //   return (<Typography className={classes.showcaseTitle} key={index} component="h1" variant="h5" align="left" gutterBottom>
          //   {showcase.name}
          //  </Typography>)
        //  {showcaseCard(cards)}
        return (<Typography className={classes.showcaseTitle} component="h1" variant="h5" align="left" gutterBottom>
          Gatos
        </Typography>)
          })}
            */}
        
           <Typography className={classes.showcaseTitle} component="h1" variant="h5" align="left" gutterBottom>
             Cachorros
           </Typography>
           {showCaseCard(showCaseListDog)}

           <Typography className={classes.showcaseTitle} component="h1" variant="h5" align="left" gutterBottom>
             Outros
           </Typography>
           {showCaseCard(showCaseListCat)}
        </Container>
      </main>
    </>
  );
}
