import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import withStyles from "@material-ui/core/styles/withStyles";
import swal from "sweetalert";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  terms: {
    marginTop: theme.spacing.unit * 2
  }
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpSuccess: false,
      signUpError: false,
      registerForm: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        cPassword: ""
      },
      registerFormError: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        cPassword: ""
      }
    };
  }

  // Managing form values with state
  handleChange = name => event => {
    const registerFormError=this.state.registerFormError;
    var registerFormErrorMessages = {
      firstName: registerFormError.firstName,
      lastName: registerFormError.lastName,
      phone: registerFormError.phone,
      email: registerFormError.email,
      password: registerFormError.password,
      cPassword: registerFormError.cPassword,
    };
    var value = event.target.value ? event.target.value : "";
    this.setState(state => {
      state.registerForm[name] = value;
    },()=>{
      registerFormErrorMessages[name]=""
      this.setState({ registerFormError: registerFormErrorMessages});
    });
  };

  // Submitting signup form values to the API.
  handleSignUp(e) {
    e.preventDefault();
    const { registerForm } = this.state;
    var error = false;
    // console.log(this.state);

    var registerFormError = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      cPassword: ""
    };

    if (registerForm.firstName == "") {
      error = true;
      registerFormError.firstName = "First Name is required";
    }
    if (registerForm.lastName == "") {
      error = true;
      registerFormError.lastName = "Last Name is required";
    }

    if (registerForm.phone == "") {
      error = true;
      registerFormError.phone = "Phone Number is required";
    }

    if (registerForm.email == "") {
      error = true;
      registerFormError.email = "Email is required";
    }

    if (registerForm.password == "") {
      registerFormError.password = "Password is required";
      error = true;
    }

    if (registerForm.cPassword == "") {
      registerFormError.cPassword = "Confirm Password is required";
      error = true;
    }
    if (registerForm.password != registerForm.cPassword) {
      registerFormError.cPassword = "Both passwords do not match";
      error = true;
    }

    if (
      registerForm.firstName != "" &&
      registerForm.lastName != "" &&
      registerForm.phone != "" &&
      registerForm.email != "" &&
      registerForm.password != "" &&
      registerForm.cPassword != "" && registerForm.password == registerForm.cPassword
    ) {
      error = false;
    }

    if (error) {
      this.setState( { registerFormError: registerFormError});
    }
    else{
      var SignUpData={
        firstName  : registerForm.firstName,
        lastName : registerForm.lastName,
        phone:registerForm.phone,
        email : registerForm.email,
        password : registerForm.password
      }

   // Register API call using fetch
    fetch('/register', {
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
    const { registerFormError, registerForm } = this.state;
    console.log("HELLOOOOOOOO");
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PermIdentity />
            </Avatar>
            <Typography variant="headline">Sign Up</Typography>
            <form
              className={classes.form}
              onSubmit={e => {
                this.handleSignUp(e, this.state);
              }}
            >
              <FormControl margin="normal" required>
                <InputLabel htmlFor="fname">First Name</InputLabel>
                <Input
                  name="FirstName"
                  type="text"
                  id="fName"
                  // autoFocus
                  onChange={this.handleChange("firstName")}
                />
                <FormHelperText error>
                  {registerFormError.firstName}
                </FormHelperText>
              </FormControl>
              <FormControl margin="normal" required style={{ marginLeft: 18 }}>
                <InputLabel htmlFor="lname">Last Name</InputLabel>
                <Input
                  name="LastName"
                  type="text"
                  id="lName"
                  onChange={this.handleChange("lastName")}
                />
                <FormHelperText error>
                  {registerFormError.lastName}
                </FormHelperText>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="number">Phone Number</InputLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="number"
                  onChange={this.handleChange("phone")}
                  onInput={e => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                  min={10}
                />
                <FormHelperText error>
                  {registerFormError.phone}
                </FormHelperText>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={this.handleChange("email")}
                />
                <FormHelperText error>
                  {registerFormError.email}
                </FormHelperText>
              </FormControl>
              <FormControl margin="normal" required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  onChange={this.handleChange("password")}
                />
                <FormHelperText error>
                  {registerFormError.password}
                </FormHelperText>
              </FormControl>
              <FormControl margin="normal" required style={{ marginLeft: 18 }}>
                <InputLabel htmlFor="confirmPassword">
                  Confirm Password
                </InputLabel>
                <Input
                  name="cPassword"
                  type="password"
                  id="cPassword"
                  onChange={this.handleChange("cPassword")}
                />
                <FormHelperText error>
                  {registerFormError.cPassword}
                </FormHelperText>
              </FormControl>
              <Typography
                variant="caption"
                gutterBottom
                align="center"
                className={classes.terms}
              >
                {` By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy.`}
              </Typography>
              <Button
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                onClick={e => {
                  this.handleSignUp(e, this.state);
                }}
              >
                Sign Up
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(Signup);
