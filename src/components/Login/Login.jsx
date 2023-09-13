import { Avatar, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let user = {
    username: username,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);

    if (username === "" || password === "") {
      alert("Please provide login details.");
    } else {
      const body = JSON.stringify({ username, password });
      axios
        .post("https://fakestoreapi.com/auth/login", body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem("AccessToken", response.data.token);
            toast.success("Login successful");
            setTimeout(() => {
              navigate("/");
            }, 800);
          } else {
            toast.error("Invalid username or password");
          }
        })
        .catch((error) => {
          toast.error("An error occurred");
        });
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          margin="normal"
          required
          fullWidth
          id="username"
          label="Email Address/UserId"
          name="username"
          autoComplete="off"
          autoFocus
        />
        <TextField
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="off"
        />

        <Button
          onClick={handleSubmit}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>

        <Grid container>
          <Grid item xs>
            <Link
              onClick={() => {
                navigate("/Login");
              }}
              variant="body2"
              sx={{
                color: "blue",
                cursor: "pointer",
              }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              onClick={() => {
                navigate("/Signup");
              }}
              variant="body2"
              sx={{
                color: "blue",
                cursor: "pointer",
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Login;
