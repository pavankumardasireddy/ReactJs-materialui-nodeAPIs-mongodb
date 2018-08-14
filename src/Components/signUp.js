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
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

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
        },
        regFormError: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          cPassword: ""
        }
    };
  }

  handleChange = name => event => {
    var value = event.target.value ? event.target.value : ''
    this.setState((state) => { state.regForm[name]= value });
  };
  handleSignUp(e, data) {
    e.preventDefault();
    var error = false;
    console.log("D@tA: ",data);
    if(data) {
      var regFormError = {  firstName: "", lastName: "", phone: "", email: "",  password: "", cPassword: ""};
    }
    data.regForm.firstName=="" ? alert("firstName is required") : ''
    data.regForm.lastName=="" ? alert("lastName is required") : ''
    data.regForm.phone=="" ? alert("phone is required") : ''
    data.regForm.email=="" ? alert("email is required") : ''
    data.regForm.password=="" ? alert("password is required") : ''
    data.regForm.cPassword=="" ? alert("cPassword is required") : ''

    
    if(this.state.regForm.firstName!='' &&this.state.regForm.lastName!='' && this.state.regForm.phone != "" && this.state.regForm.email != ""&& this.state.regForm.password != ""&&this.state.regForm.cPassword != ""){
      var SignUpData={
        firstName  : this.state.regForm.firstName,
        lastName : this.state.regForm.lastName,
        phone:this.state.regForm.phone,
        email : this.state.regForm.email,
        password : this.state.regForm.password,
        cPassword : this.state.regForm.cPassword 
      }
      fetch('http://localhost:5000/register', {
        mode: 'no-cors',
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: SignUpData
       })
       .then((response)=>response.json())
        .then((data)=>{
          console.log("success::::::",data)
        })
        .catch((error)=>{
          console.log("error::::::",error)
        });
    }

  //   // dynamic data
  //   if (this.state.userType !== "INSPECTOR") {
  //     
  //   }else {
  //     var data={
  //       type:this.state.userType,
  //       firstName  : this.state.registerForm.firstName,
  //       lastName : this.state.registerForm.lastName,
  //       email : this.state.registerForm.email,
  //       password : this.state.registerForm.password,
  //       code:this.state.registerForm.countryCode,
  //       phone:this.state.registerForm.phone,
  //       company:this.state.registerForm.inspectorCompanyName,
  //       employmentType:this.state.employmentType.value,
  //       qualification:this.state.qualification.value,
  //       title:this.state.title.value,
  //       city: this.state.registerForm.inspectorCity,
  //       country:this.state.inspectorCountry.value,
  //       postalCode:this.state.registerForm.inspectorPostalCode
  //    }
  //   }

  //   if(error) {
  //     //alert("error")
  //     this.setState( (state) => { state.registerFormError = registerFormError; state.signUpSuccess = false;});
  //     return;
  //   }else{
  //     //console.log("$!GN UP: "+JSON.stringify(data))
  //     this.props.registerMe(data);
  //  }
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