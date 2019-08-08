
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 'bold',
    width: '100%',
    wordWrap: 'break-word',
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    width: '100%',
    wordWrap: 'break-word',
    marginBottom: theme.spacing(2),
  },
  showCaseList: {
    marginBottom: theme.spacing(4),
  },
  btnGreen: {
    background: '#4caf50'
  },
  btnRed: {
    background: '#ef5350'
  },
  showCaseItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default function AdminShowcaseItem(props) {
  const classes = useStyles();
  // const { id } = props.match.params;

  const adOnShowcase = [
    {
      _id: '5d49e9ac62f3fe255dc8c97b',
      title: 'Anúncio 1'
    },
    {
      _id: '5d49e9ac62f3fe255dc8c97b',
      title: 'Anúncio 2'
    },
    {
      _id: '5d49e9ac62f3fe255dc8c97b',
      title: 'Anúncio 3'
    },
  ];

  const adAvailables = [
    {
      _id: '5d49e9ac62f3fe255dc8c97b',
      title: 'Anúncio 45'
    },
    {
      _id: '5d49e9ac62f3fe255dc8c97b',
      title: 'Anúncio 50'
    },
    {
      _id: '5d49e9ac62f3fe255dc8c97b',
      title: 'Anúncio 80'
    },
  ];

  function handleAddAd(id) {
    console.log('handleAddAd', id);
  }

  function handleRemoveAd(id) {
    console.log('handleRemoveAd', id);
  }

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Typography variant="h5" className={classes.title} gutterBottom>
          Vitrine: Vitrine 01
        </Typography>

        <Typography variant="h6" className={classes.subtitle} gutterBottom>
          Anúncios ativos
        </Typography>

        <div className={classes.showCaseList}>
          {adOnShowcase.map((ad, index) => 
            <ExpansionPanel key={`adOnShowcase${index}`} expanded={false}>
              <ExpansionPanelSummary
                aria-controls="panel1bh-content"
              >
                <div className={classes.showCaseItem}>
                  <Typography className={classes.heading}>{ad.title}</Typography>

                  <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button component={ Link } to={`/anuncio/${ad._id}`}>Ver anúncio</Button>
                    <Button
                      className={classes.btnRed}
                      onClick={() => handleRemoveAd(ad._id)}
                      >Remover</Button>
                  </ButtonGroup>
                </div>
              </ExpansionPanelSummary>
            </ExpansionPanel>
          )}
        </div>

        <Typography variant="h6" className={classes.subtitle} gutterBottom>
          Adicionar anúncio na vitrine
        </Typography>

        <div className={classes.showCaseList}>
          {adAvailables.map((ad, index) => 
            <ExpansionPanel key={`adAvailables${index}`} expanded={false}>
              <ExpansionPanelSummary
                aria-controls="panel1bh-content"
              >
                <div className={classes.showCaseItem}>
                  <Typography className={classes.heading}>{ad.title}</Typography>

                  <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button component={ Link } to={`/anuncio/${ad._id}`}>Ver anúncio</Button>
                    <Button
                      className={classes.btnGreen}
                      onClick={() => handleAddAd(ad._id)}
                      >Adicionar</Button>
                  </ButtonGroup>
                </div>
              </ExpansionPanelSummary>
            </ExpansionPanel>
          )}
        </div>
      </Container>
    </>
  );
}
