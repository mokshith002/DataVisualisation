import axios from "axios";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function LoginForm(props) {

  const [formData, setFormData] = useState({ username: "", password: "" });

  const URL = "http://127.0.0.1:5000";
  
  const history = useHistory();

  const submitLogin = async () => {

      const req = {
        username: formData.username,
        pwd: formData.password
      }
    
      axios.get(`${URL}/user/auth`,{params : req})
        .then(res => {
            localStorage.setItem('user_id', res.data.user_id);
            history.push('/')
          })
        .catch(err => alert(err.response.data.error_message))

  };

  function handleSubmit(event) {

    event.preventDefault();
    submitLogin();
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
        <h2>Login</h2>{" "}
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

      <button type="submit" class="btn btn-primary">
        Submit
      </button>
      <div id="emailHelp" class="form-text">
        Don't have an account? Register <Link to="/register">here</Link>.
      </div>
    </form>
  );
}
