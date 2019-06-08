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
      skipped: new Set(),
      steps: this.getSteps()
    }
  }

  getSteps = () => {
    return ['Personal Details', 'Parent Details', 'Academic Details'];
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <StudentPersonalDetailsForm/>;
      case 1:
        return <ParendDetailsForm/>;
      case 2:
        return <StudentAcademicDetailsForm/>;
      default:
        return 'Unknown step';
    }
  };

  isStepOptional = (step) => {
    return step === 1;
  };

  isStepFailed = (step) => {
    return step === 1;
  };

  isStepSkipped = (step) => {
    return this.state.skipped.has(step);
  };

  handleNext = () => {
    let newSkipped = this.state.skipped;
    if (this.isStepSkipped(this.state.activeStep)) {
      newSkipped = new Set(this.state.skipped.values());
      newSkipped.delete(this.state.activeStep);
    }

    this.setState({
      skipped: newSkipped,
      activeStep: this.state.activeStep + 1
    })
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    })
  };

  handleSkip = () => {
    if (!this.isStepOptional(this.state.activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    const skipped = this.state.skipped;
    const activeStep = this.state.activeStep;
    skipped.add(this.state.activeStep)
    ;
    this.setState({skipped, activeStep: activeStep + 1 });
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
            if (this.isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Alert message
                </Typography>
              );
            }
            if (this.isStepFailed(index)) {
              labelProps.error = true;
            }
            if (this.isStepSkipped(index)) {
              stepProps.completed = false;
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
              <Typography className={classes.instructions}>{this.getStepContent(this.state.activeStep)}</Typography>
              <div>
                <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                  Back
                </Button>
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}

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
