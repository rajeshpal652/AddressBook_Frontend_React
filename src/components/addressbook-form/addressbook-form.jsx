import "../addressbook-form/addressbook-form.css";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/contact_logo.png";
import cross from "../../assets/cross.png";
import { useState, useEffect } from "react";
import AddressBookService from "../../services/addressbook-service";
import states from "../../assets/states";

const AddressBookForm = (props) => {

  let initialValue = {
    name: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    id: "",
    isUpdate: false,
    error: {
      phoneNumber: "",
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    }
  };
  const [formValue, setForm] = useState(initialValue);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getDataById(params.id);
    }
  }, []);

  useEffect(() => {
    setState(states);
    console.log(state);
  }, []);

  const handleState = (event) => {
    const citiesOfState = states.find(
      (state) => state.name === event.target.value
    ).city;
    setCity(citiesOfState);
    changeValue(event);
  };

  const getDataById = (id) => {
    AddressBookService.getContact(id)
      .then((data) => {
        let object = data.data.data;
        setData(object);
      })
      .catch((err) => {
        alert("err is ", err);
      });
  };

  const changeValue = (event) => {
    console.log("Event in change Value  :  " + event.target.name);
    setForm({ ...formValue, [event.target.name]: event.target.value });
  };

  const setData = (object) => {
    const citiesOfState = states.find(
      (state) => state.name === object.state
    ).city;
    setCity(citiesOfState);
    setForm({
      ...formValue,
      id: object.personId,
      name: object.name,
      address: object.address,
      state: object.state,
      city: object.city,
      zipCode: object.zipCode,
      phoneNumber: object.phoneNumber,
      isUpdate: true,
    });
  };

  // const validData = async () => {
  //     let isError = false;
  //     let error = {
  //         phoneNumber: '',
  //         name: '',
  //         address: '',
  //         city: '',
  //         state: '',
  //         zipCode: ''

  //     }
  //     const regName = /^[A-Z]{1}[A-Za-z]{2,}([\s]?([a-zA-Z]+))*$/
  //     if (formValue.name.length < 1 || !regName.test(formValue.name)) {
  //         error.name = 'name is wrong'
  //         isError = true;
  //     }
  //     const regPhoneNumber = /^[+]?([0-9]{2})?[789]{1}[0-9]{9}$/
  //     if (formValue.phoneNumber.length < 1 || !regPhoneNumber.test(formValue.phoneNumber)) {
  //         error.phoneNumber = 'phone Number is wrong'
  //         isError = true;
  //     }
  //     const regAddress = /^[a-zA-Z0-9]{3,}([\s]?[a-zA-Z0-9]{3,})*$/
  //     if (formValue.address.length < 1 || !regAddress.test(formValue.address)) {
  //         error.address = 'address is required'
  //         isError = true;
  //     }
  //     const regZip = /^[0-9]{3}[\s]?[0-9]{3}$/
  //     if (formValue.zipCode.length < 1 || !regZip.test(formValue.zipCode)) {
  //         error.zipCode = 'zipcode is required'
  //         isError = true;
  //     }

  //     if (formValue.city.length < 1) {
  //         error.city = 'city is required'
  //         isError = true;
  //     }
  //     if (formValue.state.length < 1) {
  //         error.state = 'state is required'
  //         isError = true;
  //     }

  //     await setForm({ ...formValue, error: error })
  //     return isError;
  // }

  const save = async (event) => {
    event.preventDefault();

    let object = {
      name: formValue.name,
      address: formValue.address,
      city: formValue.city,
      state: formValue.state,
      zipCode: formValue.zipCode,
      phoneNumber: formValue.phoneNumber,
    };

    if (formValue.isUpdate) {
      AddressBookService.updateContact(object, params.id)
        .then((data) => {
          var answer = window.confirm(
            "Data once modified cannot be restored!! Do you wish to continue?",
            data
          );
          if (answer === true) {
            alert("Data updated successfully!");
            console.log(data);
            reset();
          } else {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log("WARNING!! Error updating the data!", error);
        });
    } else {
      AddressBookService.addContact(object)
        .then((response) => {
          console.log(response);
          alert("Data Added successfully!!", response);
          reset();
        })
        .catch((error) => {
          console.log(error);
          alert("WARNING!! Error while adding the data!");
        });
    }
  };

  const reset = () => {
    console.log("Formvalue id in reset function" + formValue.id);
    setForm({
      ...initialValue,
      // id: formValue.id
      // isUpdate: formValue.isUpdate,
    });
    
    
  };

  return (
    <div>
      <header className="header-content header">
        <div className="logo-content">
          <img src={logo} alt="address-book-logo" />
          <div>
            <span className="address-text">ADDRESS</span>
            <br />
            <span className="address-text address-book">BOOK</span>
          </div>
        </div>
      </header>

      <div className="form-content">
        <form className="form" action="#" onSubmit={save}>
          <div className="form-head">
            <h1 className="form-head-title">Person Address Form</h1>
            <Link to="/home" class="close-button">
              <img src={cross} />
            </Link>
          </div>
          <div className="row-content">
            <label className="label text" htmlFor="name">
              Full Name
            </label>
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              value={formValue.name}
              onChange={changeValue}
              autocomplete="disable"
              required
            />
            <div className="error" id="name-error">
              {formValue.error.name}
            </div>
          </div>
          <div className="row-content">
            <label className="label text" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="input"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formValue.phoneNumber}
              onChange={changeValue}
              autocomplete="disable"
              required
            />
            <div className="error" id="phoneNumber-error">
              {formValue.error.phoneNumber}
            </div>
          </div>
          <div className="row-content">
            <div className="text-row">
              <label className="label text" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                className="input"
                name="address"
                value={formValue.address}
                onChange={changeValue}
                placeholder=""
                style={{ height: "100px" }}
                autocomplete="disable"
              ></textarea>
              <div className="error" id="address-error">
                {formValue.error.address}
              </div>
            </div>
          </div>
          <div className="row-content location-row">
            <div className="state-row">
              <label className="label text" htmlFor="state">
                State
              </label>
              <select
                id="state"
                value={formValue.state}
                onChange={(event) => handleState(event)}
                name="state"
              >
                <option value="0">Select State</option>
                {state && state !== undefined
                  ? state.map((states, index) => {
                      return (
                        <option key={index} value={states.name}>
                          {states.name}
                        </option>
                      );
                    })
                  : "No State"}
              </select>
              <div className="error" id="zip-error">
                {formValue.error.state}
              </div>
            </div>

            <div>
              <label className="label text" htmlFor="city">
                City
              </label>
              <select
                id="city"
                value={formValue.city}
                onChange={changeValue}
                name="city"
              >
                <option value="0">Select City</option>
                {city && city !== undefined
                  ? city.map((cities, index) => {
                      return (
                        <option key={index} value={cities}>
                          {cities}
                        </option>
                      );
                    })
                  : "No City"}
              </select>
              <div className="error" id="zip-error">
                {formValue.error.city}
              </div>
            </div>

            <div>
              <label className="label text" htmlFor="zip">
                Zipcode
              </label>
              <input
                className="input"
                type="text"
                id="zip"
                name="zipCode"
                value={formValue.zipCode}
                onChange={changeValue}
                required
                autocomplete="disable"
              />
              <div className="error" id="zip-error">
                {formValue.error.zipCode}
              </div>
            </div>
          </div>
          <div className="buttonParent">
            <div className="submit-reset">
              <button
                type="submit"
                class="button submitButton"
                id="submitButton"
                onClick={save}
              >
                {formValue.isUpdate ? "Update" : "Submit"}
              </button>
              <button
                type="reset"
                class="resetButton button"
                id="resetButton"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddressBookForm;
