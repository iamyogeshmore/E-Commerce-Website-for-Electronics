import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, CssBaseline, Grid, Link, TextField, Typography,} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./SignUp.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState(0);


  let user = {
      email:email,
      username: username,
      password:password,
      name:{
          firstname: firstName,
          lastname: lastName
      },
      address:{
          city: city,
          street:street,
          number: number,
          zipcode:zipcode,
          geolocation:{
              lat:'-37.3159',
              long:'81.1496'
          }
      },
      phone: phone
  }

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify(user)
    axios.post("https://fakestoreapi.com/users", body, {headers: {
        'Content-Type': 'application/json',
      }})
       .then((responce) => {
        if (responce.status == 200) {
            toast.success("Register successfully");
        setTimeout(() => { navigate("/Login"); }, 3000);
        } else {
            toast.error("please fill all details");
        }
        })
        .catch((error) => { toast.error(error.response.data); })
    };

return (
  <Container component= "main" maxWidth="md">
      <CssBaseline/>
      <Box
          sx={{
              marginTop: 4,
              display:"flex",
              flexDirection:"column",
              alignItems:"center"

          }}
      >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
              Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={1}>
                  <Grid item xs={12}>
                      <TextField
                          onChange={(event) => {setFirstName(event.target.value)}}
                          required
                          fullWidth
                          id="FirstName"
                          label="First Name"
                          name="firstName"
                          autoComplete="off"
                      />
                  </Grid>

                  <Grid item xs={12}>
                      <TextField
                          onChange={(event) => {setLastName(event.target.value)}}
                          required
                          fullWidth
                          id="LastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="off"
                      />
                  </Grid>

                  <Grid item xs={6}>
                      <TextField
                          onChange={(event) => {setEmail(event.target.value)}}
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="off"
                      />
                  </Grid>

                  <Grid item xs={6}>
                      <TextField
                          onChange={(event) => {setUsername(event.target.value)}}
                          required
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          autoComplete="off"
                      />
                  </Grid>

                  <Grid item xs={6}>
                      <TextField
                          onChange={(event) => {setStreet(event.target.value)}}
                          required
                          fullWidth
                          id="street"
                          label="Address"
                          name="street"
                          autoComplete="off"
                      />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <TextField
                          onChange={(event) => {setNumber(event.target.value)}}
                          required
                          fullWidth
                          id="number"
                          label="Room Number"
                          name="number"
                          autoComplete="off"
                      />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <TextField
                          onChange={(event) => {setZipcode(event.target.value)}}
                          autoComplete="off"
                          name="zipcode"
                          required
                          fullWidth
                          id="zipcode"
                          label="Pin Code"
                          autoFocus
                      />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <TextField
                         onChange={(event) => {setCity(event.target.value)}}
                          required
                          fullWidth
                          id="city"
                          label="City"
                          name="city"
                          autoComplete="off"
                      />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                      <TextField
                          onChange={(event) => {setPhone(event.target.value)}}
                          fullWidth
                          id="phone"
                          label="Mobile Number"
                          name="phone"
                          autoComplete="off"
                      />
                  </Grid>

                  <Grid item xs={12}>
                      <TextField
                          onChange={(event) => {setPassword(event.target.value)}}
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                      />
                  </Grid>
              </Grid>

              <Button
                  onClick={handleSubmit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                  Sign Up
              </Button>

              <Grid Container justifyContent= "flex-end">
                  <Grid item>
                      <Link onClick={ () => { navigate("/Login") }} variant="body2">
                          Already have an account? Sign in
                      </Link>
                  </Grid>
              </Grid>
          </Box>
          <ToastContainer autoClose={2000} />
      </Box>
  </Container>
  );
}

export default SignUp;
