import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import * as dhondt from 'dhondt';

export class ResultsRow extends React.Component {
  foo = () => {
    const votes = this.props.row.slice(2).map(stupidString => {
      const saneString = stupidString.replace(' ', '');
      return parseInt(saneString, 10);
    });

    const seats = this.props.seats;
    console.log(seats);
    console.log(dhondt.compute(votes, seats));
  };

  lastRow = row => (
    <TableCell>
      <Button size="small" color="primary" onClick={this.foo}>
        Count
      </Button>
    </TableCell>
  );

  renderRow = (row, withButton) => [
    ...row.map(x => <TableCell>{x}</TableCell>),
    withButton ? this.lastRow(row) : <TableCell />,
  ];

  render() {
    return (
      <TableRow>
        {this.renderRow(this.props.row, this.props.withButton)}
      </TableRow>
    );
  }
}

// export const ResultsRow = ({ row, withButton }) => (
//   <TableRow>{renderRow(row, withButton)}</TableRow>
// );
