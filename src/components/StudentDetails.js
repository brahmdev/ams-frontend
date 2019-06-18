import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Group from '@material-ui/icons/Group';
import Equalizer from '@material-ui/icons/Equalizer';
import ArrowBack from '@material-ui/icons/ArrowBack';
import DoneAll from '@material-ui/icons/DoneAll';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router'
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Grid from '@material-ui/core/Grid';
import StudentPersonalDetailsEditForm from "./StudentPersonalDetailsEditForm";
import {
  getAllStandardLookUpForStudent,
  getAllBatchOfStandardLookUp,
  getParentDetails,
  saveOrUpdateUser
} from "../actions/studentActions";
import connect from "react-redux/es/connect/connect";
import {getStandard} from "../actions/standardActions";
import ParentDetailsEditForm from "./ParentDetailsEditForm";
import StudentAcademicDetailsEditForm from "./StudentAcademicDetailsEditForm";
import {getBranchId} from "../utils/userInfo";
import EventSeat from '@material-ui/icons/EventSeat';

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
      marginTop: '80px',
      flexGrow: 1,
      display: 'flex'
    },
    gridItem: {
      maxWidth: '100%',
      flexBasis: '100%'
    },
    details: {
      backgroundColor: theme.palette.background.paper,
      margin: '20px'
    },
    button: {
      margin: theme.spacing.unit,
    },
    margin: {
      margin: theme.spacing.unit,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    cssRoot: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
    master: {
      height: '150px',
    },
    studentInfo: {
      display: 'flex',
      marginLeft: 10
    },
    studentBasicInfo: {
      display: 'contents'
    },
    studentData: {
      textAlign: 'start',
      margin: '10px 22px'
    },
    actionButtonContainer: {
      float: 'right',
      display: 'flex',
      marginRight: 10
    },
    orangeAvatar: {
      color: '#fff',
      backgroundColor: deepOrange[500],
    },
    greenAvatar: {
      color: '#fff',
      backgroundColor: '#45CB85',
    },
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60,
    },
    paragraph: {
      marginBottom: '3px'
    },
    heading: {
      fontSize: '18px',
      fontWeight: 'bold'
    },
    information: {
      color: 'grey'
    },
    orangeInformation: {
      color: 'orange'
    },
    vl: {
      borderLeft: '3px solid #45CB85',
      height: '92px',
      position: 'absolute',
      left: '41%',
      marginLeft: '-3px',
      top: '10%',
    },

  })
;

class StudentDetails extends React.Component {
  state = {
    value: 0,
    studentPersonalDetailsErrors: [],
    parentDetailsErrors: [],
    studentAcademicDetailsErrors: []
  };

  studentAcademicDetailsValue = {};

