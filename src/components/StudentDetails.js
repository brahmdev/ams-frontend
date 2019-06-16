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
      flexGrow: 1,
      width: '100%',
      marginTop: '5%'
    },
    details: {
      backgroundColor: theme.palette.background.paper,
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
      height: '170px',
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
      float: 'right'
    },
    orangeAvatar: {
      color: '#fff',
      backgroundColor: deepOrange[500],
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
      top: '17%',
    }
  })
;

class StudentDetails extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  goBack = (event) => {
    this.props.history.goBack();
  };

  render() {
    const {classes, location: {state: {userDetails}}} = this.props;
    const {value} = this.state;
    console.log('in details ', userDetails)
    return (
      <div className={classes.root}>
        <div className={classes.master}>
          <div className={classes.actionButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classNames(classes.margin, classes.cssRoot)}
              onClick={(e) => this.goBack()}
            >
              <ArrowBack className={classes.leftIcon}/>
              Go Back
            </Button>
          </div>
          <div className={classes.studentInfo}>
            <Grid container justify="flex-start" alignItems="center" className={classes.studentBasicInfo}>
              <Avatar className={classNames(classes.orangeAvatar, classes.bigAvatar)}>N</Avatar>
              <div className={classes.studentData}>
                <p
                  className={classNames(classes.paragraph, classes.heading)}>{userDetails.firstname} {userDetails.lastname}</p>
                <p
                  className={classNames(classes.paragraph, classes.information)}>{userDetails.gender}</p>
                <p
                  className={classNames(classes.paragraph, classes.information)}>{userDetails.mobile} | {userDetails.email}</p>
                <p className={classNames(classes.paragraph, classes.orangeInformation)}>No allergies</p>

                <div className={classes.vl}></div>

              </div>
            </Grid>
          </div>
        </div>
        <div className={classes.details}>
          <Paper square>
            <Tabs
              value={value}
              onChange={this.handleChange}
              variant="fullWidth"
              scrollButtons="off"
              indicatorColor='secondary'
            >
              <Tab icon={<PermIdentity/>} label="Personal Details"/>
              <Tab icon={<Group/>} label="Parent Details"/>
              <Tab icon={<LibraryBooks/>} label="Academic Details"/>
              <Tab icon={<DoneAll/>} label="Attendance"/>
              <Tab icon={<Equalizer/>} label="Reports"/>
            </Tabs>
          </Paper>
          {value === 0 && <TabContainer>Item One</TabContainer>}
          {value === 1 && <TabContainer>Item Two</TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>}
          {value === 3 && <TabContainer>Item Four</TabContainer>}
          {value === 4 && <TabContainer>Item Five</TabContainer>}
        </div>
      </div>
    );
  }
}

StudentDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(StudentDetails));