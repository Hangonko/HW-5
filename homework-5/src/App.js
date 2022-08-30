import React, { useState, useEffect } from "react";
import "./reset.css";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");

  const [users, setUsers] = useState([]);

  const id = new Date().valueOf();

  const user = (preValue) => {
    return [
      ...preValue,
      {
        name: name,
        lastName: lastName,
        email: email,
        age: age,
        sex: sex,
        id: id,
      },
    ];
  };

  const addUser = (e) => {
    setUsers(user);
    e.preventDefault();
    setName("");
    setLastName("");
    setEmail("");
    setAge("");
    setSex("");
  };
  console.log(users);

  const deleteUser = (id) => {
    setUsers((prev) => {
      const filterUsers = prev.filter((user) => user.id !== id);
      return filterUsers;
    });
  };

  const updateUser = (userID) => {
    setUsers((prev) => {
      // const findx = prev.findIndex((user) => user.userID === userID);
      // return newArr;
    });
  };

  return (
    <>
      <form action="submit" onSubmit={addUser}>
        <input
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
            console.log(e.target.value);
          }}
          className="inputs"
        />
        <input
          value={lastName}
          placeholder="LastName"
          onChange={(e) => {
            setLastName(e.target.value);
            console.log(e.target.value);
          }}
          className="inputs"
        />
        <input
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(e.target.value);
          }}
          className="inputs"
        />
        <input
          value={age}
          placeholder="Age"
          onChange={(e) => {
            setAge(e.target.value);
            console.log(e.target.value);
          }}
          className="inputs"
        />
        <select
          defaultValue={"Choose"}
          className="select"
          onChange={(e) => {
            setSex(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="Choose">Choose</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button className="button">Add</button>
      </form>
      {users.map((user) => {
        const { name, lastName, email, age, sex, id } = user;
        return (
          <div className="users" key={id}>
            <p>{name}</p>
            <p>{lastName}</p>
            <p>{email}</p>
            <p>{age}</p>
            <p>{sex}</p>
            <button
              onClick={() => {
                deleteUser(id);
              }}
            >
              Remove
            </button>
            <button
              onClick={() => {
                updateUser(id);
              }}
            >
              Edit
            </button>
            {console.log(id)}
          </div>
        );
      })}
    </>
  );
};

export default App;
