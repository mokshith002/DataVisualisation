import React from "react";
import { NavLink, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import logo from "../Images/bar-chart.png"

export default function NavBar() {

  const history = useHistory();

  const id = localStorage.getItem("user_id");

  const logButt = () => {
    if (id) {
      return (
        <div
          onClick={() => {
            localStorage.removeItem("user_id");
            console.log("Logging out");
            history.push('/');
          }}
        >
          Logout
        </div>
      );
    } else {
      return (
        <div
          onClick={() => {
            console.log("Logging in");
            history.push("/login");
          }}
        >
          Login
        </div>
      );
    }
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid _container">
          <div class="navbar-brand _logo col-1">
            <a class="navbar-brand" href="/" style={{ margin: "auto", fontSize: 30, marginLeft: 20  }}>
              <img src={logo} width="37" height="36" className="d-inline-block align-middle logo-img" alt=""/>
              <span
                className="logo-name d-inline-block align-middle"
                style={{marginLeft:15}}
              >
                <strong>Data Visualisation</strong>
              </span>
            </a>
          </div>

          <div
            class="collapse navbar-collapse justify-content-end _nav-container"
            id="navbarNav"
          >
            <ul class="navbar-nav link-container">
              <li class="nav-item nav-link">
                <NavLink
                  to="/history"
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    fontSize: 20,
                  }}
                >
                  {" "}
                  History{" "}
                </NavLink>
              </li>

              <li class="nav-item nav-link">
                <button
                  style={{
                    backgroundColor: "#FFFF",
                    textDecoration: "none",
                    fontSize: 20,
                    border: "none",
                  }}
                >
                  {" "}
                  {logButt()}{" "}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
