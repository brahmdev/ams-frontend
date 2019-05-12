import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import SimpleLineChart from "./SimpleLineChart";
import Button from "@material-ui/core/Button/Button";
import CardActions from "@material-ui/core/CardActions/CardActions";

const styles = theme => ({

  card: {
    width: 330,
    maxWidth: 400,
    marginLeft: 30,
  },
  media: {
    height: 20,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 64,
    color: '#fff',
  },
  content: {
    display: 'flex'
  },
  content_data: {
    width: '100%',
    margin: 'auto',
    marginLeft: '115px',
  },
  content_data_count: {
    color: '#fff',
  },
  content_data_text: {
    fontSize: '16px',
    color: '#fff',
  },
  income_expense_graph_card: {
    marginLeft: '50px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  income_expense_progress_card: {
    marginLeft: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    marginRight: '20px'
  },
  progress_section: {
    color: '#979797',
    fontSize: '16px',
    marginTop: '12px'
  },
  income_graph_data_title: {

  },
  lineProgressBar: {
    backgroundColor: '#1890ff',
    height: '7px',
    borderRadius: '4px'
  },
  linearColorPrimary: {
    backgroundColor: 'lightgray',
  },
  linearBarColorPrimary: {
    backgroundColor: '#1890ff',
  },
});

function IncomeExpenseSection(props) {
  const {classes} = props;
  return (

    <Grid container className={classes.root}>
          <Grid item xs={8}>
            <Card className={classes.income_expense_graph_card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Income/Expense Graph
                </Typography>
                <SimpleLineChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card className={classes.income_expense_progress_card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Expense
                </Typography>
                <Typography component="h3" className={classes.progress_section}>
                  <div className={classes.income_graph_data_title}>Advertisement</div>
                  <LinearProgress classes={{
                    colorPrimary: classes.linearColorPrimary,
                    barColorPrimary: classes.linearBarColorPrimary,
                  }} className={classes.lineProgressBar} variant="determinate" value={40} />40%
                </Typography>

                <Typography component="h3" className={classes.progress_section}>
                  <div className={classes.income_graph_data_title}>Salaries</div>
                  <LinearProgress  classes={{
                    colorPrimary: classes.linearColorPrimary,
                    barColorPrimary: classes.linearBarColorPrimary,
                  }} className={classes.lineProgressBar} variant="determinate" value={80} />40%
                </Typography>

                <Typography component="h3" className={classes.progress_section}>
                  <div className={classes.income_graph_data_title}>Resources</div>
                  <LinearProgress  classes={{
                    colorPrimary: classes.linearColorPrimary,
                    barColorPrimary: classes.linearBarColorPrimary,
                  }} className={classes.lineProgressBar} variant="determinate" value={75} />40%
                </Typography>

                <Typography component="h3" className={classes.progress_section}>
                  <div className={classes.income_graph_data_title}>Ad-hoc</div>
                  <LinearProgress  classes={{
                    colorPrimary: classes.linearColorPrimary,
                    barColorPrimary: classes.linearBarColorPrimary,
                  }} className={classes.lineProgressBar} variant="determinate" value={30} />40%
                </Typography>

                <CardActions>
                  <Button size="large" color="primary">
                    More Details
                  </Button>
                </CardActions>
              </CardContent>
            </Card>

      </Grid>
    </Grid>

  );
}

IncomeExpenseSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncomeExpenseSection);