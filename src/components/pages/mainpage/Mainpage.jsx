import React from "react";
import "./Mainpage.scss";
import logo from "../../../assets/addressbook_logo.jpg";
import Login from "../../login/login";
import Signup from "../../signup/Signup";

function Mainpage() {
  const [options, setOptions] = React.useState(false);
  const loginOptions = () => {
    setOptions(true);
  };
  const signupOptions = () => {
    setOptions(false);
  };

  return (
    <div>
      <div className="home-container">
        <div className="left-image">
          <img className="mainLogo" src={logo} alt="this is logo"></img>
          <div className="logoname">ADDRESS BOOK</div>
          <div className="loginsignin">
            <div className="login" onClick={loginOptions}>
              LOGIN
            </div>
            <div className="signup" onClick={signupOptions}>
              SIGNUP
            </div>
            <div className="loginsignincomponents">
              {options ? <Login /> : <Signup />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
