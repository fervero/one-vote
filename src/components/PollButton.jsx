import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { PollDialog } from './PollDialog';
import { connect } from 'react-redux';
import { setPercentageVotes } from '../state/actionCreators';

function PollButtonComponent({ dispatch }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);

    if (value) {
      dispatch(setPercentageVotes(value));
    }
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        size="small"
        onClick={handleClickOpen}
        style={{ marginLeft: '1rem' }}
      >
        Wstukaj sondaż
      </Button>
      <PollDialog open={open} onClose={handleClose} />
    </Fragment>
  );
}

export const PollButton = connect(() => ({}))(PollButtonComponent);
