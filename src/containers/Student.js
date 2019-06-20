import React, {Component} from 'react';
import {withRouter} from 'react-router'
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import {withStyles} from "@material-ui/core";
import {getAllStudents} from "../actions/studentActions";
import connect from "react-redux/es/connect/connect";
import {getBranchId} from "../utils/userInfo";
import classNames from 'classnames';

const styles = theme => ({

  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    flexGrow: 1,
    padding: '75px 10px 0px 10px',
    height: '100vh',
    overflow: 'auto',
  },

});

class Student extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: 'Username', field: 'username'},
        {title: 'First Name', field: 'firstname'},
        {title: 'Last Name', field: 'lastname'},
        {title: 'Mobile', field: 'mobile'},
        {title: 'E-mail', field: 'email'},
      ],
      value: 0,
    }
  }

  componentDidMount() {
    const branchId = getBranchId();
    this.props.getAllStudents(branchId);
  }

  showStudentDetails(rowData) {
    console.log('in showDetails');
    return (
      this.props.history.push({
        pathname: '/studentDetails',
        state: {userDetails: rowData}
      })
    );
  }


  render() {
    const {classes, student} = this.props;
    const {value} = this.state;

    return (
      <div className={classNames(classes.content, 'ams-table')}>
        <MaterialTable
          title="Students"
          columns={this.state.columns}
          data={student.studentList}
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
          onRowClick={(event, rowData, togglePanel) => {
            console.log(rowData)
            this.showStudentDetails(rowData);
          }}
        />

      </div>
    );
  }
}

function mapStateToProps(state) {
  const {student} = state;
  return {student};
}

const mapDispatchToProps = {
  getAllStudents
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Student)));
