import React, {Component} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export default class AddSchedule extends Component {

  render() {
    const { open, onClose} = this.props;

    return (
      <Dialog open={open} aria-labelledby="simple-dialog-title">
        <DialogTitle disableTypography style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2>Dialog...</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <span>Dialog Content</span>
        </DialogContent>
      </Dialog>
    );
  }
}
