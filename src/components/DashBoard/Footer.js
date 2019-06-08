import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import {withStyles} from "@material-ui/core";


const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing * 8,
    marginBottom: theme.spacing * 2,
  },
  footer: {
    padding: theme.spacing * 2,
    marginTop: 'auto',
  },
  card: {
    backgroundColor: '#3f51b5',
  },
  content: {
    color: 'white'
  }
});

class Footer extends Component {

  MadeWithLove(content) {
    return (
      <div>
        <Typography className={content} variant="body2" color="textSecondary">
          {'All rights reserved by '}
          <Link color="inherit" href="https://material-ui.com/">
            Material-UI
          </Link>
          <Link color="inherit" href="https://material-ui.com/">
            {' and DevArena'}
          </Link>
          {' team.'}
        </Typography>
      </div>
    );
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <footer className={classes.footer}>
          <Card className={classes.card}>
            <Typography variant="body1" className={classes.content}>Academy Management System.</Typography>
            {this.MadeWithLove(classes.content)}
          </Card>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(Footer)