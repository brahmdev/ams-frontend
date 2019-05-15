import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import { uuidv4 } from '../utils/'
const styles = theme => ({

  content: {
    flexGrow: 1,
    padding: '75px 10px 0px 10px',
    height: '100vh',
    overflow: 'auto',
  },

});


class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: 'Borad Id', field: 'id', editable: 'never'},
        {title: 'Board Name', field: 'name'},
      ],
      data: [
        {id: uuidv4(), name: 'SSC'},
      ]
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.content}>
        <MaterialTable
          title="Board"
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const randomId = uuidv4();
                    newData.id = randomId;
                    const data = this.state.data;
                    data.push(newData);
                    this.setState({data}, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.data;
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    this.setState({data}, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    let data = this.state.data;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    this.setState({data}, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
          }}
        />
      </div>
    );
  }
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Board);
