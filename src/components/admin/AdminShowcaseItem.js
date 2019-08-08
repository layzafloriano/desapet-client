import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AdminService from '../../providers/admin-service'

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
  const { id } = props.match.params;
  const service = new AdminService();

  const [showCaseStateAvailable, setShowCaseStateAvailable] = useState([]);
  const [showCaseStateOnDisplay, setShowCaseStateOnDisplay] = useState([]);


  function getNotOnDisplay() {
    service.showCaseNotOnDisplay(id)
      .then(res => {
        setShowCaseStateAvailable(res.ad);
        console.log(res.ad)
      })
      .catch(error => console.log(error));
  }

  function getOnDisplay() {
    service.showCaseOnDisplay(id)
      .then(res => {
        setShowCaseStateOnDisplay(res.ad);
      })
      .catch(error => console.log(error));
  }

  function handleAddAd(ad) {
    console.log('handleAddAd', ad);
    service.addToShowCase(ad)
      .then(res => {
        // setShowCaseStateOnDisplay(res.ad);
        console.log(res.ad)
        getNotOnDisplay();
        getOnDisplay();
      })
      .catch(error => console.log(error));
  }

  function handleRemoveAd(id) {
    console.log('handleRemoveAd', id);
  }

  useEffect(getNotOnDisplay, []);
  useEffect(getOnDisplay, []);

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
          {showCaseStateOnDisplay.map((ad, index) => 
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
          {showCaseStateAvailable.map((ad, index) => 
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
