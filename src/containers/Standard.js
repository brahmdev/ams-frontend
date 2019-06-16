import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {withStyles} from "@material-ui/core";
import { getAllStandards, createStandard, deleteStandard, updateStandard } from "../actions/standardActions";
import { getAllBoardsLookUp } from "../actions/boardActions";
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
        {title: 'Standard Code', field: 'code', filtering: false},
        {title: 'Standard Name', field: 'name', filtering: false},
        {title: 'Fees', field: 'fees', type: 'numeric', filtering: false},
        {title: 'Board Code', field: 'board.id', lookup: this.props.board.boardLookup},
        {title: 'Language', field: 'language.id', lookup: { 1: 'Hindi', 2: 'English', 3: 'Marathi' },
        },

      ]
    }
  }

  componentDidMount() {
    const branchId = getBranchId();
    this.props.getAllBoardsLookUp(branchId);
    this.props.getAllStandards(branchId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (Object.keys(nextProps.board.boardLookup).length > 1) {
      const columns = prevState.columns;
      columns[3].lookup = nextProps.board.boardLookup;
      return ({ columns }) // <- this is setState equivalent
    }
    return null;
  }

  render() {
    const {classes, standard} = this.props;

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
            },
            filtering: true
          }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const board = {
                      "id" : newData['board.id']
                    };

                    const language = {
                      "id" : newData['language.id']
                    };

                    newData.board = board;
                    newData.language = language;

                    delete newData['board.id'];
                    delete newData['language.id'];
                    this.props.createStandard(newData);
                  }
                  resolve()
                }, 2000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const board = {
                      "id" : newData['board.id'] ? newData['board.id'] : oldData.board.id
                    };

                    const language = {
                      "id" : newData['language.id'] ? newData['language.id'] : oldData.language.id
                    };

                    newData.board = board;
                    newData.language = language;

                    delete newData['board.id'];
                    delete newData['language.id'];

                    this.props.updateStandard(newData)
                  }
                  resolve()
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.props.deleteStandard(oldData.id);
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
