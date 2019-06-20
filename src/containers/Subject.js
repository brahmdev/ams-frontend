import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {withStyles} from "@material-ui/core";
import { getAllStandardLookUp } from "../actions/standardActions";
import { getAllSubjects, createSubject, deleteSubject, updateSubject } from "../actions/subjectActions";
import connect from "react-redux/es/connect/connect";
import {getBranchId, getInstituteId} from "../utils/userInfo";
import classNames from 'classnames';

const styles = theme => ({

  content: {
    flexGrow: 1,
    padding: '75px 10px 0px 10px',
    height: '100vh',
    overflow: 'auto',
  },

});


class Subject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: 'Subject Code', field: 'code', filtering: false},
        {title: 'Subject Name', field: 'name', filtering: false},
        {title: 'Standard Code', field: 'standard.id', lookup: this.props.standard.standardLookUp}
      ]
    }
  }

  componentDidMount() {
    const branchId = getBranchId();
    this.props.getAllStandardLookUp(branchId);
    this.props.getAllSubjects(branchId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (Object.keys(nextProps.standard.standardLookUp).length > 1) {
      const columns = prevState.columns;
      columns[2].lookup = nextProps.standard.standardLookUp;
      return ({ columns }) // <- this is setState equivalent
    }
    return null;
  }

  render() {
    const {classes, subject} = this.props;
    return (
      <div className={classNames(classes.content, 'ams-table')}>
        <MaterialTable
          title="Subject"
          columns={this.state.columns}
          data={subject.subjectList}
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
                    this.props.createSubject(newData);
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
                    this.props.updateSubject(newData)
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.props.deleteSubject(oldData.id);
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
  const { subject, standard } = state;
  return { standard, subject };
}

const mapDispatchToProps = {
  getAllStandardLookUp,
  getAllSubjects,
  createSubject,
  deleteSubject,
  updateSubject
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Subject));
