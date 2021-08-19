import React, { useEffect, useState } from "react";
import "./style.scss";
import "@babel/polyfill";
import { Row, Col, Button, Form } from "react-bootstrap";
import Footer from "../Layout/footer";
import Header from "../Layout/header";
import axios from "axios";
import { UpdateProfileApi } from "../../services/API";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");


  // let mylogin = JSON.parse(localStorage.getItem("myLoginData"));
  // console.log(mylogin.email);

  const getValue = () => {
    let mylogin = JSON.parse(localStorage.getItem("myLoginData"));
    console.log(mylogin.email);

    setName(mylogin.accountName.name);
    setEmail(mylogin.email);
    setToken(mylogin.token);
  };

  useEffect(() => {
    getValue();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
    } else {
     let data= {name, email, password}
     console.log(data);
      axios
      .put(UpdateProfileApi,data,{ headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        console.log(response.message);
        localStorage.clear();
        window.location.href="/";
        
      })
      .catch((e) => {
        console.log(e.message);
      })
    }
  };

  return (
    <div style={{ background: "#f5f5f3" }}>
      <div className="singleView">
        <Header />
        <div className="container-fluid">
          <div className="mt-3 forpadding1">
            <h4 className="ml-3">Profile</h4>
            <div className="mt-5 mb-5 p-4 bg-white">
              <h3 className="pl-3">Update Profile</h3>
              <Form className="px-3" onSubmit={submitHandler}>
                <Row>
                  <Col md={5} sm={12}>
                    <Form.Group controlId="formInput1">
                      <Form.Label style={{ opacity: ".7" }}>
                        YOUR NAME
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5} sm={12}>
                    <Form.Group controlId="formBasicreceiveDate">
                      <Form.Label style={{ opacity: ".7" }}>
                        NEW PASSWORD
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={5} sm={12}>
                    <Form.Group controlId="formBasicchequeNumber">
                      <Form.Label style={{ opacity: ".7" }}>
                        EMAIL ADDRESS
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        disabled
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5} sm={12}>
                    <Form.Group controlId="bankName">
                      <Form.Label style={{ opacity: ".7" }}>
                        CONFIRM PASSWORD
                      </Form.Label>
                      <Form.Control
                        className="passwordClose"
                        type="password"
                        name="confirmPassword"
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        placeholder="Enter confirm password"
                        required
                      />
                    </Form.Group>

                    {/* <span className="passwordShow">
                      <Icon
                        size={15}
                        icon={eye}
                        //style={{ color: "red" }}
                        onClick={() =>
                          type === "password"
                            ? setType("text")
                            : setType("password")
                        }
                      />
                    </span> */}

                    <span style={{ color: "red" }}>{errorMessage}</span>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  className="btn border-0"
                  style={{ background: "#fdd92a", color: "black" }}
                >
                  {" "}
                  Submit
                </Button>
              </Form>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
