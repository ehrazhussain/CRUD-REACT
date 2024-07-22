import { useEffect, useState } from "react";
import "./App.css";
import { EmployeeData } from "./EmployeeData";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const newData = data.filter((item) => item.id === id);
    if (newData !== undefined) {
      setIsUpdate(true);
      setFirstName(newData[0].firstName);
      setLastName(newData[0].lastName);
      setAge(newData[0].age);
      setId(id);
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    }
  };
  const handleSave = (e) => {
    let Error = "";
    if (firstName === "") {
      Error = "Please Enter First Name";
    } else if (lastName === "") {
      Error = "Please Enter Last Name";
    } else if (age === 0) {
      Error = "Please Enter Age";
    }
    if (Error !== "") {
      alert(Error);
      return;
    }
    if (Error === "") {
      e.preventDefault;
      if (window.confirm("Are you sure you want to save?")) {
        const newData = [...data];
        const newItem = {
          id: EmployeeData.length + 1,
          firstName: firstName,
          lastName: lastName,
          age: age,
        };
        newData.push(newItem);
        setData(newData);
      }
    } else {
      alert(Error);
    }
  };

  const handleUpdate = () => {
    if (window.confirm("Are you sure you want to update?")) {
      const index = data.map((item) => item.id).indexOf(id);
      const newData = [...data];
      newData[index].firstName = firstName;
      newData[index].lastName = lastName;
      newData[index].age = age;
      setData(newData);
      handleClear();
    }
  };

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setAge(0);
    setId(0);
    setIsUpdate(false);
  };

  return (
    <div className="App">
      <div
        style={{
          fontFamily: "Open Sans",
          display: "flex",
          justifyContent: "center",
          margin: "10px",
          gap: "10px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <div>
          <label htmlFor="FirstName">
            {" "}
            First Name:
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              placeholder="Enter First Name"
              name=""
              id=""
            />
          </label>
        </div>
        <div>
          <label htmlFor="FirstName">
            {" "}
            Last Name:
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              placeholder="Enter Last Name"
              name=""
              id=""
            />
          </label>
        </div>
        <div>
          <label htmlFor="FirstName">
            {" "}
            Age:
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              type="number"
              placeholder="Enter Age"
              name=""
              id=""
            />
          </label>
        </div>
        <div>
          {!isUpdate ? (
            <button className="btn btn-primary" onClick={(e) => handleSave(e)}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Update
            </button>
          )}

          <button className="btn btn-danger" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <td>SerialNo.</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
