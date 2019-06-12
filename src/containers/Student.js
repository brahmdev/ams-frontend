import React, {Component} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";
import StudentPersonalDetailsForm from "../components/StudentPersonalDetailsForm";
import ParendDetailsForm from "../components/ParendDetailsForm";
import StudentAcademicDetailsForm from "../components/StudentAcademicDetailsForm";

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

class Student extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: this.getSteps(),
      studentPersonalDetailsErrors: [],
      parentDetailsErrors: [],
    }
  }

  isStudentPersonalDetailsFormInValid = false;
  isParentDetailsFormInValid = false;

  studentPersonalDetailsRequiredFields = [
    'firstName',
    'lastName',
    'userName',
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
    'firstName',
    'lastName',
    'userName',
    'password',
    'mobile',
    'gender',
    'email'
  ];

  parentDetailsFieldsValue =  [];

  makeUserName = (length) => {
    var name = this.studentPersonalDetailsFieldsValue.firstName + this.studentPersonalDetailsFieldsValue.lastName;
    var userName = '';
    var characters = name;
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      userName += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return userName;
  };

  isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  onChangeStudentPersonalDetailsFormField = (data) => {
    const {name, value} = data;
    const {studentPersonalDetailsErrors} = this.state;
    this.studentPersonalDetailsFieldsValue[name] = value;
    if ((value && value.length > 0) || (name === 'dob' && this.isValidDate(value))) {
      studentPersonalDetailsErrors[name] = false;
      this.setState({studentPersonalDetailsErrors, isStudentPersonalDetailsFormValid: false});
    }
    if (this.studentPersonalDetailsFieldsValue.userName && this.studentPersonalDetailsFieldsValue.userName.trim().length > 0) {
      return;
    } else if (this.studentPersonalDetailsFieldsValue.firstName && this.studentPersonalDetailsFieldsValue.lastName && this.studentPersonalDetailsFieldsValue.firstName.trim().length > 0 && this.studentPersonalDetailsFieldsValue.lastName.trim().length > 0) {
      const studentPersonalDetailsFieldsValue = this.studentPersonalDetailsFieldsValue;
      studentPersonalDetailsFieldsValue.userName = this.makeUserName(6);
      studentPersonalDetailsErrors.userName = false;
      this.setState({studentPersonalDetailsErrors});
    }
  };

  onChangeParentDetailsFormField = (data) => {
    const {name, value} = data;
    const {parentDetailsErrors} = this.state;
    this.parentDetailsFieldsValue[name] = value;
    if (value && value.length > 0) {
      parentDetailsErrors[name] = false;
      this.setState({parentDetailsErrors, isParentDetailsFormInValid: false});
    }
    if (this.parentDetailsFieldsValue.userName && this.parentDetailsFieldsValue.userName.trim().length > 0) {
      return;
    } else if (this.parentDetailsFieldsValue.firstName && this.parentDetailsFieldsValue.lastName && this.parentDetailsFieldsValue.firstName.trim().length > 0 && this.parentDetailsFieldsValue.lastName.trim().length > 0) {
      const parentDetailsRequiredFields = this.parentDetailsFieldsValue;
      parentDetailsRequiredFields.userName = this.makeUserName(6);
      parentDetailsErrors.userName = false;
      this.setState({parentDetailsErrors});
    }
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
        return <ParendDetailsForm onChange={this.onChangeParentDetailsFormField}
                                  errors={this.state.parentDetailsErrors}
                                  values={this.parentDetailsFieldsValue}/>;
      case 2:
        return <StudentAcademicDetailsForm/>;
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
    const {studentPersonalDetailsErrors, parentDetailsErrors, activeStep} = this.state;
    console.log(this.studentPersonalDetailsFieldsValue)
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

    }
    this.setState({
      activeStep: this.state.activeStep + 1
    })
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    })
  };

  handleReset = () => {
    this.setState({activeStep: 0});
  };

  render() {
    const {classes} = this.props;
    const {activeStep, steps} = this.state;
    return (
      <div className={classes.root}>
        <Stepper className={classes.root} activeStep={this.state.activeStep}>
          {this.state.steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            /*if (this.isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Alert message
                </Typography>
              );
            }*/
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
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
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
  const {subject, standard} = state;
  return {standard, subject};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Student));
