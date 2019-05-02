import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

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
        people: false ,
        course: false
    };

    handlePeopleClick = () => {
        this.setState(state => ({ people: !state.people }));
    };

    handleCourseClick = () => {
        this.setState(state => ({ course: !state.course }));
    };

    render() {
        const { classes } = this.props;

        return (
            <List
                component="nav"
                subheader={<ListSubheader component="div">Primary Menus</ListSubheader>}
                className={classes.root}
            >
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Dashboard" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Drafts" />
                </ListItem>
                <ListItem button onClick={this.handlePeopleClick}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="User management" />
                    {this.state.people ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.people} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText inset primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button onClick={this.handleCourseClick}>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Course" />
                    {this.state.course ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.course} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText inset primary="Starred2" />
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
