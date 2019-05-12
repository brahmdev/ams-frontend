import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import CardActions from "@material-ui/core/CardActions/CardActions";

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

let id = 0;

function createData(firstname, lastname, standard, batch, fees) {
  id += 1;
  return {id, firstname, lastname, standard, batch, fees};
}

const data = [
  createData('MS', 'DHONI', 'XI', 'Regular', 5949),
  createData('VIRAT', 'KOHLI', 'XII', 'Regular', 2383),
  createData('ROHIT', 'SHRMA', 'XII', 'Regular', 99),
  createData('CHRIS', 'GAYLE', 'XI', 'Summer Vacation', 9999),
  createData('AB', 'DEVILLIERS', 'XI', 'Summer Vacation', 3983),
];

function SimpleTable(props) {
  const {classes} = props;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Fees Defaulters
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>FirstName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Standard</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell align="right">Pending Fees (INR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.firstname}
                </TableCell>
                <TableCell>{n.lastname}</TableCell>
                <TableCell>{n.standard}</TableCell>
                <TableCell>{n.batch}</TableCell>
                <TableCell align="right">{n.fees}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CardActions>
          <Button size="large" color="primary">
            More Details
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
