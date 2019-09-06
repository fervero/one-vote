import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { ResultsRow } from './ResultsRow.jsx';
import { seatsArray } from './2011-kandydaci-sejm';
import { ResultsTableHeader } from './ResultsTableHeader.jsx';

export function ResultsTable(props) {
  return props && props.results && props.results.length ? (
    <Table size="small">
      <TableHead>
        <ResultsTableHeader row={props.results[0]}></ResultsTableHeader>
      </TableHead>
      <TableBody>
        {props.results.splice(1).map((x, i) => (
          <ResultsRow
            row={x.slice(2)}
            districtName={x[1]}
            districtNumber={x[0]}
            key={x[1]}
            seats={seatsArray[i]}
          />
        ))}
      </TableBody>
    </Table>
  ) : (
    <span>no data</span>
  );
}
