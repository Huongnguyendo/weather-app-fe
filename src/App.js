import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Nav,
  Navbar,
  NavDropdown,
  FormControl,
  Button,
  Container,
  Alert,
} from "react-bootstrap";
import WeatherCard from "../src/weatherCard/weatherCard";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import "./App.css";

function App() {
  const REACT_APP_BACKEND = process.env.REACT_APP_BACKEND;
  const [keyword, setKeyword] = useState("");
  let [weatherData, setWeatherData] = useState();
  let [loading, setLoading] = useState();

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const getWeatherData = async (e) => {
    if (e) e.preventDefault();
    try {
      let url = `${REACT_APP_BACKEND}?q=${keyword}`;
      let response = await fetch(url);
      if (response.status == 200) {
        let data = await response.json();
        setWeatherData(data.data);
      } else throw new Error({ message: "i am new error" });
    } catch (err) {
      console.log("err: ", err.message);
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      getWeather(post.coords.longitude, post.coords.latitude);
    });
  };

  const getWeather = async (longtitude, latitude) => {
    try {
      let url = `${REACT_APP_BACKEND}?lon=${longtitude}&lat=${latitude}`;
      let response = await fetch(url);
      let data = await response.json();
      setWeatherData(data.data);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  // useEffect(() => {
  //   getWeatherData();
  // }, []);

  return (
    <div className="App">
      <Navbar bg="light" expand="md" className="navbar">
        <Navbar.Brand href="#home">Weather App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline onSubmit={(e) => getWeatherData(e)}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <div className="weather-info">
        <WeatherCard weatherData={weatherData} />
      </div>

      {/* <Container>{weatherData ? <div>{weatherData.main.temp}</div> : ""}</Container> */}
    </div>
  );
}

export default App;
