import React, {Component} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";
import StudentPersonalDetailsForm from "../components/StudentPersonalDetailsForm";
import ParentDetailsForm from "../components/ParentDetailsForm";
import StudentAcademicDetailsForm from "../components/StudentAcademicDetailsForm";
import {getInstituteId} from "../utils/userInfo";
import { getAllStandardLookUpForStudent, getAllBatchOfStandardLookUp, saveOrUpdateUser } from "../actions/studentActions";
import { getStandard } from "../actions/standardActions";
import { getBranchId } from "../utils/userInfo";

const styles = theme => ({

  root: {
    width: '90%',
    marginTop: 60,
    marginLeft: 50
  },
  button: {
    marginRight: 8,
    marginTop: 20,
    marginBottom: 20
  },
  instructions: {
    marginTop: 8,
    marginBottom: 8,
  },
});

class StudentWizard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: this.getSteps(),
      studentPersonalDetailsErrors: [],
      parentDetailsErrors: [],
      studentAcademicDetailsErrors: []
    }
  }

  isStudentPersonalDetailsFormInValid = false;
  isParentDetailsFormInValid = false;
  isStudentAcademicDetailsFormInValid = false;

  studentPersonalDetailsRequiredFields = [
    'firstname',
    'lastname',
    'username',
    'password',
    'mobile',
    'gender',
    'dob',
    'email',
    'address',
    'city',
    'zip',
  ];

  studentPersonalDetailsFieldsValue =  {
    dob: new Date(),
    state: 'Maharashtra',
    country: 'India'
  };

  parentDetailsRequiredFields = [
    'firstname',
    'lastname',
    'username',
    'password',
    'mobile',
    'gender',
    'email'
  ];

  parentDetailsFieldsValue =  {};

  studentAcademicDetailsRequiredFields = [
    'rollNo',
    'admissionDate',
    'standard',
    'batch'
  ];

  studentAcademicDetailsFieldsValue = {
    admissionDate: new Date(),
    hasPaidFees: false
  };

  componentDidMount() {
    const branchId = getBranchId();
    this.props.getAllStandardLookUpForStudent(branchId);
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
      studentPersonalDetailsErrors: [],
      parentDetailsErrors: [],
      studentAcademicDetailsErrors: []
    });

    this.studentPersonalDetailsFieldsValue = {
      dob: new Date(),
      state: 'Maharashtra',
      country: 'India'
    };
    this.parentDetailsFieldsValue = {};
    this.studentAcademicDetailsFieldsValue = {
      admissionDate: new Date(),
      hasPaidFees: false
    };

    this.isStudentPersonalDetailsFormInValid = false;
    this.isParentDetailsFormInValid = false;
    this.isStudentAcademicDetailsFormInValid = false;
  };

  makeUserName = (firstname, lastname, length) => {
    var name = firstname + lastname;
    var username = '';
    var characters = name;
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      username += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return username;
  };

  isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  onChangeStudentPersonalDetailsFormField = (data) => {
    const {name, value} = data;
    const {studentPersonalDetailsErrors} = this.state;
    const { firstname, lastname } = this.studentPersonalDetailsFieldsValue;
    this.studentPersonalDetailsFieldsValue[name] = value;
    if ((value && value.length > 0) || (name === 'dob' && this.isValidDate(value))) {
      studentPersonalDetailsErrors[name] = false;
      this.setState({studentPersonalDetailsErrors, isStudentPersonalDetailsFormValid: false});
    }
    if ((name === "firstname" || name ===  "lastname") && value.trim().length === 0) {
      this.studentPersonalDetailsFieldsValue.username = '';
    } else if (firstname && lastname && firstname.trim().length > 0 && lastname.trim().length > 0) {
      const studentPersonalDetailsFieldsValue = this.studentPersonalDetailsFieldsValue;
      studentPersonalDetailsFieldsValue.username = this.makeUserName(this.studentPersonalDetailsFieldsValue.firstname, this.studentPersonalDetailsFieldsValue.lastname, 6);
      studentPersonalDetailsErrors.username = false;
    }
    this.setState({studentPersonalDetailsErrors});
  };

  onChangeParentDetailsFormField = (data) => {
    const {name, value} = data;
    const {parentDetailsErrors} = this.state;
    this.parentDetailsFieldsValue[name] = value;
    if (value && value.length > 0) {
      parentDetailsErrors[name] = false;
      this.setState({parentDetailsErrors, isParentDetailsFormInValid: false});
    }
    if (this.parentDetailsFieldsValue.username && this.parentDetailsFieldsValue.username.trim().length > 0) {
      this.setState({parentDetailsErrors});
      return;
    } else if (this.parentDetailsFieldsValue.firstname && this.parentDetailsFieldsValue.lastname && this.parentDetailsFieldsValue.firstname.trim().length > 0 && this.parentDetailsFieldsValue.lastname.trim().length > 0) {
      const parentDetailsRequiredFields = this.parentDetailsFieldsValue;
      parentDetailsRequiredFields.username = this.makeUserName(this.parentDetailsFieldsValue.firstname, this.parentDetailsFieldsValue.lastname, 6);
      parentDetailsErrors.username = false;
    }
    this.setState({parentDetailsErrors});
  };

  handleStandardChange(standardId) {
    this.props.getAllBatchOfStandardLookUp(standardId);
    this.props.getStandard(standardId);
  };

  onChangeStudentAcademicDetailsFormField = (data) => {
    const {name, value} = data;
    const {studentAcademicDetailsErrors} = this.state;
    this.studentAcademicDetailsFieldsValue[name] = value;
    if (value && value.length > 0) {
      studentAcademicDetailsErrors[name] = false;
      this.setState({studentAcademicDetailsErrors, isParentDetailsFormInValid: false});
    }
    this.setState({studentAcademicDetailsErrors});
  };

  getSteps = () => {
    return ['Personal Details', 'Parent Details', 'Academic Details'];
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <StudentPersonalDetailsForm onChange={this.onChangeStudentPersonalDetailsFormField}
                                           errors={this.state.studentPersonalDetailsErrors}
                                           values={this.studentPersonalDetailsFieldsValue}/>;
      case 1:
        return <ParentDetailsForm onChange={this.onChangeParentDetailsFormField}
                                  errors={this.state.parentDetailsErrors}
                                  values={this.parentDetailsFieldsValue}/>;
      case 2:
        return <StudentAcademicDetailsForm onChange={this.onChangeStudentAcademicDetailsFormField}
                                          errors={this.state.studentAcademicDetailsErrors}
                                          values={this.studentAcademicDetailsFieldsValue}
                                        standardLookUp={this.props.student.standardLookUp}
                                        onStandardChange={(standardId) => this.handleStandardChange(standardId)}
                                        batchLookUp={this.props.student.batchLookUp}/>;
      default:
        return 'Unknown step';
    }
  };

  isStepFailed = (step) => {
    if (step === 0) {
      return this.isStudentPersonalDetailsFormInValid;
    } else  if (step === 1) {
      return this.isParentDetailsFormInValid;
    }
    return false;
  };

  handleNext = () => {
    const {studentPersonalDetailsErrors, parentDetailsErrors, studentAcademicDetailsErrors, activeStep} = this.state;
    if (activeStep === 0) {
      this.studentPersonalDetailsRequiredFields.forEach(field => {
        if (!this.studentPersonalDetailsFieldsValue[field]) {
          studentPersonalDetailsErrors[field] = true;
          this.setState({studentPersonalDetailsErrors});
        }
      });

      for (var errorKey in studentPersonalDetailsErrors) {
        if (studentPersonalDetailsErrors.hasOwnProperty(errorKey)) {
          if (studentPersonalDetailsErrors[errorKey] === true) {
            this.isStudentPersonalDetailsFormInValid = true;
            return;
          }
        }
      }
      this.isStudentPersonalDetailsFormInValid = false;
    } else if (activeStep === 1) {

      this.parentDetailsRequiredFields.forEach(field => {
        if (!this.parentDetailsFieldsValue[field]) {
          parentDetailsErrors[field] = true;
          this.setState({parentDetailsErrors});
        }
      });

      for (var errorKey in parentDetailsErrors) {
        if (parentDetailsErrors.hasOwnProperty(errorKey)) {
          if (parentDetailsErrors[errorKey] === true) {
            this.isParentDetailsFormInValid = true;
            return;
          }
        }
      }
      this.isParentDetailsFormInValid = false;
    } else if (activeStep === 2) {

      this.studentAcademicDetailsRequiredFields.forEach(field => {
        if (!this.studentAcademicDetailsFieldsValue[field]) {
          studentAcademicDetailsErrors[field] = true;
          this.setState({studentAcademicDetailsErrors});
        }
      });

      for (var errorKey in studentAcademicDetailsErrors) {
        if (studentAcademicDetailsErrors.hasOwnProperty(errorKey)) {
          if (studentAcademicDetailsErrors[errorKey] === true) {
            this.isStudentAcademicDetailsFormInValid = true;
            return;
          }
        }
      }
      this.isStudentAcademicDetailsFormInValid = false;

      this.createUser();

    }
    this.setState({
      activeStep: this.state.activeStep + 1
    })
  };

  createUser() {
    const branchId = getBranchId();
    const branch =  {
      "id": branchId
    };
    let studentUser = this.studentPersonalDetailsFieldsValue;
    let parentUser = this.parentDetailsFieldsValue;

    studentUser.branch = branch;
    if (this.studentAcademicDetailsFieldsValue.hasPaidFees === true) {
      this.studentAcademicDetailsFieldsValue.hasPaidFees = "Y";
    } else {
      this.studentAcademicDetailsFieldsValue.hasPaidFees = "N";
    }
    const batchId = this.studentAcademicDetailsFieldsValue.batch;
    delete this.studentAcademicDetailsFieldsValue['batch'];
    const batch = {
      "id": batchId
    };
    this.studentAcademicDetailsFieldsValue.batch = batch;
    this.studentAcademicDetailsFieldsValue.parentsUsername = parentUser.username;
    studentUser.studentDetailses = [this.studentAcademicDetailsFieldsValue];
    const authoritiesesStudent = {
      username: studentUser.username,
      authority: 'ROLE_STUDENT'
    };
    studentUser.created = new Date();
    studentUser.authoritieses = [authoritiesesStudent];

    this.props.createUser(studentUser);

    parentUser.branch = branch;
    parentUser.address = studentUser.address;
    parentUser.city = studentUser.city;
    parentUser.state = studentUser.state;
    parentUser.zip = studentUser.zip;
    parentUser.country = studentUser.country;
    parentUser.created = new Date();

    let parentDetails = {};
    parentDetails.relation = this.parentDetailsFieldsValue.relation;
    parentDetails.occupation = this.parentDetailsFieldsValue.occupation;
    parentDetails.education = this.parentDetailsFieldsValue.education;
    parentDetails.income = this.parentDetailsFieldsValue.income;
    parentUser.parentDetailses = [parentDetails];

    const authoritiesesParent = {
      username: parentUser.username,
      authority: 'ROLE_PARENT'
    };
    parentUser.authoritieses = [authoritiesesParent];
    this.props.createUser(parentUser);

    console.log('student object to create ', studentUser)
    console.log('parent object to create ', parentUser)

  }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    })
  };

  render() {
    const {classes, standard} = this.props;
    if (standard.fees !== '' ) {
      this.studentAcademicDetailsFieldsValue.fees = standard.fees;
    }
    const {activeStep, steps} = this.state;
    return (
      <div className={classes.root}>
        <Stepper className={classes.root} activeStep={this.state.activeStep}>
          {this.state.steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (this.isStepFailed(index)) {
              labelProps.error = true;
            }

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === this.state.steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - Student will be created soon. Contact Admin if not created.
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Add New ?
              </Button>
            </div>
          ) : (
            <div>
              {this.getStepContent(this.state.activeStep)}
              <div>
                <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {subject, standard, student} = state;
  return {standard, subject, student};
}

const mapDispatchToProps = {
  getStandard,
  getAllStandardLookUpForStudent,
  getAllBatchOfStandardLookUp,
  createUser: saveOrUpdateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentWizard));
