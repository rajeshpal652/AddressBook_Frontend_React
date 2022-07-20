import deleteIcon from "../../assets/icons/delete-black-18dp.svg";
import React, { useState } from "react";
import editIcon from "../../assets/icons/create-black-18dp.svg";
import "../home/home.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AddressBookService from "../../services/addressbook-service";

const Display = (props) => {
  const [contactArray, setContactArray] = useState([]);
  const [order, setOrder] = useState("ASC");

const sorting = (column) => {
  
  if (order === "ASC") {
    const sorted = [...contactArray].sort((a, b) => 
    a[column].toLowerCase() > b[column].toLowerCase() ? 1 : -1);
    setContactArray(sorted);
    setOrder("DSC");
  }
  if (order === "DSC") {
    const sorted = [...contactArray].sort((a, b) => 
    a[column].toLowerCase() < b[column].toLowerCase() ? 1 : -1);
    setContactArray(sorted);
    setOrder("ASC");
  }
};

  // let contactArray = [];

  // const remove = (id) => {
  //     console.log("deleted id is " + id);
  //     AddressBookService.deleteContact(id);
  //     // window.location.reload();
  // }

  const remove = (personId) => {
    var answer = window.confirm(
      "Data once deleted cannot be restored!! Do you wish to continue ?"
    );
    if (answer === true) {
      AddressBookService.deleteContact(personId);
      alert("Data deleted successfully!!");
      window.location.reload();
      getAllContacts();
    } else {
      window.location.reload();
    }
  };

  let navigate = useNavigate();
  const update = (personId) => {
    navigate(`/AddressBookForm/${personId}`);
  };

  const getAllContacts = () => {
    AddressBookService.getAllContacts()
      .then((contact) => {
        console.log(contact);
        console.log("data after get", Array.from(contact.data.data));
        // setEmployeeArray({...employeeArray, employeeDataArray: emp.data.data})
        // console.log(employeeDataArray);

        // contactArray = contact.data.data;
        setContactArray(contact.data.data);
        console.log(contact.data.data);
      })

      .catch((err) => {
        console.log("err after", err);
      });
  };

  useEffect(() => {
    console.log("homepage : useEffect called");
    getAllContacts();
  }, []);

  return (
    <table id="display" className="table">
      <tbody>
        <tr>
          <th onClick={() => sorting("name")}>Fullname</th>
          <th>Address</th>
          <th onClick={() => sorting("state")}>State</th>
          <th onClick={() => sorting("city")}>City</th>
          <th>Zip Code</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
        {contactArray &&
          contactArray.map((element, ind) => (
            <tr key={`${element.personId}`}>
              <td>{element.name}</td>
              <td>{element.address}</td>
              <td>{element.state}</td>
              <td>{element.city}</td>
              <td>{element.zipCode}</td>
              <td>{element.phoneNumber}</td>
              <td>
                <img
                  onClick={() => remove(element.personId)}
                  src={deleteIcon}
                  alt="delete"
                />

                <img
                  onClick={() => update(element.personId)}
                  src={editIcon}
                  alt="edit"
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default Display;