  componentDidMount() {
    const {location: {state: {userDetails}}} = this.props;
    this.props.getParentDetails(userDetails.username);

    const branchId = getBranchId();
    this.props.getAllStandardLookUpForStudent(branchId);

    this.handleStandardChange(userDetails.studentDetailses[0].batch.standard.id);
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  goBack = (event) => {
    this.props.history.goBack();
  };

  onChangeStudentPersonalDetailsFormField = (data) => {
    const {location: {state: {userDetails}}} = this.props;

    const {name, value} = data;
    const {studentPersonalDetailsErrors} = this.state;
    userDetails[name] = value;
    if ((value && value.length > 0) || (name === 'dob' && this.isValidDate(value))) {
      studentPersonalDetailsErrors[name] = false;
      this.setState({studentPersonalDetailsErrors});
    }
  };

  onChangeStudentParentDetailsFormField = (data) => {
    const {student: {parentDetails}} = this.props;

    const {name, value} = data;
    const {parentDetailsErrors} = this.state;
    parentDetails[name] = value;
    if (['relation', 'income', 'education', 'occupation'].includes(name)) {
      parentDetails.parentDetailses[0][name] = value;
      parentDetailsErrors[name] = false;
      this.setState({parentDetailsErrors});
    } else if ((value && value.length > 0) || (name === 'dob' && this.isValidDate(value))) {
      parentDetailsErrors[name] = false;
      this.setState({parentDetailsErrors});
    }
  };

  onChangeStudentAcademicDetailsFormField = (data) => {
    const {location: {state: {userDetails}}} = this.props;
    const {name, value} = data;
    const {studentAcademicDetailsErrors} = this.state;
    this.studentAcademicDetailsValue[name] = value;
    if (value && value.length > 0) {
      studentAcademicDetailsErrors[name] = false;
      this.setState({studentAcademicDetailsErrors});
    }
  };


  savePersonalDetails = () => {
    const {location: {state: {userDetails}}} = this.props;
    console.log('about to save ', userDetails);
    this.props.saveOrUpdateUser(userDetails);
  };

  saveParentDetails = () => {
    const {student} = this.props;
    console.log('about to save ', student.parentDetails);
    this.props.saveOrUpdateUser(student.parentDetails);
  };

  saveAcademicDetails = () => {
    const {location: {state: {userDetails}}} = this.props;

    if (this.studentAcademicDetailsValue.hasPaidFees === true) {
      this.studentAcademicDetailsValue.hasPaidFees = "Y";
    } else {
      this.studentAcademicDetailsValue.hasPaidFees = "N";
    }

    const batchId = this.studentAcademicDetailsValue.batch.id ? this.studentAcademicDetailsValue.batch.id : this.studentAcademicDetailsValue.batch;
    delete this.studentAcademicDetailsValue['batch'];
    const batch = {
      "id": batchId
    };
    this.studentAcademicDetailsValue.batch = batch;
    userDetails.studentDetailses = [this.studentAcademicDetailsValue];

    console.log('about to save ', userDetails);
    this.props.saveOrUpdateUser(userDetails);
  };

  createParentDataForEdit = (parentUser) => {
    parentUser.relation = parentUser.parentDetailses[0].relation;
    parentUser.occupation = parentUser.parentDetailses[0].occupation;
    parentUser.income = parentUser.parentDetailses[0].income;
    parentUser.education = parentUser.parentDetailses[0].education;
    return parentUser;
  };

  handleStandardChange(standardId) {
    this.props.getAllBatchOfStandardLookUp(standardId);
    this.props.getStandard(standardId);
  };

  render() {
    const {classes, student, location: {state: {userDetails}}} = this.props;
    const {value} = this.state;
    console.log('in details ', userDetails)
    let parentDetails = student.parentDetails;
    if (parentDetails !== '') {
      parentDetails = this.createParentDataForEdit(parentDetails);
    }

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid item xs={4} className={classes.gridItem}>
            <div className={classes.studentInfo}>
              <Avatar
                className={classNames(classes.orangeAvatar, classes.bigAvatar)}>{`${userDetails.firstname.charAt(0)} ${userDetails.lastname.charAt(0)}`}</Avatar>

              <div className={classes.studentData}>
                <p
                  className={classNames(classes.paragraph, classes.heading)}>{userDetails.firstname} {userDetails.lastname}</p>
                <p
                  className={classNames(classes.paragraph, classes.information)}>{userDetails.gender}</p>
                <p
                  className={classNames(classes.paragraph, classes.information)}>{userDetails.mobile} | {userDetails.email}</p>
                <p className={classNames(classes.paragraph, classes.orangeInformation)}>No allergies</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <div className={classes.studentInfo}>
              <Avatar
                className={classNames(classes.greenAvatar, classes.bigAvatar)}><EventSeat/></Avatar>

              <div className={classes.studentData}>
                <p
                  className={classNames(classes.paragraph, classes.heading)}>Batch Details</p>
                <p
                  className={classNames(classes.paragraph, classes.information)}>Batch: {`${userDetails.studentDetailses[0].batch.name}(${userDetails.studentDetailses[0].batch.code})`}</p>
                <p
                  className={classNames(classes.paragraph, classes.information)}>Standard: {`${userDetails.studentDetailses[0].batch.standard.name}(${userDetails.studentDetailses[0].batch.standard.code})`}</p>

                <p className={classNames(classes.paragraph, classes.orangeInformation)}>Fees
                  Paid: {userDetails.studentDetailses[0].hasPaidFees}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>

            <div className={classes.actionButtonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classNames(classes.cssRoot)}
                onClick={(e) => this.goBack()}
              >
                <ArrowBack className={classes.leftIcon}/>
                Go Back
              </Button>
            </div>
          </Grid>
        </div>

        <Grid item>
          <div className={classes.details}>
            <Paper square>
              <Tabs
                value={value}
                onChange={this.handleChange}
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor='secondary'
              >
                <Tab icon={<PermIdentity/>} label="Personal Details"/>
                <Tab icon={<Group/>} label="Parent Details"/>
                <Tab icon={<LibraryBooks/>} label="Academic Details"/>
                <Tab icon={<DoneAll/>} label="Attendance"/>
                <Tab icon={<Equalizer/>} label="Reports"/>
              </Tabs>
            </Paper>
            {value === 0 && <TabContainer><StudentPersonalDetailsEditForm values={userDetails}
                                                                          savePersonalDetails={this.savePersonalDetails}
                                                                          onChange={this.onChangeStudentPersonalDetailsFormField}
                                                                          errors={this.state.studentPersonalDetailsErrors}/></TabContainer>}
            {value === 1 && <TabContainer><ParentDetailsEditForm values={parentDetails}
                                                                 saveParentDetails={this.saveParentDetails}
                                                                 onChange={this.onChangeStudentParentDetailsFormField}
                                                                 errors={this.state.parentDetailsErrors}/></TabContainer>}
            {value === 2 && <TabContainer><StudentAcademicDetailsEditForm values={this.studentAcademicDetailsValue}
                                                                          saveAcademicDetails={this.saveAcademicDetails}
                                                                          onChange={this.onChangeStudentAcademicDetailsFormField}
                                                                          errors={this.state.studentAcademicDetailsErrors}
                                                                          standardLookUp={this.props.student.standardLookUp}
                                                                          onStandardChange={(standardId) => this.handleStandardChange(standardId)}
                                                                          batchLookUp={this.props.student.batchLookUp}/></TabContainer>}
            {value === 3 && <TabContainer>Item Four</TabContainer>}
            {value === 4 && <TabContainer>Item Five</TabContainer>}

          </div>
        </Grid>
      </React.Fragment>
    )
      ;
  }
}

StudentDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  const {student} = state;
  return {student};
}

const mapDispatchToProps = {
  saveOrUpdateUser,
  getParentDetails,
  getStandard,
  getAllStandardLookUpForStudent,
  getAllBatchOfStandardLookUp,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentDetails)));