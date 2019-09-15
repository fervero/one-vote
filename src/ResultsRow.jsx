import React, { Fragment } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { TopResultsRow } from './TopResultsRow.jsx';
import { MiddleResultsRow } from './MiddleResultsRow.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state, { rowNumber }) => ({
  resultsInDistrict: state.resultsInAllDistricts[rowNumber],
});

function ResultsRowComponent({ rowNumber }) {
  return (
    <Fragment>
      <TableRow>
        <TopResultsRow rowNumber={rowNumber}></TopResultsRow>
      </TableRow>
      <TableRow>
        <MiddleResultsRow rowNumber={rowNumber}></MiddleResultsRow>
      </TableRow>
    </Fragment>
  );
}

export const ResultsRow = connect(mapStateToProps)(ResultsRowComponent);
