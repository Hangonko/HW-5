import React, { useState, useEffect } from "react";
import "./reset.css";
import "./App.css";
import axios from "axios";

const App = () => {
  const initValues = {
    userName: "",
    lastName: "",
    email: "",
    age: "",
    sex: "",
  };
  const [userValues, setUserValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);
  const [users, setUsers] = useState([]);

  const id = new Date().valueOf();

  useEffect(() => {
    console.log(errors);
    console.log(userValues);
  }, [errors]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3001/users");
      setUsers(data.data);
      console.log(data);
    };
    getData();
  }, []);

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
    const { data } = await axios.get("http://localhost:3001/users/");
    setUsers(data.data);
    setUserValues(initValues);
    setIsSubmited(false);
  };

  const validate = (values) => {
    const errs = {};
    if (values.userName && values.userName.length < 4) {
      errs.userName = "სახელი უნდა შეიცავდეს მინუმუ 4 ასოს";
    } else if (!values.userName) {
      errs.userName = "შეიყვანეთ თქვენი სახელი";
    }

    if (values.lastName && values.lastName.length < 4) {
      errs.lastName = "გვარი უნდა შეიცავდეს მინიმუ 4 ასოს";
    } else if (!values.lastName) {
      errs.lastName = "შეიყვანეთ თქვენი გვარი";
    }

    if (values.email && !values.email.includes("@gmail.com")) {
      errs.email = "მეილი უნდა შეიცავდეს @gmail.com";
    } else if (!values.email) {
      errs.email = "შეიყვანეთ თქვენი მეილი";
    }

    if (values.age && !(values.age >= 18)) {
      errs.age = "ასაკი უნდა აღემატებოდეს 18 წელს ";
    } else if (!values.age) {
      errs.age = "შეიყვანეთ თქვენი ასაკი";
    }

    return errs;
  };

  // const deleteUser = (id) => {
  //   setUsers((prev) => {
  //     const filterUsers = prev.filter((user) => user.id !== id);
  //     return filterUsers;
  //   });
  // };

  // const updateUser = (userID) => {
  //   setUsers((prev) => {
  //     // const findx = prev.findIndex((user) => user.userID === userID);
  //     // return newArr;
  //   });
  // };

  return (
    <>
      <form action="submit" onSubmit={handleOnSubmit}>
        <input
          name="userName"
          value={userValues.userName}
          placeholder="Username"
          onChange={handleOnChange}
          className="inputs"
        />
        <p className="errMessage">{errors.userName}</p>
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
        const { userName, lastName, email, age, sex } = user;
        return (
          <div className="users">
            <p>{userName}</p>
            <p>{lastName}</p>
            <p>{email}</p>
            <p>{age}</p>
            <p>{sex}</p>
            <button>Remove</button>
            <button>Edit</button>
          </div>
        );
      })}
    </>
  );
};

export default App;
