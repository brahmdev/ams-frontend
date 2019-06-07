import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import School from '@material-ui/icons/School';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AvTimer from '@material-ui/icons/AvTimer';
import ViewHeadline from '@material-ui/icons/ViewHeadline';
import Timeline from '@material-ui/icons/Timeline';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Payment from '@material-ui/icons/Payment';
import Gavel from '@material-ui/icons/Gavel';
import {Link} from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class PrimaryMenuList extends React.Component {
  state = {
    people: false,
    academic: false,
    attendance: false,
    reports: false,
    accounts: false,
    fees: false,
    examination: false,
  };

  handlePeopleClick = () => {
    this.setState(state => ({people: !state.people}));
  };

  handleAttendanceClick = () => {
    this.setState(state => ({attendance: !state.attendance}));
  };

  handleAcademicClick = () => {
    this.setState(state => ({academic: !state.academic}));
  };

  handleReportsClick = () => {
    this.setState(state => ({reports: !state.reports}));
  };

  handleAccountsClick = () => {
    this.setState(state => ({accounts: !state.accounts}));
  };

  handleFeesClick = () => {
    this.setState(state => ({fees: !state.fees}));
  };

  handleExaminationClick = () => {
    this.setState(state => ({examination: !state.examination}));
  };

  renderIcon = (iconName) => {
    if (iconName === 'dashBoard') {
      return <DashboardIcon/>
    } else if (['board', 'standard'].includes(iconName)) {
      return <ViewHeadline/>
    }
  };

  renderListItem = (route, classes, iconName, title, isNested) => {
    const nestedClassName = isNested ? classes.nested : '';
    return (
      <Link to={route} style={{textDecoration: 'none'}}>
        <ListItem button className={nestedClassName}>
          <ListItemIcon>
            {this.renderIcon(iconName)}
            </ListItemIcon>
          <ListItemText inset primary={title}/>
        </ListItem>
      </Link>
    );
  };

  render() {
    const {classes} = this.props;

    return (
      <List
        component="nav"
        subheader={<ListSubheader inset>Primary Menus</ListSubheader>}
        className={classes.root}
      >
        {this.renderListItem('/', classes, 'dashBoard', 'Dashboard', false)}

        <ListItem button onClick={this.handleAcademicClick}>
          <ListItemIcon>
            <School/>
          </ListItemIcon>
          <ListItemText inset primary="Academics"/>
          {this.state.academic ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={this.state.academic} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.renderListItem('/board', classes, 'board', 'Board', true)}
          </List>
        </Collapse>
        <Collapse in={this.state.academic} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
              {this.renderListItem('/standard', classes, 'standard', 'Standard', true)}
          </List>
        </Collapse>
        <Collapse in={this.state.academic} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Batch"/>
            </ListItem>
          </List>
        </Collapse>
        <Collapse in={this.state.academic} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Subject"/>
            </ListItem>
          </List>
        </Collapse>
        <Collapse in={this.state.academic} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Chapter"/>
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={this.handlePeopleClick}>
          <ListItemIcon>
            <PeopleIcon/>
          </ListItemIcon>
          <ListItemText inset primary="User management"/>
          {this.state.people ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={this.state.people} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Student"/>
            </ListItem>
          </List>
        </Collapse>
        <Collapse in={this.state.people} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Teacher"/>
            </ListItem>
          </List>
        </Collapse>
        <Collapse in={this.state.people} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Non-Teaching Staff"/>
            </ListItem>
          </List>
        </Collapse>


        <ListItem button onClick={this.handleAttendanceClick}>
          <ListItemIcon>
            <AssignmentIcon/>
          </ListItemIcon>
          <ListItemText inset primary="Attendance"/>
          {this.state.attendance ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={this.state.attendance} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Mark Attendance"/>
            </ListItem>
          </List>
        </Collapse>
        <Collapse in={this.state.attendance} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Attendance Register"/>
            </ListItem>
          </List>
        </Collapse>

        <ListItem button>
          <ListItemIcon>
            <AvTimer/>
          </ListItemIcon>
          <ListItemText inset primary="Time Table"/>
        </ListItem>

        <ListItem button onClick={this.handleReportsClick}>
          <ListItemIcon>
            <Timeline/>
          </ListItemIcon>
          <ListItemText inset primary="Reports"/>
          {this.state.reports ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={this.state.reports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Student Report"/>
            </ListItem>
          </List>
        </Collapse>
        <Collapse in={this.state.reports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Class Report"/>
            </ListItem>
          </List>
        </Collapse>
        <Collapse in={this.state.reports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Teacher Report"/>
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={this.handleAccountsClick}>
          <ListItemIcon>
            <AccountBalance/>
          </ListItemIcon>
          <ListItemText inset primary="Accounts"/>
          {this.state.reports ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={this.state.accounts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Daily Expense"/>
            </ListItem>
          </List>
        </Collapse>
        <Collapse in={this.state.accounts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Teacher Salaries"/>
            </ListItem>
          </List>
        </Collapse>
        <Collapse in={this.state.accounts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Student Payment Report"/>
            </ListItem>
          </List>
        </Collapse>
        <Collapse in={this.state.accounts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Expense Report"/>
            </ListItem>
          </List>
        </Collapse>


        <ListItem button onClick={this.handleFeesClick}>
          <ListItemIcon>
            <Payment/>
          </ListItemIcon>
          <ListItemText inset primary="Fees"/>
          {this.state.reports ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={this.state.accounts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Fees Information"/>
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={this.handleExaminationClick}>
          <ListItemIcon>
            <Gavel/>
          </ListItemIcon>
          <ListItemText inset primary="Exmination"/>
          {this.state.examination ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={this.state.examination} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Test Schedule"/>
            </ListItem>
          </List>
        </Collapse>
        <Collapse in={this.state.examination} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <ViewHeadline/>
              </ListItemIcon>
              <ListItemText inset primary="Results"/>
            </ListItem>
          </List>
        </Collapse>

      </List>
    );
  }
}

PrimaryMenuList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimaryMenuList);
