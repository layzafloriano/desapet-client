import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
    marginTop: theme.spacing(-5),
    backgroundImage: 'url(./assets/cover.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
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
    color: '#FFFFFF',
  },
  showcaseTitle: {
    marginTop: theme.spacing(3),
  }
}));


export default function Home() {
  const classes = useStyles();
  const cards = [0, 1, 2];
  const testText = 'Phasellus eu commodo diam. Curabitur dui sapien, consectetur id diam eu, maximus posuere ante. Donec malesuada vel tellus non tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus.';
  
  function limitText(text) {
    return text.length > 120 ? `${text.substr(0, 110)}...` : text;
  }

  function showcaseList(list) {
    return (
      <Grid container spacing={4}>
        {list.map(card => (
          <Grid item key={card} xs={12} sm={4} md={4}>
            <Box boxShadow={2} className={classes.card}>
              <div className={classes.cardFront}>
                <div className={classes.cardShadow}></div>
                <CardMedia
                  className={classes.cardMedia}
                  image="http://res.cloudinary.com/layzafloriano/image/upload/v1565125034/project-management-gallery/adidog.jpg.jpg"
                  title="Image title"
                />
                <div className={classes.cardImageOverlay}></div>
                <Link
                  className={classes.cardViewDetails}
                  to={"/anuncio/5d49e9ac62f3fe255dc8c97b"}>
                  Ver anúncio
                </Link>
                <div className={classes.statsContainer}>
                  <div className={classes.cardTitle}>Título do anúncio</div>
                  <div className={classes.cardPrice}>R$ 25,00</div>
                  <div className={classes.cardText}>
                    {limitText(testText)}
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
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" className={classes.colorWhite} gutterBottom>
              Desapet!
            </Typography>
            <Typography variant="h5" align="center" className={classes.colorWhite} paragraph>
              Something short and leading about.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          <Typography className={classes.showcaseTitle} component="h1" variant="h5" align="left" gutterBottom>
            Cachorros
          </Typography>
          {showcaseList(cards)}

          <Typography className={classes.showcaseTitle} component="h1" variant="h5" align="left" gutterBottom>
            Gatos
          </Typography>
          {showcaseList(cards)}

          <Typography className={classes.showcaseTitle} component="h1" variant="h5" align="left" gutterBottom>
            Outros
          </Typography>
          {showcaseList(cards)}
        </Container>
      </main>
    </>
  );
}
