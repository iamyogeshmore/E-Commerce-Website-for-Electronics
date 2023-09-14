import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import "./Header.css";

const Header = (props) => {
  let navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
    
  return (
    <div>
      <header>
        <div className="project">
          <label
            className="projectname"
            onClick={() => {
              navigate("/");
            }}
          >
            Store
          </label>

          {localStorage.getItem("AccessToken") === null && (
            <button
              onClick={() => {
                navigate("/Signup");
              }}
              className="signUpbutton"
            >
              REGISTER
            </button>
          )}

          {localStorage.getItem("AccessToken") === null && (
            <button
              onClick={() => {
                navigate("/Login");
              }}
              className="loginbutton"
            >
              Login
            </button>
          )}

          {localStorage.getItem("AccessToken") != null && (
            <button onClick={logOutHandler} className="logOutbutton">
              Logout
            </button>
          )}

          {localStorage.getItem("AccessToken") != null && (
            <IconButton
              onClick={() => {
                navigate("/Cart");
              }}
              className="projectcart"
            >
              <text>Cart </text>
              <ShoppingCartIcon style={{ fontSize: "15px" }} />
              {""}
            </IconButton>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
