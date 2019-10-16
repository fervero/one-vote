import React, { useState, useEffect } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';

import {
  selectSeatsWonInAllDistricts,
  selectSumOfVotes,
  selectCountryWideParties,
} from '../state/selectors';

const mapStateToProps = state => {
  const { percentageVotesByParty } = selectSumOfVotes(state);

  return {
    parties: selectCountryWideParties(state),
    seatsWonInAllDistricts: selectSeatsWonInAllDistricts(state),
    percentageVotesByParty,
  };
};

const useStyles = makeStyles({
  padded: {
    padding: '1rem 2rem 1rem 1rem',
  },
  paddedMore: {
    padding: '2.5rem 6rem 2.5rem 2.5rem',
  },
  buttons: {
    padding: '1rem 1rem 1.25rem',
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'baseline',
  },
  switchLabel: {
    fontSize: '.8em',
  },
  header: {
    marginBottom: '1rem',
  },
  centered: {
    textAlign: 'center',
  },
});

function CoalitionDialogComponent({ onClose, open, parties }) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [checked, setChecked] = useState(parties.map(() => false));
  const [valid, setValidity] = useState(false);

  useEffect(() => setChecked(parties.map(() => false)), [parties]);

  const handleClose = () => {
    onClose(null);
  };

  const handleInput = rowNumber => evt => {
    const newValue = evt.target.checked;
    const newChecked = checked.map((oldValue, i) =>
      i === rowNumber ? newValue : oldValue
    );
    const checkedCount = newChecked.filter(val => val).length;

    setChecked(newChecked);
    setValidity(checkedCount > 1 && checkedCount < parties.length);
  };

  const handleCancel = () => {
    setChecked(parties.map(() => false));
    setValidity(false);
    handleClose();
  };

  const handleSubmit = () => {
    onClose(checked);
    setValidity(false);
    setChecked(parties.map(() => false));
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullScreen={fullScreen}
    >
      <DialogTitle id="simple-dialog-title">Wybierz partie</DialogTitle>
      <DialogContent>
        <div className={fullScreen ? classes.padded : classes.paddedMore}>
          <FormGroup>
            {parties.map((party, i) => (
              <FormControlLabel
                key={party.name}
                checked={checked[i]}
                onChange={handleInput(i)}
                control={<Checkbox color="primary" />}
                label={party.name}
              />
            ))}
          </FormGroup>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!valid}
        >
          Zastosuj
        </Button>
        <Button variant="contained" onClick={handleCancel}>
          Albo nie, rozmyśliłem się
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export const CoalitionDialog = connect(mapStateToProps)(
  CoalitionDialogComponent
);
