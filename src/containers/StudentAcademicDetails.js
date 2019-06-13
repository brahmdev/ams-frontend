import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";
import StudentAcademicDetailsForm from "../components/StudentAcademicDetailsForm";
import { getAllStandardLookUpForStudent, getAllBatchOfStandardLookUp } from "../actions/studentActions";
import {getInstituteId} from "../utils/userInfo";
const styles = theme => ({

  content: {
    flexGrow: 1,
    padding: '75px 10px 0px 10px',
    height: '100vh',
    overflow: 'auto',
  },

});


class StudentAcademicDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    const instituteId = getInstituteId();
    //this.props.getAllStandardLookUpForStudent(instituteId);
  }

  shouldComponentUpdate(nextProps, state){
    console.log('in shouldComponentUPdate')
    return true;
  }

  static getDerivedStateFromProps(props, state) {
    console.log('in derived props')
    return null;
  }

  handleStandardChange(standardId) {
    this.props.getAllBatchOfStandardLookUp(standardId);
  }

  render() {
    const {classes, onChange, errors, values, student} = this.props;
    console.log('values in container ', values)

    values.standardLookUp = student.standardLookUp;
    values.batchLookUp = student.batchLookUp;
    console.log('values in container ', values)
    return (
      <div className={classes.content}>
        <StudentAcademicDetailsForm onChange={onChange}
                                    errors={errors}
                                    values={values}
                                    onStandardChange={(standardId) => this.handleStandardChange(standardId)}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { student } = state;
  return { student };
}

const mapDispatchToProps = {
  getAllStandardLookUpForStudent,
  getAllBatchOfStandardLookUp
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentAcademicDetails));
