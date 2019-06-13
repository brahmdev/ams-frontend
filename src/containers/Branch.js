import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {withStyles} from "@material-ui/core";
import { getAllBranches, createBranch, deleteBranch, updateBranch } from "../actions/branchActions";
import connect from "react-redux/es/connect/connect";
import { getInstituteId } from "../utils/userInfo";

const styles = theme => ({

  content: {
    flexGrow: 1,
    padding: '75px 10px 0px 10px',
    height: '100vh',
    overflow: 'auto',
  },

});


class Branch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: 'Code', field: 'code'},
        {title: 'Name', field: 'name'},
        {title: 'Address', field: 'address'},
      ]
    }
  }

  componentDidMount() {
    const instituteId = getInstituteId();
    this.props.getAllBranches(instituteId);
  }

  render() {
    const {classes, branch} = this.props;
    const instituteId = getInstituteId();

    return (
      <div className={classes.content}>
        <MaterialTable
          title="Branch"
          columns={this.state.columns}
          data={branch.branchList}
          options={{
            exportButton: true,
            actionsColumnIndex: -1,
            headerStyle: {
              backgroundColor: '#45CB85',
              color: '#FFF',
              fontSize: 16
            }
          }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const institute = {
                      "id" : instituteId
                    };
                    newData.institute = institute;
                    this.props.createBranch(newData);
                  }
                  resolve()
                }, 2000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const institute = {
                      "id" : instituteId
                    };
                    newData.institute = institute;
                    this.props.updateBranch(newData)
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.props.deleteBranch(oldData.id);
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
  return {
    branch: state.branch
  };
}

const mapDispatchToProps = {
  getAllBranches,
  createBranch,
  deleteBranch,
  updateBranch
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Branch));
