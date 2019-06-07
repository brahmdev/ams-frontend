import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {withStyles} from "@material-ui/core";
import { getAllStandards, createStandard, deleteStandard, updateStandard } from "../actions/standardActions";
import { getAllBoardsLookUp } from "../actions/boardActions";
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


class Standard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: 'Standard Code', field: 'code'},
        {title: 'Standard Name', field: 'name'},
        {title: 'Fees', field: 'fees'},
        {title: 'Board Code', field: 'board.id', lookup: this.props.board.boardLookup},
        {title: 'Language', field: 'language.code'},

      ]
    }
  }

  componentDidMount() {
    const instituteId = getInstituteId();
    this.props.getAllBoardsLookUp(instituteId);
    this.props.getAllStandards(instituteId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (Object.keys(nextProps.board.boardLookup).length > 1) {
      const columns = prevState.columns;
      columns[3].lookup = nextProps.board.boardLookup;
      return ({ columns }) // <- this is setState equivalent
    }
  }

  render() {
    const {classes, standard} = this.props;
    const instituteId = getInstituteId();
    console.log('lookup ', this.props.board);

    console.log('column ', this.state.columns[3])
    return (
      <div className={classes.content}>
        <MaterialTable
          title="Standard"
          columns={this.state.columns}
          data={standard.standardList}
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
  const { board, standard } = state;
  return { standard, board };
}

const mapDispatchToProps = {
  getAllBoardsLookUp,
  getAllStandards,
  createStandard,
  deleteStandard,
  updateStandard
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Standard));
