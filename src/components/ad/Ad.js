import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
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
}));

export default function Ad() {
  const classes = useStyles();
  return (
    <>
    <CssBaseline />
    <div>
      <picture>
        <img src="https://res.cloudinary.com/layzafloriano/image/upload/v1564496790/project-management-gallery/coleira.jpg.jpg" alt="Imagem do produto"></img>
      </picture>
      <div>

      </div>
    </div>
    
    </>
  )

}