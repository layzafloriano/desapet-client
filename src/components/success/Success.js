import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  modalContent: {
  },
}));

export default function Success(props) {
  const classes = useStyles();

  return (
    <Dialog
      open={props.display}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
      <DialogContent className={classes.modalContent}>
        <DialogContentText id="alert-dialog-slide-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.buttonOne && 
          <Button onClick={props.buttonOne.callback} color="primary">
            {props.buttonOne.text}
          </Button>
        }
        {props.buttonTwo && 
          <Button onClick={props.buttonTwo.callback} color="primary">
            {props.buttonTwo.text}
          </Button>
        }
      </DialogActions>
    </Dialog>
  );
}
