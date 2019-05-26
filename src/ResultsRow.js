import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { addVotes, subtractVotes } from './dhondt-helpers';

export class ResultsRow extends React.Component {
  count = () => {
    const votes = this.props.row.slice(2).map(stupidString => {
      const saneString = stupidString.replace(' ', '');
      return parseInt(saneString, 10);
    });

    const seats = this.props.seats;

    console.time('calculation');
    addVotes(votes, seats);
    subtractVotes(votes, seats);
    console.timeEnd('calculation');
  };

  lastRow = row => (
    <TableCell key={999}>
      <Button size="small" color="primary" onClick={this.count}>
        Count
      </Button>
    </TableCell>
  );

  renderRow = (row, withButton) => [
    ...row.map((x, i) => <TableCell key={i}>{x}</TableCell>),
    withButton ? this.lastRow(row) : <TableCell key={999} />,
  ];

  render() {
    return (
      <TableRow>
        {this.renderRow(this.props.row, this.props.withButton)}
      </TableRow>
    );
  }
}
