import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {withStyles} from "@material-ui/core";
import { getAllStandardLookUp } from "../actions/standardActions";
import { getAllBatches, createBatch, updateBatch, deleteBatch } from "../actions/batchActions";
import connect from "react-redux/es/connect/connect";
import {getBranchId, getInstituteId} from "../utils/userInfo";

const styles = theme => ({

  content: {
    flexGrow: 1,
    padding: '75px 10px 0px 10px',
    height: '100vh',
    overflow: 'auto',
  },

});


class Batch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: 'Code', field: 'code', filtering: false},
        {title: 'Name', field: 'name', filtering: false},
        {title: 'Year', field: 'year', filtering: false, type: 'numeric'},
        {title: 'Capacity', field: 'capacity', filtering: false, type: 'numeric'},
        {title: 'Standard Code', field: 'standard.id', lookup: this.props.standard.standardLookUp},
        {title: 'Created', field: 'created', filtering: false, editable: 'never'},
        {title: 'Updated', field: 'updated', filtering: false, editable: 'never'},
      ]
    }
  }

  componentDidMount() {
    const branchId = getBranchId();
    this.props.getAllStandardLookUp(branchId);
    this.props.getAllBatches(branchId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (Object.keys(nextProps.standard.standardLookUp).length > 1) {
      const columns = prevState.columns;
      columns[4].lookup = nextProps.standard.standardLookUp;
      return ({ columns }) // <- this is setState equivalent
    }
    return null;
  }

  render() {
    const {classes, batch} = this.props;
    return (
      <div className={classes.content}>
        <MaterialTable
          title="Batch"
          columns={this.state.columns}
          data={batch.batchList}
          options={{
            exportButton: true,
            actionsColumnIndex: -1,
            headerStyle: {
              backgroundColor: '#45CB85',
              color: '#FFF',
              fontSize: 16
            },
            filtering: true
          }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const standard = {
                      "id" : newData['standard.id']
                    };

                    newData.standard = standard;
                    delete newData['standard.id'];
                    this.props.createBatch(newData);
                  }
                  resolve()
                }, 2000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const standard = {
                      "id" : newData['standard.id'] ? newData['standard.id'] : oldData.standard.id
                    };

                    newData.standard = standard;
                    delete newData['standard.id'];
                    this.props.updateBatch(newData)
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.props.deleteBatch(oldData.id);
                  resolve()
                }, 1000)
              }),
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { batch, standard } = state;
  return { standard, batch };
}

const mapDispatchToProps = {
  getAllStandardLookUp,
  getAllBatches,
  createBatch,
  updateBatch,
  deleteBatch
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Batch));
