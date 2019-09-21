import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHead } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import { ResultsTableHeader } from './ResultsTableHeader.jsx';
import { ResultsRow } from './ResultsRow.jsx';

const hasResults = resultsInAllDistricts =>
  resultsInAllDistricts &&
  resultsInAllDistricts.length &&
  resultsInAllDistricts[0] &&
  resultsInAllDistricts[0].length;

const mapStateToProps = state => ({
  resultsInAllDistricts: state.resultsInAllDistricts,
});

const ResultsTableComponent = ({ resultsInAllDistricts }) => {
  if (!hasResults(resultsInAllDistricts)) {
    return <span></span>;
  }

  return (
    <Table size="small" stickyHeader>
      <TableHead>
        <ResultsTableHeader></ResultsTableHeader>
      </TableHead>
      <TableBody>
        {resultsInAllDistricts.map((x, i) => (
          <TableRow key={i}>
            <ResultsRow rowNumber={i} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const ResultsTable = connect(mapStateToProps)(ResultsTableComponent);
