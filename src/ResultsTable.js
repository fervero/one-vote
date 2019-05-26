import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { ResultsRow } from './ResultsRow';
import { seatsArray } from './2011-kandydaci-sejm';

const renderTable = rows =>
  rows.map((x, i) => (
    <ResultsRow row={x} key={x[1]} seats={seatsArray[i]} withButton={true} />
  ));

const renderHead = row => {
  return <ResultsRow row={row} withButton={false} />;
};

const wrapTable = rows => (
  <Table size="small">
    <TableHead>{renderHead(rows[0])}</TableHead>
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
