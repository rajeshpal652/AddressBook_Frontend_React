import "../home/home.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Display from "../display/display";
import logo from "../../assets/contact_logo.png";
import addPerson from "../../assets/add_person.png";
import { useEffect } from "react";
import AddressBookService from "../../services/addressbook-service";
import logout from "../../assets/logout.png";

const Home = (props) => {
  const [contactArray, setContactArray] = useState([]);

  useEffect(() => {
    console.log("homepage");
    getAllContacts();
  }, []);

  const getAllContacts = () => {
    AddressBookService.getAllContacts()
      .then((contact) => {
        console.log(contact.data.data);
        setContactArray(contact.data.data);
      })
      .catch((err) => {
        console.log("err after", err);
      });
  };

  return (
    <div>
      <header className="header-content header">
        <div class="logo-content">
          <img src={logo} alt="logo" />
          <div>
            <span className="address-text">ADDRESS</span>
            <br />
            <span className="address-text address-book">BOOK</span>
          </div>
        </div>
        <div className="logout">
          <Link to={"/"}>
            <img id="logout" src={logout} alt="logout_logo" />
          </Link>
        </div>
      </header>
      <div className="main-content">
        <div className="header-content">
          <div className="address-detail-text">
            Person Details
            <div className="address-count">{contactArray.length}</div>
          </div>
          <Link to="/addcontact" className="add-button">
            <img src={addPerson} alt="" />
          </Link>
        </div>
        <div className="table-main">
          <Display contactArray={contactArray} />
        </div>
      </div>
    </div>
  );
};
export default Home;
