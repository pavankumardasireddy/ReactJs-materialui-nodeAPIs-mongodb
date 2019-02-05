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

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInForm: {
        email: "",
        password: ""
      }
    };
  }

  // Managing form values with state
  handleChange = name => event => {
    var value = event.target.value ? event.target.value : "";
    this.setState(state => {
      state.signInForm[name] = value;
    });
  };

  // Submitting signup form values to the API.
  handleSignIn(e) {
    e.preventDefault();
    const { signInForm } = this.state;

    if (
      signInForm.email != "" &&
      signInForm.password != ""
    ) {
      var SignInData={
        email : signInForm.email,
        password : signInForm.password
      }

   // Register API call using fetch
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(SignInData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
     .then((response)=>response.json())
      .then((data)=>{
        if(data.status=="success"){
          swal("", "You've loggedin successfully!", "success")
          window.location.reload()
        }else{
          swal("",data.message, "error")
        }
        
      })
      .catch((error)=>{
        console.log("Error, with message::",error)
      });
    }else{
      swal("","Invalid Credentials","error")
    }
  }
  render() {
    const { classes } = this.props;
    const { signInForm } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PermIdentity />
            </Avatar>
            <Typography variant="headline">Sign In</Typography>
            <form
              className={classes.form}
              onSubmit={e => {
                this.handleSignIn(e, this.state);
              }}
            >    
              
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={this.handleChange("email")}
                />
               
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  onChange={this.handleChange("password")}
                />
              </FormControl>
             
              <Typography
                variant="caption"
                gutterBottom
                align="center"
                className={classes.terms}
              >
                {` By clicking Sign In, you agree to our Terms, Data Policy and Cookie Policy.`}
              </Typography>
              <Button
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                onClick={e => {
                  this.handleSignIn(e, this.state);
                }}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(Signin);
