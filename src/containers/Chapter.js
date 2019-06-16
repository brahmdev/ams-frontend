import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {withStyles} from "@material-ui/core";
import { getAllChapters, createChapter, updateChapter, deleteChapter } from "../actions/chapterActions";
import { getAllSubjectLookUp } from "../actions/subjectActions";
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


class Standard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: 'Chapter Code', field: 'code', filtering: false},
        {title: 'Chapter Number', field: 'number', filtering: false, type: 'numeric'},
        {title: 'Chapter Name', field: 'name', filtering: false},
        {title: 'Subject Code', field: 'subject.id', lookup: this.props.subject.subjectLookUp}
      ]
    }
  }

  componentDidMount() {
    const branchId = getBranchId();
    this.props.getAllSubjectLookUp(branchId);
    this.props.getAllChapters(branchId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (Object.keys(nextProps.subject.subjectLookUp).length > 1) {
      const columns = prevState.columns;
      columns[3].lookup = nextProps.subject.subjectLookUp;
      return ({ columns }) // <- this is setState equivalent
    }
    return null;
  }

  render() {
    const {classes, chapter} = this.props;
    return (
      <div className={classes.content}>
        <MaterialTable
          title="Chapter"
          columns={this.state.columns}
          data={chapter.chapterList}
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
                    const subject = {
                      "id" : newData['subject.id']
                    };

                    newData.subject = subject;
                    delete newData['subject.id'];
                    this.props.createChapter(newData);
                  }
                  resolve()
                }, 2000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const subject = {
                      "id" : newData['subject.id'] ? newData['subject.id'] : oldData.subject.id
                    };

                    newData.subject = subject;
                    delete newData['standard.id'];
                    this.props.updateChapter(newData)
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.props.deleteChapter(oldData.id);
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
  const { subject, chapter } = state;
  return { chapter, subject };
}

const mapDispatchToProps = {
  getAllSubjectLookUp,
  getAllChapters,
  createChapter,
  updateChapter,
  deleteChapter
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Standard));
