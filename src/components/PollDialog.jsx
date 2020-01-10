import React, { useState, useEffect } from 'react';
import { NumberInput } from './NumberInput';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Switch from '@material-ui/core/Switch';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';

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
  summary: {
    fontSize: '80%',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  sumOfVotes: {
    textAlign: 'right',
    paddingRight: '1rem !important',
  },
  error: {
    color: '#f44336',
  },
});

const to2Fixed = x => (x * 100).toFixed(2);

function PollDialogComponent({
  onClose,
  open,
  parties,
  percentageVotesByParty,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [percentageVotes, setPercentageVotes] = useState(
    percentageVotesByParty.map(to2Fixed)
  );

  const [inputsValidity, setInputsValidity] = useState(
    percentageVotesByParty.map(() => true)
  );

  const [thresholds, setThresholds] = useState(
    parties.map(({ threshold }) => threshold)
  );

  const [formValidity, setFormValidity] = useState(true);

  useEffect(() => setPercentageVotes(percentageVotesByParty.map(to2Fixed)), [
    percentageVotesByParty,
  ]);

  useEffect(() => setThresholds(parties.map(({ threshold }) => threshold)), [
    parties,
  ]);

  const handleClose = () => {
    onClose(null);
  };

  const handleInput = rowNumber => ({ value, validity }) => {
    const newPercentageVotes = percentageVotes.map((oldValue, i) =>
      rowNumber === i ? value : oldValue
    );

    const newInputsValidity = inputsValidity.map((oldValue, i) =>
      rowNumber === i ? validity : oldValue
    );

    setInputsValidity(newInputsValidity);

    setFormValidity(
      sumArray(newPercentageVotes.map(parseFloat)) <= 100 &&
        newInputsValidity.every(valid => valid)
    );

    setPercentageVotes(newPercentageVotes);
  };

  const handleCancel = () => {
    setPercentageVotes(percentageVotesByParty.map(to2Fixed));
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
      fullScreen={fullScreen}
    >
      <DialogTitle id="simple-dialog-title">Sondaż</DialogTitle>
      <DialogContent>
        <div className={fullScreen ? classes.padded : classes.paddedMore}>
          <Grid
            container
            spacing={fullScreen ? 1 : 3}
            className={classes.header}
          >
            <Grid item xs={5}></Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={2} className={classes.centered}>
              Próg
            </Grid>
          </Grid>
          {parties.map((party, i) => (
            <div key={party.name}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  {party.name}:
                </Grid>
                <Grid item xs={5}>
                  <NumberInput
                    min={0}
                    max={100}
                    value={percentageVotes[i]}
                    onChange={handleInput(i)}
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
            </div>
          ))}
          <hr />
          <div className={classes.summary}>
            <Grid
              container
              spacing={2}
              className={
                sumArray(percentageVotes.map(parseFloat)) > 100
                  ? classes.error
                  : ''
              }
            >
              <Grid item xs={5}>
                łącznie:
              </Grid>
              <Grid item xs={5} className={classes.sumOfVotes}>
                {sumArray(percentageVotes.map(parseFloat)).toFixed(2)}
              </Grid>
            </Grid>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!formValidity}
          onClick={handleSubmit}
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

export const PollDialog = connect(mapStateToProps)(PollDialogComponent);
