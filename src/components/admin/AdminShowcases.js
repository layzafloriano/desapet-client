import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import PetsIcon from '@material-ui/icons/Pets';
import Box from '@material-ui/core/Box';
import AdminService from '../../providers/admin-service'

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 'bold',
    width: '100%',
    wordWrap: 'break-word',
    marginBottom: theme.spacing(2),
  },
}));

export default function AdminShowcases() {
  const classes = useStyles();
  const service = new AdminService();

  const [showCaseState, setShowCaseState] = useState([]);

  function getListShowcase() {
    service.getShowCases()
      .then(res => {
        setShowCaseState(res.active);
        console.log(res.active)
      })
      .catch(error => console.log(error));
  }

  useEffect(getListShowcase, []);
  
  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Typography variant="h5" className={classes.title} gutterBottom>
          Vitrines
        </Typography>
        <Grid container spacing={4} className={classes.cardGrid}>
          <Grid item xs={12}>
            <Box boxShadow={2}>
              <MenuList>
                {showCaseState.map(item => 
                  <MenuItem component={Link} to={`/admin/vitrine/${item._id}`}>
                    <ListItemIcon>
                      <PetsIcon />
                    </ListItemIcon>
                    <Typography variant="inherit">{item.name}</Typography>
                  </MenuItem>
                )}
              </MenuList>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
