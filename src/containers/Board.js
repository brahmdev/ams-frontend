import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {withStyles} from "@material-ui/core";
import { getAllBoards, createBoard, deleteBoard, upadateBoard } from "../actions/boardActions";
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


class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: 'Board Code', field: 'code'},
        {title: 'Board Name', field: 'name'},
      ]
    }
  }

  componentDidMount() {
    const instituteId = getInstituteId();
    this.props.getAllBoards(instituteId);
  }

  render() {
    const {classes, board} = this.props;
    const instituteId = getInstituteId();

    return (
      <div className={classes.content}>
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
                    const institute = {
                      "id" : instituteId
                    };
                    newData.institute = institute;
                    this.props.createBoard(newData);
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
                    this.props.upadateBoard(newData)
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    this.props.deleteBoard(instituteId, oldData.id)
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

function mapStateToProps(state) {
  return {
    board: state.board
  };
}

const mapDispatchToProps = {
  getAllBoards,
  createBoard,
  deleteBoard,
  upadateBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Board));
