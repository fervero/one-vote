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

function PollDialogComponent({
  onClose,
  open,
  parties,
  percentageVotesByParty,
}) {
  const classes = useStyles();

  const [percentageVotes, setPercentageVotes] = useState(
    percentageVotesByParty.map(x => (x * 100).toFixed(2))
  );

  const [thresholds, setThresholds] = useState(
    parties.map(({ threshold }) => threshold)
  );

  const [valid, setValidity] = useState(true);

  useEffect(
    () =>
      setPercentageVotes(percentageVotesByParty.map(x => (x * 100).toFixed(2))),
    [percentageVotesByParty]
  );

  useEffect(() => setThresholds(parties.map(({ threshold }) => threshold)), [
    parties,
  ]);

  const handleClose = () => {
    onClose(null);
  };

  const handleInput = rowNumber => evt => {
    const { value } = evt.target;

    if (isNaN(parseFloat(value))) {
      return;
    }

    const newPercentageVotes = percentageVotes.map((oldValue, i) =>
      rowNumber === i ? value : oldValue
    );

    setValidity(sumArray(newPercentageVotes.map(parseFloat)) <= 100);

    setPercentageVotes(
      percentageVotes.map((oldValue, i) => (rowNumber === i ? value : oldValue))
    );
  };

  const handleCancel = () => {
    setPercentageVotes(percentageVotesByParty);
    setThresholds(parties.map(({ threshold }) => threshold));
    handleClose();
  };

  const handleSubmit = () => {
    onClose({
      percentageVotes: percentageVotes.map(x => parseFloat(x) / 100),
      thresholds,
    });
  };

  const handleThresholdChange = event => {
    const index = +event.target.value;
    const newValue = booleanToThreshold(event.target.checked);

    const updatedThresholds = thresholds.map((x, i) =>
      i === index ? newValue : x
    );

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
                    value={percentageVotes[i]}
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
