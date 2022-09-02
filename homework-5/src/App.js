import React, { useState, useEffect } from "react";
import "./reset.css";
import "./App.css";
import axios from "axios";

const App = () => {
  const initValues = {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    sex: "",
  };
  const [userValues, setUserValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);
  const [users, setUsers] = useState([]);
  const [formValid, isFormValid] = useState(false);

  const id = new Date().valueOf();

  useEffect(() => {
    console.log(errors);
    console.log(userValues);
  }, [errors]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
    console.log(userValues);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(userValues));
    if (isSubmited) {
      await axios.put(
        `http://localhost:3001/users/${userValues.id}`,
        userValues
      );
    } else {
      await axios.post("http://localhost:3001/users/", userValues);
    }
    const { data } = await axios.get("http://localhost:3001/users");
    setUsers((prev) => {
      return [...prev, { ...userValues }];
    });
    setUsers(data.data);
    setUserValues(initValues);
    setIsSubmited(false);
    formValid(true);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3001/users");
      setUsers(data.data);
      console.log(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const ValidResults = validate(userValues);
    setErrors(ValidResults);
    if (
      userValues.firstName &&
      !ValidResults.firstName &&
      userValues.lastName &&
      !ValidResults.lastName &&
      userValues.age &&
      !ValidResults.age &&
      userValues.email &&
      !ValidResults.email
    ) {
      isFormValid(true);
    } else {
      isFormValid(false);
    }
  }, [userValues]);

  const validate = (values) => {
    const errs = {};
    if (values.firstName && values.firstName.length < 4) {
      errs.firstName = "სახელი უნდა შეიცავდეს მინუმუ 4 ასოს";
    }

    if (values.lastName && values.lastName.length < 4) {
      errs.lastName = "გვარი უნდა შეიცავდეს მინიმუ 4 ასოს";
    }

    if (values.email && !values.email.includes("@gmail.com")) {
      errs.email = "მეილი უნდა შეიცავდეს @gmail.com";
    }

    if (values.age && !(values.age >= 18)) {
      errs.age = "ასაკი უნდა აღემატებოდეს 18 წელს ";
    }

    return errs;
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    const { data } = await axios.get("http://localhost:3001/users");
    setUsers(data.data);
    console.log("data", data);
  };

  const updateUser = (id) => {
    const user = users.find((user) => user._id === id);
    setUserValues({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      sex: user.sex,
      id: id,
    });
  };

  return (
    <>
      <pre>{JSON.stringify(userValues, undefined, 2)}</pre>
      <form action="submit" onSubmit={handleOnSubmit}>
        <input
          name="firstName"
          value={userValues.firstName}
          placeholder="firstName"
          onChange={handleOnChange}
          className="inputs"
        />
        <p className="errMessage">{errors.firstName}</p>
        <input
          name="lastName"
          value={userValues.lastName}
          placeholder="LastName"
          onChange={handleOnChange}
          className="inputs"
        />
        <p className="errMessage">{errors.lastName}</p>
        <input
          name="email"
          value={userValues.email}
          placeholder="Email"
          onChange={handleOnChange}
          className="inputs"
        />
        <p className="errMessage">{errors.email}</p>
        <input
          name="age"
          value={userValues.age}
          placeholder="Age"
          onChange={handleOnChange}
          className="inputs"
        />
        <p className="errMessage">{errors.age}</p>
        <select
          name="sex"
          defaultValue={"Choose"}
          className="select"
          value={userValues.sex}
          onChange={handleOnChange}
        >
          <option value="Choose">Choose</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button className="button">Add</button>
      </form>
      {users.map((user) => {
        const { firstName, lastName, email, age, sex } = user;
        return (
          <div className="users" key={user._id}>
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>{email}</p>
            <p>{age}</p>
            <p>{sex}</p>
            <button
              onClick={() => {
                deleteUser(user._id);
              }}
            >
              Remove
            </button>
            <button
              onClick={() => {
                updateUser(user._id);
              }}
            >
              Edit
            </button>
          </div>
        );
      })}
    </>
  );
};

export default App;
