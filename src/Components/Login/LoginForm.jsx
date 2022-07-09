import axios from "axios";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function LoginForm(props) {

  const [formData, setFormData] = useState({ email: "", password: "" });

  const hisotry = useHistory();

  const submitLogin = async () => {
    //TODO: Add Backend Call to validate user
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
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="logMail"
          aria-describedby="emailHelp"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
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
