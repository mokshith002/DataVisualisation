import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
export default function Login(props) {
  return (
    <div
      class="d-flex p-3 justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <RegisterForm />
    </div>
  );
}
