import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Paper from '@material-ui/core/Paper';
import {Typography, TextField} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import swal from 'sweetalert';

// Form styles
const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  terms: {
    marginTop: theme.spacing.unit * 2,
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        regForm: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          cPassword: ""
        }
    };
  }

  // Manging form values with state
  handleChange = name => event => {
    var value = event.target.value ? event.target.value : ''
    this.setState((state) => { state.regForm[name]= value });
  };

  // Submitting signup form values to the API.
  handleSignUp(e, data) {
    e.preventDefault();

    // Checking each value, if empty then showing the alert message.
    data.regForm.firstName=="" ? swal("First Name is required") : ''
    data.regForm.lastName=="" ? swal("Last Name is required") : ''
    data.regForm.phone=="" ? swal("Phone is required") : ''
    data.regForm.email=="" ? swal("Email Address is required") : ''
    data.regForm.password=="" ? swal("Password is required") : ''
    data.regForm.cPassword=="" ? swal("Confirm Password is required") : ''
    {
      (data.regForm.password!=="" && data.regForm.cPassword!=="") ? ( (data.regForm.password !== data.regForm.cPassword)?(
        swal("Password and confirm password should be the same.")
      ):(null)) :(null)
    }

    //Checking for the form values are filled or not if filled then passing data to the API
    if(this.state.regForm.firstName!=='' &&this.state.regForm.lastName!=='' && this.state.regForm.phone !== "" && this.state.regForm.email !== ""&& this.state.regForm.password !== ""&&this.state.regForm.cPassword !== "" && this.state.regForm.password === this.state.regForm.cPassword){
      var SignUpData={
        firstName  : this.state.regForm.firstName,
        lastName : this.state.regForm.lastName,
        phone:this.state.regForm.phone,
        email : this.state.regForm.email,
        password : this.state.regForm.password 
      }

      // Register API call using fetch
      fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify(SignUpData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
       .then((response)=>response.json())
        .then((data)=>{
          swal("Success!", "You've registered successfully!", "success")
          .then((value) => {
            window.location.reload()
          });
        })
        .catch((error)=>{
          console.log("Error, with message::",error)
        });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PermIdentity />
            </Avatar>
            <Typography variant="headline">Sign Up</Typography>
            <form className={classes.form} onSubmit={(e)=>{this.handleSignUp(e, this.state)}}>
            <FormControl margin="normal" required >
                <InputLabel htmlFor="fname">First Name</InputLabel>
                <Input
                  name="FirstName"
                  type="text"
                  id="fName"
                  // autoFocus
                  onChange={this.handleChange('firstName')}
                />
              </FormControl>
              <FormControl margin="normal" required style={{marginLeft:18}}>
                <InputLabel htmlFor="lname">Last Name</InputLabel>
                <Input
                  name="LastName"
                  type="text"
                  id="lName"
                  onChange={this.handleChange('lastName')}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="number">Phone Number</InputLabel>
                <Input 
                  id="phone" 
                  name="phone"
                  type="number"
                  onChange={this.handleChange('phone')}
                  onInput={(e)=>{
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                }}
                min={10}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input 
                  id="email" 
                  name="email" 
                  autoComplete="email"
                  type="email"
                  onChange={this.handleChange('email')}
                />
              </FormControl>
              <FormControl margin="normal" required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  onChange={this.handleChange('password')}
                />
              </FormControl>
              <FormControl margin="normal" required style={{marginLeft:18}}>
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <Input
                  name="cPassword"
                  type="password"
                  id="cPassword"
                  onChange={this.handleChange('cPassword')}                  
                />
              </FormControl>
              <Typography variant="caption" gutterBottom align="center" className={classes.terms}>
                {` By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy.`}
              </Typography>
              <Button
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                onClick={(e)=>{this.handleSignUp(e, this.state)}}>Sign Up
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);