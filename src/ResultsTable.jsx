import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHead } from '@material-ui/core';
import { ResultsRow } from './ResultsRow.jsx';
import { ResultsTableHeader } from './ResultsTableHeader.jsx';
import { selectSeatsArray } from './selectors';

const mapStateToProps = state => ({
  resultsInAllDistricts: state.resultsInAllDistricts,
  seatsArray: selectSeatsArray(state),
});

const ResultsTableComponent = ({ resultsInAllDistricts, seatsArray }) => {
  return resultsInAllDistricts && resultsInAllDistricts.length ? (
    <Table size="small" stickyHeader>
      <TableHead>
        <ResultsTableHeader></ResultsTableHeader>
      </TableHead>
      <TableBody>
        {resultsInAllDistricts.map((x, i) => (
          <ResultsRow rowNumber={i} key={i} seats={seatsArray[i]} />
        ))}
      </TableBody>
    </Table>
  ) : (
    <span>no data</span>
  );
};

export const ResultsTable = connect(mapStateToProps)(ResultsTableComponent);
