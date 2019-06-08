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
    marginTop: 20
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
    }
  }
  isStudentPersonalDetailsFormInValid = false

  studentPersonalDetailsRequiredFields = [
    'firstName',
    'lastName',
    'userName',
    'password',
    'mobile',
    'gender',
    'email',
    'address',
    'city',
    'state',
    'zip',
    'country'
  ];

  studentPersonalDetailsFieldsValue = [];

  onChangeStudentPersoanlDetailsFormField = (data) => {
    const {name, value} = data;
    this.studentPersonalDetailsFieldsValue[name] = value;
    if (value && value.length > 0 ) {
      const studentPersonalDetailsErrors = this.state.studentPersonalDetailsErrors;
      studentPersonalDetailsErrors[name] = false;
      this.setState({ studentPersonalDetailsErrors, isStudentPersonalDetailsFormValid: false });    }
  };

  getSteps = () => {
    return ['Personal Details', 'Parent Details', 'Academic Details'];
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <StudentPersonalDetailsForm onChange={this.onChangeStudentPersoanlDetailsFormField} errors={this.state.studentPersonalDetailsErrors}/>;
      case 1:
        return <ParendDetailsForm/>;
      case 2:
        return <StudentAcademicDetailsForm/>;
      default:
        return 'Unknown step';
    }
  };

  isStepFailed = (step) => {
    if (step === 0 ) {
      return this.isStudentPersonalDetailsFormInValid;
    }
    return false;
  };

  handleNext = () => {
    const { studentPersonalDetailsErrors } = this.state;
    this.studentPersonalDetailsRequiredFields.forEach(field => {
      if (!this.studentPersonalDetailsFieldsValue[field]) {
        studentPersonalDetailsErrors[field] = true;
        this.setState({ studentPersonalDetailsErrors });
      }
    });

    for (var errorKey in studentPersonalDetailsErrors) {
      if (studentPersonalDetailsErrors.hasOwnProperty(errorKey)) {
        if (studentPersonalDetailsErrors[errorKey] === true) {
          this.isStudentPersonalDetailsFormInValid = true
          return;
        }
      }
    }
    this.isStudentPersonalDetailsFormInValid = false;

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
    const { activeStep, steps } = this.state;
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
            console.log('label : ', label, ': ',  index)
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
