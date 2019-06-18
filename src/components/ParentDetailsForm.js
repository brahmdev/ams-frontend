import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

export default class ParentDetailsForm extends Component {

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

  handleChange = (event) => {
    const {name, value} = event.target;
    this.props.onChange({name, value});
  };

  render() {
    const {errors, values} = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Parent Details
        </Typography>
        <Grid container spacing={8}>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
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
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
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
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="username"
              name="username"
              value={values['username'] ? values['username'] : ''}
              label="UserName"
              onChange={(e) => this.handleChange(e)}
              error={errors['username'] ? errors['username'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="password"
              value={values['password'] ? values['password'] : ''}
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
              id="bloodGroup"
              value={values['bloodGroup'] ? values['bloodGroup'] : ''}
              name="bloodGroup"
              label="Blood Group"
              onChange={(e) => this.handleChange(e)}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <FormControl style={this.formControl}>
              <InputLabel required htmlFor="gender">Gender</InputLabel>
              <Select
                value={values['gender'] ? values['gender'] : ''}
                onChange={(e) => this.handleChange(e)}
                required
                style={this.textFieldStyle}
                input={<Input required name="gender" id="gender" />}
                autoWidth
                error={errors['gender'] ? errors['gender'] : false}
              >
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
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
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
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
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
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
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="relation"
              value={values['relation'] ? values['relation'] : ''}
              name="relation"
              label="Relation"
              onChange={(e) => this.handleChange(e)}
              error={errors['relation'] ? errors['relation'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              required
              style={this.textFieldStyle}
              id="occupation"
              value={values['occupation'] ? values['occupation'] : ''}
              name="occupation"
              label="Occupation"
              onChange={(e) => this.handleChange(e)}
              error={errors['occupation'] ? errors['occupation'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              type="number"
              style={this.textFieldStyle}
              id="income"
              value={values['income'] ? values['income'] : ''}
              name="income"
              label="Income"
              onChange={(e) => this.handleChange(e)}
              error={errors['income'] ? errors['income'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={6} spacing={8}>
            <TextField
              style={this.textFieldStyle}
              id="education"
              value={values['education'] ? values['education'] : ''}
              name="education"
              label="Education"
              onChange={(e) => this.handleChange(e)}
              error={errors['education'] ? errors['education'] : false}
            />
          </Grid>
          <Grid style={this.gridStyle} container item xs={12} spacing={8}>
            <Typography variant="body2" gutterBottom style={{color: 'red'}}>
              (All * mark fields are mandatory!)
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
