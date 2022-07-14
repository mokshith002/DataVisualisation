import axios from "axios";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function RegisterForm(props) {
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });

  const history = useHistory();

  const URL = "http://127.0.0.1:5000";

  const submitRegister = async () => {
    axios.post(`${URL}/user/auth`, {username: formData.username, pwd: formData.password})
      .then(res => history.push('/login'))
      .catch(err => alert(err.response.data.error_message))
  };

  function handleSubmit(event) {
    event.preventDefault();
    
    if(formData.confirmPassword !== formData.password)
        alert("Passwords don't match")
    
    else
        submitRegister();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="row">
        {" "}
        <h2>Register</h2>{" "}
      </div>
      <div class="mb-3">
        <label for="inputEmail1" class="form-label">
          Username
        </label>
        <input
          type="text"
          class="form-control"
          id="logMail"
          aria-describedby="emailHelp"
          value={formData.username}
          name="username"
          onChange={handleChange}
          required
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="logPass"
          value={formData.password}
          name="password"
          onChange={handleChange}
          required
        />
      </div>
      
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          class="form-control"
          id="logPass"
          value={formData.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Submit
      </button>
      <div id="emailHelp" class="form-text">
        Have an account? Login <Link to="/login">here</Link>.
      </div>
    </form>
  );
}
