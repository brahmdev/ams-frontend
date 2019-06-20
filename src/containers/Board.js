import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {withStyles} from "@material-ui/core";
import { getAllBoards, createBoard, deleteBoard, updateBoard } from "../actions/boardActions";
import { getAllBranchesLookUp } from '../actions/branchActions';
import connect from "react-redux/es/connect/connect";
import { getBranchId, getInstituteId } from "../utils/userInfo";
import classNames from 'classnames';

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
        {title: 'Board Code', field: 'code'},
        {title: 'Board Name', field: 'name'},
        {title: 'Branch Code', field: 'branch.id', lookup: this.props.branch.branchLookup},
      ]
    }
  }

  componentDidMount() {
    const branchId = getBranchId();
    const instituteId = getInstituteId();
    this.props.getAllBranchesLookUp(instituteId);
    this.props.getAllBoards(branchId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (Object.keys(nextProps.branch.branchLookup).length > 1) {
      const columns = prevState.columns;
      columns[2].lookup = nextProps.branch.branchLookup;
      return ({ columns }) // <- this is setState equivalent
    }
    return null;
  }

  render() {
    const {classes, board} = this.props;
    const branchId = getBranchId();

    return (
      <div className={classNames(classes.content, 'ams-table')}>
        <MaterialTable
          title="Board"
          columns={this.state.columns}
          data={board.boardList}
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
                    const branch = {
                      "id" : newData['branch.id']
                    };

                    newData.branch = branch;
                    this.props.createBoard(newData);
                  }
                  resolve()
                }, 2000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const branch = {
                      "id" : newData['branch.id'] ? newData['branch.id'] : oldData.branch.id
                    };

                    newData.branch = branch;
                    this.props.updateBoard(newData)
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.props.deleteBoard(oldData.id);
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
  const { branch, board} = state;
  return { branch, board };
}

const mapDispatchToProps = {
  getAllBranchesLookUp,
  getAllBoards,
  createBoard,
  deleteBoard,
  updateBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Board));
