import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers';

import Switch from '@material-ui/core/Switch';
import Button from "@material-ui/core/Button/Button";

export default class StudentAcademicDetailsEditForm extends Component {

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
  save = {
    position: 'absolute',
    right: '25px'
  }

  constructor(props) {
    super(props);
    this.state = {
      admissionDate: props.values['admissionDate'],
      hasPaidFees: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('hasPaidFees ', nextProps.values.hasPaidFees)
    if (nextProps.values.hasPaidFees === "Y") {
      return ({hasPaidFees: true}) // <- this is setState equivalent
    }
    return ({hasPaidFees: false}) // <- this is setState equivalent
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    console.log('name is ', name)
    if (name === "standard") {
      this.props.onStandardChange(value);
    } else if (name === 'hasPaidFees') {
      this.setState({hasPaidFees: !this.state.hasPaidFees}, () => {
        this.props.onChange({name: 'hasPaidFees', value: this.state.hasPaidFees})
      })
    }
    console.log('name: ', name, ' value : ', value);
    this.props.onChange({name, value});
  };

  createStandardMenuItem = () => {
    let standardMenuItem = [];
    const standardLookUp = this.props.standardLookUp;
    for (let key of Object.keys(standardLookUp)) {
      standardMenuItem.push(<MenuItem key={`standard_${key}`} value={key}>{standardLookUp[key]}</MenuItem>);
    }
    return standardMenuItem;
  };

  createBatchMenuItem = () => {
    let batchMenuItem = [];
    const batchLookUp = this.props.batchLookUp;
    for (let key of Object.keys(batchLookUp)) {
      batchMenuItem.push(<MenuItem key={`batch_${key}`} value={key}>{batchLookUp[key]}</MenuItem>);
    }
    return batchMenuItem;
  };

  handleDateChange = (date) => {
    const name = 'admissionDate';
    this.setState({admissionDate: date})
    this.props.onChange({name, value: date});
  };

  render() {
    const {errors, values, saveAcademicDetails} = this.props;
    console.log('values in academic ', values)
    return (
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <div style={this.mainGrid}>
              <Typography variant="h6" gutterBottom>
                Academic Details
              </Typography>
              <Grid container spacing={8}>
                <Grid style={this.gridStyle} container item xs={6} spacing={8}>
                  <TextField
                    required
                    autoFocus
                    style={this.textFieldStyle}
                    id="rollNo"
                    value={values['rollNo'] ? values['rollNo'] : ''}
                    name="rollNo"
                    label="Roll No."
                    onChange={(e) => this.handleChange(e)}
                    autoComplete="rno"
                    error={errors['rollNo'] ? errors['rollNo'] : false}
                  />
                </Grid>
                <Grid style={this.gridStyle} container item xs={6} spacing={8}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      required
                      disabled
                      label="Admission Date"
                      value={values['admissionDate'] ? values['admissionDate'] : ''}
                      onChange={(date) => this.handleDateChange(date)}
                      disableFuture
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid style={this.gridStyle} container item xs={6} spacing={8}>
                  <FormControl style={this.formControl}>
                    <InputLabel required htmlFor="standard">Standard</InputLabel>
                    <Select
                      value={values['standard'] ? values['standard'] : ''}
                      onChange={(e) => this.handleChange(e)}
                      required
                      style={this.textFieldStyle}
                      input={<Input required name="standard" id="standard"/>}
                      autoWidth
                      error={errors['standard'] ? errors['standard'] : false}
                    >
                      {this.createStandardMenuItem()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid style={this.gridStyle} container item xs={6} spacing={8}>
                  <FormControl style={this.formControl}>
                    <InputLabel required htmlFor="batch">Batch</InputLabel>
                    <Select
                      value={values['batch'] ? values['batch'] : ''}
                      onChange={(e) => this.handleChange(e)}
                      required
                      style={this.textFieldStyle}
                      input={<Input required name="batch" id="batch"/>}
                      autoWidth
                      error={errors['batch'] ? errors['batch'] : false}
                    >
                      {this.createBatchMenuItem()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid style={this.gridStyle} container item xs={6} spacing={8}>
                  <span style={{marginTop: 10}}>Paid Full Fees: </span>
                  <Switch
                    checked={this.state.hasPaidFees}
                    onChange={(e) => this.handleChange(e)}
                    value={values['hasPaidFees'] === "Y" ? true : false}
                    color="primary"
                    name={'hasPaidFees'}
                    label={'Paid Full Fees'}
                  />
                </Grid>
                <Grid style={this.gridStyle} container item xs={12} spacing={8}>
                  <Typography variant="body2" gutterBottom style={{color: 'red'}}>
                    (All * mark fields are mandatory!)
                  </Typography>
                </Grid>
                <Grid style={this.gridStyle} container item xs={12} spacing={8}>
                  <Button variant="contained" style={this.save} color="primary" onClick={() => saveAcademicDetails()}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
