import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
  iconButton: {
    padding: 10,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    width: '80%'
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginLeft: '100px',
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const [searchState, setSearchState] = useState('');

  const handleChange = (event) => {
    setSearchState(event.target.value);
  };

  const searchClick = () => {
    // return(<Search word={searchState} />)
    window.location.href=`/buscar/${searchState}`;
    // return (<Redirect to='/buscar/123'/>)
  }
  
  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Buscar"
          onChange={(e) => handleChange(e)}
          inputProps={{ 'aria-label': 'Buscar' }}
        />
        <IconButton className={classes.iconButton} aria-label="search" onClick={()=>searchClick()}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}