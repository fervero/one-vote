import React, { Fragment, useState, useEffect } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { minVotesToChangeSomething } from './dHondtHelpers';
import { TopResultsRow } from './TopResultsRow.jsx';
import { MiddleResultsRow } from './MiddleResultsRow.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state, { rowNumber }) => ({
  resultsInDistrict: state.resultsInAllDistricts[rowNumber],
});

function ResultsRowComponent({ seats, resultsInDistrict, rowNumber }) {
  useEffect(() => {
    updateMinVotes(minVotesToChangeSomething([...resultsInDistrict], seats));
  }, [resultsInDistrict, seats]);

  const [minVotes, updateMinVotes] = useState(
    minVotesToChangeSomething(resultsInDistrict, seats)
  );

  return (
    <Fragment>
      <TableRow>
        <TopResultsRow
          rowNumber={rowNumber}
          minVotesToChangeSomething={minVotes}
        ></TopResultsRow>
      </TableRow>
      <TableRow>
        <MiddleResultsRow rowNumber={rowNumber}></MiddleResultsRow>
      </TableRow>
    </Fragment>
  );
}

export const ResultsRow = connect(mapStateToProps)(ResultsRowComponent);
