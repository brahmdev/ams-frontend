import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleTable from './SimpleTable';
import MediaCard from "./MediaCard";
import IncomeExpenseSection from "./IncomeExpenseSection";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
    marginLeft: '25px',
    marginRight: '15px'
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  logo: {
    width: '100%',
    fontSize: '18px',
    color: 'slategray'
  },
});

class Dashboard extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography component="div" className={classes.chartContainer}>
            <MediaCard/>
          </Typography>

          <Typography component="div" className={classes.chartContainer}>
            <IncomeExpenseSection/>
          </Typography>

          <div className={classes.tableContainer}>
            <SimpleTable />
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
