import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import { connect } from 'react-redux';

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

const toFixedUnless0 = number => {
  const numberString = number.toFixed(2);
  return numberString.replace(/0*$/g, '').replace(/\.$/, '');
};

const useStyles = makeStyles({
  padded: {
    padding: '2rem 4rem 2rem 2rem',
  },
  buttons: {
    padding: '1rem 1rem 1.25rem',
  },
});

function PollDialogComponent(props) {
  const { onClose, open, parties, percentageVotesByParty } = props;

  const [percentageVotes, assignPercentageVotes] = useState(
    percentageVotesByParty
  );

  const classes = useStyles();

  const handleClose = () => {
    onClose(null);
  };

  const handleInput = rowNumber => evt => {
    const newValue = Math.max(+evt.target.value / 100, 0);

    assignPercentageVotes(
      percentageVotes.map((value, i) => (rowNumber === i ? newValue : value))
    );
  };

  const handleSubmit = () => {
    onClose(percentageVotes);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Paper className={classes.padded}>
        <DialogTitle id="simple-dialog-title">Sondaż</DialogTitle>
        <List>
          {parties.map((party, i) => (
            <ListItem key={party.name}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  {party.name}:
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={toFixedUnless0(percentageVotes[i] * 100)}
                    min="0"
                    type="number"
                    step="0.01"
                    onChange={handleInput(i)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
      <div className={classes.buttons}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Zastosuj
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Albo nie, rozmyśliłem się
        </Button>
      </div>
    </Dialog>
  );
}

export const PollDialog = connect(mapStateToProps)(PollDialogComponent);
