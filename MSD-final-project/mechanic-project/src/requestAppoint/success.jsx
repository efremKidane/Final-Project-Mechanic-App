import React, { Component, useContext } from "react";
import styled from "styled-components";
import { Grid, Paper } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import NavBar from "../navbar/navbar";
import { UserContext } from "./../utils/context";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 5px;
`;

const ColumnLeft = styled.div`
  display: flex;
  color: #131313;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px;
`;
const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 5px;
  position: realtive;

  Button {
    justify-content: flex-end;
    alignitems: flex-end;
    alignself: flex-end;
  }
`;

export default function Success() {
  const user = useContext(UserContext);
  console.log(user.state.error);

  return (
    <React.Fragment>
      <NavBar />
      {!user.state.error && (
        <div>
          <AppBar
            style={{
              position: "static",
              padding: "20px",
              background: "#74eda4",
              marginTop: "60px",
            }}
          >
            Success
          </AppBar>
          <Grid container spacing={1}>
            <Grid item xs={12} style={{padding:"10px"}}>
            <h2>Thank you for your Appointment request</h2>
            <p>An appointment request has recieved to Fairfiled mechanics</p>
              <p>
                We will respond to your request within few minutes to your email
              </p>
              </Grid>
            <Paper style={{padding: "10px", width:"100%"}}>
              
              <h3>Shop Hours</h3>
              <p>Monday 8:00AM - 6:00PM</p>
              <p>Tuesday 8:00AM - 6:00PM</p>
              <p>Wensday 8:00AM - 6:00PM</p>
              <p>Thersday 8:00AM - 6:00PM</p>
              <p>Friday 8:00AM - 6:00PM</p>
              <p>Saturday 8:00AM - 6:00PM</p>
            </Paper>
          </Grid>
        </div>
      )}
      {user.state.error && (
        <div>
          <AppBar
            style={{
              position: "static",
              padding: "20px",
              background: "red",
              marginTop: "60px",
            }}
          >
            Error
          </AppBar>
          <h2>
            the appointment request is taken by others make another request
          </h2>
        </div>
      )}
    </React.Fragment>
  );
}
