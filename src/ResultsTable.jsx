import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHead } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import { ResultsTableHeader } from './ResultsTableHeader.jsx';
import { ResultsRow } from './ResultsRow.jsx';

const mapStateToProps = state => ({
  resultsInAllDistricts: state.resultsInAllDistricts,
});

const ResultsTableComponent = ({ resultsInAllDistricts }) => {
  return resultsInAllDistricts && resultsInAllDistricts.length ? (
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
  ) : (
    <span>no data</span>
  );
};

export const ResultsTable = connect(mapStateToProps)(ResultsTableComponent);
