import React, { useState, useEffect } from 'react';
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
import Switch from '@material-ui/core/Switch';

import { connect } from 'react-redux';

import {
  selectSeatsWonInAllDistricts,
  selectSumOfVotes,
  selectCountryWideParties,
} from '../state/selectors';
import { sumArray } from '../utilities/arrayHelpers';

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

const booleanToThreshold = value => (value ? 8 : 5);

const useStyles = makeStyles({
  padded: {
    padding: '2rem 4rem 2rem 2rem',
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
});

function PollDialogComponent(props) {
  const { onClose, open, parties, percentageVotesByParty } = props;

  const [percentageVotes, setPercentageVotes] = useState(
    percentageVotesByParty
  );

  const [thresholds, setThresholds] = useState(
    parties.map(({ threshold }) => threshold)
  );

  useEffect(() => setPercentageVotes(percentageVotesByParty), [
    percentageVotesByParty,
  ]);

  useEffect(() => setThresholds(parties.map(({ threshold }) => threshold)), [
    parties,
  ]);

  const [valid, setValidity] = useState(true);

  const classes = useStyles();

  const handleClose = () => {
    onClose(null);
  };

  const handleInput = rowNumber => evt => {
    const newValue = Math.max(+evt.target.value / 100, 0);

    const newPercentageVotes = percentageVotes.map((value, i) =>
      rowNumber === i ? newValue : value
    );

    setValidity(sumArray(newPercentageVotes) <= 1);

    setPercentageVotes(
      percentageVotes.map((value, i) => (rowNumber === i ? newValue : value))
    );
  };

  const handleCancel = () => {
    setPercentageVotes(percentageVotesByParty);
    setThresholds(parties.map(({ threshold }) => threshold));
    handleClose();
  };

  const handleSubmit = () => {
    onClose({ percentageVotes, thresholds });
  };

  const handleThresholdChange = event => {
    const updatedThresholds = [...thresholds];
    const { value, checked } = event.target;
    updatedThresholds[+value] = booleanToThreshold(checked);

    setThresholds(updatedThresholds);
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
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={5}></Grid>
              <Grid item xs={5}></Grid>
              <Grid item xs={2}>
                Próg
              </Grid>
            </Grid>
          </ListItem>
          {parties.map((party, i) => (
            <ListItem key={party.name}>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  {party.name}:
                </Grid>
                <Grid item xs={5}>
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
                <Grid item xs={2}>
                  <div className={classes.switchContainer}>
                    <span className={classes.switchLabel}>5%</span>
                    <Switch
                      size="small"
                      color="primary"
                      checked={thresholds[i] === 8}
                      onChange={handleThresholdChange}
                      value={i}
                    />
                    <span className={classes.switchLabel}>8%</span>
                  </div>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          disabled={!valid}
          onClick={handleSubmit}
        >
          Zastosuj
        </Button>
        <Button variant="contained" onClick={handleCancel}>
          Albo nie, rozmyśliłem się
        </Button>
      </div>
    </Dialog>
  );
}

export const PollDialog = connect(mapStateToProps)(PollDialogComponent);
