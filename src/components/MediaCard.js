import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SchoolIcon from '@material-ui/icons/School';
import MultilineChartRounded from '@material-ui/icons/MultilineChartRounded';
import PieChart from '@material-ui/icons/PieChart';
import ThumbUpAltRounded from '@material-ui/icons/ThumbUpAltRounded';
import Grid from '@material-ui/core/Grid';

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
  student: {
    backgroundColor: '#42a5f6',
    opacity: 0.8,
  },
  revenue: {
    backgroundColor: '#7ed320',
    opacity: 0.8
  },
  expense: {
    backgroundColor: '#e4900c',
    opacity: 0.8,
  },
  profit: {
    backgroundColor: '#852b99',
    opacity: 0.8
  }
});

function MediaCard(props) {
  const {classes} = props;
  return (


    <Grid container className={classes.root} spacing={16}>
      <Grid item xs={12}>
        <Grid container className={classes.demo} justify="center" spacing={Number(16)}>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea className={classes.student}>
                <CardContent className={classes.content}>
                  <SchoolIcon className={classes.icon}
                  />
                  <div className={classes.content_data}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.content_data_count}>
                      0
                    </Typography>
                    <Typography component="p" className={classes.content_data_text}>
                      Students
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Export
                </Button>
                <Button size="small" color="primary">
                  More Details
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea className={classes.revenue}>
                <CardContent className={classes.content}>
                  <MultilineChartRounded className={classes.icon}
                  />
                  <div className={classes.content_data}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.content_data_count}>
                      INR 0.00
                    </Typography>
                    <Typography component="p" className={classes.content_data_text}>
                      Revenue
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Export
                </Button>
                <Button size="small" color="primary">
                  More Details
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea className={classes.expense}>
                <CardContent className={classes.content}>
                  <PieChart className={classes.icon}
                  />
                  <div className={classes.content_data}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.content_data_count}>
                      INR 0.00
                    </Typography>
                    <Typography component="p" className={classes.content_data_text}>
                      Expense
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Export
                </Button>
                <Button size="small" color="primary">
                  More Details
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item>
            <Card className={classes.card}>
              <CardActionArea className={classes.profit}>
                <CardContent className={classes.content}>
                  <ThumbUpAltRounded className={classes.icon}
                  />
                  <div className={classes.content_data}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.content_data_count}>
                      INR 0.00
                    </Typography>
                    <Typography component="p" className={classes.content_data_text}>
                      Profit
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Export
                </Button>
                <Button size="small" color="primary">
                  More Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);