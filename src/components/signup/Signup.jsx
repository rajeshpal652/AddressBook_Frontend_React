import React from "react";
import { Button, TextField } from "@mui/material";
import "./signup.scss";
import UserService from "../../services/UserService";

function Signup() {
  const [fields, setFields] = React.useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",

    firstNameError: "",
    lastNameError: "",
    emailIdError: "",
    passwordError: "",
  });

  const changevalues = (e) => {
    setFields((previousvalues) => {
      return { ...previousvalues, [e.target.name]: e.target.value };
    });
  };
  const validate = () => {
    const firstNameError = fields.firstName === "" ? true : false;
    const lastNameError = fields.lastName === "" ? true : false;
    const emailIdError = fields.emailId === "" ? true : false;
    const passwordError = fields.password === "" ? true : false;
    setFields((previousvalues) => {
      return {
        ...previousvalues,
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        emailIdError: emailIdError,
        passwordError: passwordError,
      };
    });
    return firstNameError || lastNameError || emailIdError || passwordError;
  };
  const signup = () => {
    let isValidate = validate();
    if (!isValidate) {
      let data = {
        firstName: fields.firstName,
        lastName: fields.lastName,
        emailId: fields.emailId,
        password: fields.password,
      };
      UserService.signup(data)
        .then(() => {
          console.log(data);
          console.log("success");
        })
        .catch((err) => {
          console.log("fail");
        });
    }
  };
  return (
    <>
      <div className="signup">
        <div className="firstName">
          <TextField
            name="firstName"
            style={{ width: "232px" }}
            size="small"
            type="text"
            variant="outlined"
            label="First Name"
            onChange={(e) => {
              changevalues(e);
            }}
            error={fields.firstNameError}
          />
        </div>
        <div className="lastName">
          <TextField
            name="lastName"
            style={{ width: "232px" }}
            size="small"
            type="text"
            variant="outlined"
            label="Last Name"
            onChange={(e) => {
              changevalues(e);
            }}
            error={fields.lastNameError}
          />
        </div>
        <div className="emailInput">
          <TextField
            name="emailId"
            style={{ width: "232px" }}
            size="small"
            type="email"
            variant="outlined"
            label="Email Id"
            onChange={(e) => {
              changevalues(e);
            }}
            error={fields.emailIdError}
          />
        </div>
        <div className="password">
          <TextField
            name="password"
            style={{ width: "232px" }}
            size="small"
            type="password"
            variant="outlined"
            label="Password"
            onChange={(e) => {
              changevalues(e);
            }}
            error={fields.passwordError}
          />
        </div>

        <div>
          {" "}
          <Button
            className="signupButton"
            style={{ backgroundColor: "#A03037" }}
            onClick={() => signup()}
          >
            {" "}
            SignUp{" "}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Signup;
