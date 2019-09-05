import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { ResultsRow } from './ResultsRow.jsx';
import { seatsArray } from './2011-kandydaci-sejm';
import { ResultsTableHeader } from './ResultsTableHeader.jsx';

const renderTable = rows =>
  rows.map((x, i) => (
    <ResultsRow
      row={x.slice(2)}
      districtName={x[1]}
      districtNumber={x[0]}
      key={x[1]}
      seats={seatsArray[i]}
    />
  ));

const wrapTable = rows => (
  <Table size="small">
    <TableHead>
      <ResultsTableHeader row={rows[0]}></ResultsTableHeader>
    </TableHead>
    <TableBody>{renderTable(rows.splice(1))}</TableBody>
  </Table>
);

export function ResultsTable(props) {
  return props && props.results && props.results.length ? (
    wrapTable(props.results)
  ) : (
    <span>no data</span>
  );
}
