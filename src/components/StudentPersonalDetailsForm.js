import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default class StudentPersonalDetailsForm extends Component {

  gridStyle = {
    marginTop: 20
  };
  textFieldStyle = {
    width: '80%'
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.props.onChange({name, value});
  };

  render() {
    const {errors} = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Student Personal Details
        </Typography>
        <Grid container spacing={8}>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              autoFocus
              style={this.textFieldStyle}
              id="firstName"
              name="firstName"
              label="First name"
              onChange={(e) => this.handleChange(e)}
              autoComplete="fname"
              error={errors['firstName'] ? errors['firstName'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="lastName"
              name="lastName"
              label="Last name"
              onChange={(e) => this.handleChange(e)}
              autoComplete="lname"
              error={errors['lastName'] ? errors['lastName'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="userName"
              name="userName"
              label="UserName"
              onChange={(e) => this.handleChange(e)}
              error={errors['userName'] ? errors['userName'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="password"
              name="password"
              label="Password"
              onChange={(e) => this.handleChange(e)}
              fullWidth
              error={errors['password'] ? errors['password'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              style={this.textFieldStyle}
              id="bloodGrp"
              name="bloodGrp"
              label="Blood Group"
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="gender"
              name="gender"
              label="Gender"
              onChange={(e) => this.handleChange(e)}
              fullWidth
              error={errors['gender'] ? errors['gender'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="email"
              name="email"
              label="Email"
              onChange={(e) => this.handleChange(e)}
              fullWidth
              error={errors['email'] ? errors['email'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="mobile"
              name="mobile"
              label="Mobile"
              onChange={(e) => this.handleChange(e)}
              error={errors['mobile'] ? errors['mobile'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              style={this.textFieldStyle}
              id="phone"
              name="phone"
              onChange={(e) => this.handleChange(e)}
              label="Phone"
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={12} spacing={8}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              multiline
              rows={3}
              autoComplete="billing address-line2"
              onChange={(e) => this.handleChange(e)}
              error={errors['address'] ? errors['address'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              style={this.textFieldStyle}
              required
              id="city"
              name="city"
              label="City"
              autoComplete="billing address-level2"
              onChange={(e) => this.handleChange(e)}
              error={errors['city'] ? errors['city'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              id="state"
              style={this.textFieldStyle}
              name="state"
              label="State/Province/Region"
              onChange={(e) => this.handleChange(e)}
              error={errors['state'] ? errors['state'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="zip"
              name="zip"
              label="Zip / Postal code"
              autoComplete="billing postal-code"
              onChange={(e) => this.handleChange(e)}
              error={errors['zip'] ? errors['zip'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="country"
              name="country"
              label="Country"
              autoComplete="billing country"
              onChange={(e) => this.handleChange(e)}
              error={errors['country'] ? errors['country'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              id="language"
              style={this.textFieldStyle}
              name="language"
              label="Language"
              onChange={(e) => this.handleChange(e)}
            />
          </Grid>
          {Object.keys(errors).length > 0 ? <Grid style={this.gridStyle} container item xs={12} spacing={8}>
            <Typography variant="body2" gutterBottom style={{color: 'red'}}>
              All * mark fields are mandatory!
            </Typography>
          </Grid> : null}
        </Grid>
      </React.Fragment>
    );
  }
}
