
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

  const showCases = [
    {
      _id: 'testId01',
      name: 'Vitrine 1'
    },
    {
      _id: 'testId02',
      name: 'Vitrine 2'
    },
    {
      _id: 'testId03',
      name: 'Vitrine 3'
    },
  ];

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
                {showCases.map(item => 
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
