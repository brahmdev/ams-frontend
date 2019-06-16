import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, TimePicker, DatePicker} from 'material-ui-pickers';
import Button from '@material-ui/core/Button';

class StudentPersonalDetailsEditForm extends Component {

  mainGrid = {
    marginLeft: '2%'
  };
  gridStyle = {
    marginTop: 20
  };
  textFieldStyle = {
    width: '80%'
  };
  formControl = {
    margin: 8,
    width: '100%',
  };
  save= {
    position: 'absolute',
    bottom: '25px',
    right: '25px'
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.props.onChange({name, value});
  };

  handleDateChange = (date) => {
    const name = 'dob';
    this.props.onChange({name, value: date});
  };

  render() {
    const { values, errors, savePersonalDetails } = this.props;
    return (
      <div style={this.mainGrid}>
        <Typography variant="h6" gutterBottom>
          Student Personal Details
        </Typography>
        <Grid container spacing={8}>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              required
              autoFocus
              style={this.textFieldStyle}
              id="firstname"
              value={values['firstname'] ? values['firstname'] : ''}
              name="firstname"
              label="First name"
              onChange={(e) => this.handleChange(e)}
              autoComplete="fname"
              error={errors['firstname'] ? errors['firstname'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="lastname"
              value={values['lastname'] ? values['lastname'] : ''}
              name="lastname"
              label="Last name"
              onChange={(e) => this.handleChange(e)}
              autoComplete="lname"
              error={errors['lastname'] ? errors['lastname'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              disabled={true}
              style={this.textFieldStyle}
              id="username"
              name="username"
              value={values['username'] ? values['username'] : ''}
              label="UserName"
              onChange={(e) => this.handleChange(e)}
              error={errors['username'] ? errors['username'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="password"
              type='password'
              value={values['password'] ? values['password'] : ''}
              name="password"
              label="Password"
              onChange={(e) => this.handleChange(e)}
              fullWidth
              error={errors['password'] ? errors['password'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              style={this.textFieldStyle}
              id="bloodGrp"
              value={values['bloodGrp'] ? values['bloodGrp'] : ''}
              name="bloodGrp"
              label="Blood Group"
              onChange={(e) => this.handleChange(e)}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <FormControl style={this.formControl}>
              <InputLabel required htmlFor="gender">Gender</InputLabel>
              <Select
                value={values['gender'] ? values['gender'] : ''}
                onChange={(e) => this.handleChange(e)}
                required
                style={this.textFieldStyle}
                input={<Input required name="gender" id="gender"/>}
                autoWidth
                error={errors['gender'] ? errors['gender'] : false}
              >
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                label="Date of Birth"
                value={values['dob'] ? values['dob'] : ''}
                onChange={(date) => this.handleDateChange(date)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="email"
              value={values['email'] ? values['email'] : ''}
              name="email"
              label="Email"
              onChange={(e) => this.handleChange(e)}
              fullWidth
              error={errors['email'] ? errors['email'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="mobile"
              value={values['mobile'] ? values['mobile'] : ''}
              type="number"
              name="mobile"
              label="Mobile"
              onChange={(e) => this.handleChange(e)}
              error={errors['mobile'] ? errors['mobile'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              style={this.textFieldStyle}
              id="phone"
              value={values['phone'] ? values['phone'] : ''}
              type="number"
              name="phone"
              onChange={(e) => this.handleChange(e)}
              label="Phone"
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              style={this.textFieldStyle}
              required
              id="city"
              value={values['city'] ? values['city'] : ''}
              name="city"
              label="City"
              autoComplete="billing address-level2"
              onChange={(e) => this.handleChange(e)}
              error={errors['city'] ? errors['city'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              disabled={true}
              id="state"
              value={'Maharashtra'}
              readOnly
              style={this.textFieldStyle}
              name="state"
              label="State/Province/Region"
              onChange={(e) => this.handleChange(e)}
              error={errors['state'] ? errors['state'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="zip"
              value={values['zip'] ? values['zip'] : ''}
              name="zip"
              label="Zip / Postal code"
              autoComplete="billing postal-code"
              onChange={(e) => this.handleChange(e)}
              error={errors['zip'] ? errors['zip'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              required
              disabled={true}
              style={this.textFieldStyle}
              id="country"
              value={'India'}
              name="country"
              readOnly
              label="Country"
              autoComplete="billing country"
              onChange={(e) => this.handleChange(e)}
              error={errors['country'] ? errors['country'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={4} spacing={8}>
            <TextField
              id="language"
              value={values['language'] ? values['language'] : ''}
              style={this.textFieldStyle}
              name="language"
              label="Language"
              onChange={(e) => this.handleChange(e)}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={12} spacing={8}>
            <TextField
              required
              id="address"
              value={values['address'] ? values['address'] : ''}
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
          <Grid style={this.gridStyle} container item xs={12} spacing={8}>
            <Typography variant="body2" gutterBottom style={{color: 'red'}}>
              (All * mark fields are mandatory!)
            </Typography>
          </Grid>
          <Button variant="contained" style={this.save} color="primary" onClick={() => savePersonalDetails()}>
            Save Personal Details
          </Button>
        </Grid>
      </div>
    );
  }
}

export default StudentPersonalDetailsEditForm;