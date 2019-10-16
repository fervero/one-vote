import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { CoalitionDialog } from './CoalitionDialog';
import { connect } from 'react-redux';
import { createCoalition } from '../state/actionCreators';

function CoalitionButtonComponent({ dispatch }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);

    if (value) {
      dispatch(createCoalition(value));
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
        Ulep koalicję
      </Button>
      <CoalitionDialog open={open} onClose={handleClose} />
    </Fragment>
  );
}

export const CoalitionButton = connect(() => ({}))(CoalitionButtonComponent);
