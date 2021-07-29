import React from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./../utils/context";

const SearchCustomer = () => {
  const user = useContext(UserContext);
  const [state, setState] = useState({
    email: "",
    phone: "",
    show: true,
    data: {},
    error: false,
  });

  const paperStyle = {
    flexGrow: 1,
    flexDirection: "column",
    padding: 20,
    height: "50vh",
    width: "100%",
    margin: "20px auto",
  };

  const handleChange = (input) => (e) => {
    setState({ ...state, [input]: e.target.value });
  };

  const handleClick = () => {
    const searchData = {
      email: state.email,
      phone: state.phone,
    };
    axios
      .get(
        `http://localhost:5000/appointment?email=${state.email}&phone=${state.phone}`
      )
      .then((data) => {
        if (data.data.status === "success") {
          setState({ ...state, data: data.data.data, show: false });
        } else setState({ ...state, error: true });
      });
  };

  const BackHome = () => {
    user.dispatch({ type: "REQUEST_APPOINTMENT", payload: "home" });
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ background: "#131313" }}>
          <h1 style={{ fontFamily: "fantasy", margin: "10px", color: "#fff" }}>
            Efi Mechanic Appointments
          </h1>
          <NavLink
            to="/"
            onClick={BackHome}
            style={{ textDecoration: "none", margin: "10px" }}
          >
            <Button
              variant="outlined"
              color="primary"
              style={{ align: "flex-end", padding: "20px", margin: "10px" }}
            >
              Back to home page
            </Button>
          </NavLink>
        </Grid>
        {state.show && (
          <Grid item xs={12}>
            <Paper elevation={10} style={paperStyle}>
              <h2>Search For Appointments</h2>

              <TextField
                defaultValue={state.email}
                onChange={handleChange("email")}
                label="Enter Email"
              />
              <br />
              <TextField
                defaultValue={state.phone}
                onChange={handleChange("phone")}
                label="Enter Phone"
              />
              {state.error && (
                <div style={{ color: "red" }}>
                  ther is no appointment with this email or phone
                </div>
              )}
              <br />
              <br />
              <Button variant="outlined" color="primary" onClick={handleClick}>
                search
              </Button>
            </Paper>
          </Grid>
        )}
        {!state.show && (
          <div style={{ padding: "20px" }}>
            <h2>Appointment Schedule</h2>
            <p>
              Full Name: {state.data.firstName} {state.data.lastName}
            </p>
            Email: <p>{state.data.email}</p>
            <p>Service: {state.data.service}</p>
            <p>
              Vehicle-Type: {state.data.vehicleMake} {state.data.vehicleModel}{" "}
              {state.data.vehicleYear}
            </p>
            <p>Service Description: {state.data.serviceDescription} </p>
            <p>
              Time And Date: {state.data.date} {state.data.time}{" "}
            </p>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default SearchCustomer;
