import React, { useEffect, useState } from "react";
import "../Home/style.scss";
import "@babel/polyfill";
import { Icon } from "react-icons-kit";
import axios from "axios";
import {
  playCircleO,
  userCircle,
  heart,
  signOut,
  user
} from "react-icons-kit/fa";
import ReactLiveSearch from "react-live-search";
import {
  Nav,
  NavDropdown,
  Navbar,
  Row,
  Col,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import {
  CountryListApi, GenreListApi, MovieVersionListApi, TvShowsTypeListApi, RegisterApi,
  LoginApi, RequestMovieApi
} from "../../services/API"
import { Notification } from '../Notification/Index'

const Header = () => {
  const [loginshow, setLoginShow] = useState(false);
  const [registershow, setRegisterShow] = useState(false);
  const [requestMovie, setRequestMovieShow] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [showThree, setShowThree] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState([
    { label: "test", value: 1 },
    { label: "work", value: 2 },
    { label: "great", value: 3 },
    { label: "bar", value: 4 },
    { label: "foo", value: 5 },
  ]);

  const [countryList, setCountryList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [movieVersionList, setMovieVersionList] = useState([]);
  const [tvShowsTypeList, setTvShowsTypeList] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieName, setMovieName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  const showDropdownOne = (e) => {
    setShowOne(!show);
  };
  const hideDropdownOne = (e) => {
    setShowOne(false);
  };
  const showDropdownTwo = (e) => {
    setShowTwo(!show);
  };
  const hideDropdownTwo = (e) => {
    setShowTwo(false);
  };
  const showDropdownThree = (e) => {
    setShowThree(!show);
  };
  const hideDropdownThree = (e) => {
    setShowThree(false);
  };
  const onChange = (value) => {
    setValue(value);
  };

  const onSelect = (v) => {
    setData(v);
  };

  const countryListApi = () => {
    axios
      .get(CountryListApi)
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.ContryList);
          setCountryList(response.data.ContryList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const genreListApi = () => {
    axios
      .get(GenreListApi)
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.GenreList);
          setGenreList(response.data.GenreList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const movieVersionListApi = () => {
    axios
      .get(MovieVersionListApi)
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.VersionList);
          setMovieVersionList(response.data.VersionList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const tvShowsTypeListApi = () => {
    axios
      .get(TvShowsTypeListApi)
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.TvShowsList);
          setTvShowsTypeList(response.data.TvShowsList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    let data = { name, email, password };
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
    } else {
      console.log(data);
      axios
        .post(RegisterApi, data)
        .then((response) => {
          console.log(response.message);
          setLoginShow(true);
          setRegisterShow(false);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    let data = { email, password };

    axios
      .post(LoginApi, data)
      .then((response) => {
        console.log(response.message);

        let myLoginData = response.data;
        console.log(myLoginData);
        localStorage.setItem("myLoginData", JSON.stringify(myLoginData))

        setLoginShow(false);
        //setRegisterShow(false);
      })
      .catch((e) => {
        console.log(e.message);
      });

  };
  const RequestMovieSubmit = (e) => {
    e.preventDefault();
    let sender = mylogin.accountName._id;
    let token = mylogin.token;
    let data = { sender, movieName, shortDescription };

    axios
      .post(RequestMovieApi, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response.message);

        setRequestMovieShow(false);
      })
      .catch((e) => {
        console.log(e.message);
      });

  };

  let mylogin = JSON.parse(localStorage.getItem("myLoginData"));
  console.log(mylogin);

  useEffect(() => {
    countryListApi();
    genreListApi();
    movieVersionListApi();
    tvShowsTypeListApi();
  }, []);

  const getSingleCountryId = (id) => {
    if (id) {
      window.location.href = `/countryview/${id}`;
    }
  };
  const getSingleGenreId = (id) => {
    if (id) {
      window.location.href = `/genreview/${id}`;
    }
  };
  const getSingleMovieVersionId = (id) => {
    if (id) {
      window.location.href = `/moviesview/${id}`;
    }
  };
  const getSingleTvShowsTypeId = (id) => {
    if (id) {
      window.location.href = `/tvshowsview/${id}`;
    }
  };
  const getSingleFavouriteId = (id) => {
    if (id) {
      window.location.href = `/user/favourite/${id}`;
    }
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" style={{ background: "#fdd92a" }}>
        <div className="container-fluid">
          <Navbar.Brand href="/">
            <h4 className="pt-1 pl-2 smalldevice hide">
              {" "}
              <Icon size={30} icon={playCircleO} /> MOVIERA
            </h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link className="active px-3" href="/">
                Home
              </Nav.Link>
              <NavDropdown
                id="collasible-nav-dropdown"
                title="Category"
                className="active px-3 countryBackground"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <ul className="sub-menu px-3 topContainer">
                  <Row>
                    {genreList.map((data, i) => (
                      <Col key={i} md={3}>
                        <li
                          className="countryLi pl-2"
                          data-toggle="tooltip"
                          data-placement="top"
                          title={data.genre}
                          onClick={() => getSingleGenreId(data._id)}
                        >
                          {data.genre}
                        </li>
                      </Col>
                    ))}
                  </Row>
                </ul>
              </NavDropdown>
              <NavDropdown
                id="collasible-nav-dropdownOne"
                title="Country"
                className="active px-3 countryBackground"
                show={showOne}
                onMouseEnter={showDropdownOne}
                onMouseLeave={hideDropdownOne}
              >
                <ul className="sub-menu px-3 topContainer">
                  <Row>
                    {countryList.map((data, i) => (
                      <Col key={i} md={3}>
                        <li
                          className="countryLi pl-2"
                          data-toggle="tooltip"
                          data-placement="top"
                          title={data.country}
                          onClick={() => getSingleCountryId(data._id)}
                        >
                          {data.country}
                        </li>
                      </Col>
                    ))}
                  </Row>
                </ul>
              </NavDropdown>
              <NavDropdown
                id="collasible-nav-dropdown-Two"
                title="Movies"
                className="active px-3 countryBackground"
                show={showTwo}
                onMouseEnter={showDropdownTwo}
                onMouseLeave={hideDropdownTwo}
              >
                <ul className="sub-menu px-3 topContainer">
                  <Row>
                    {movieVersionList.map((data, i) => (
                      <Col key={i} md={3}>
                        <li
                          className="countryLi pl-2"
                          data-toggle="tooltip"
                          data-placement="top"
                          title={data.version}
                          onClick={() => getSingleMovieVersionId(data._id)}
                        >
                          {data.version}
                        </li>
                      </Col>
                    ))}
                  </Row>
                </ul>
              </NavDropdown>
              <NavDropdown
                id="collasible-nav-dropdown-Three"
                title="TV Shows"
                className="active px-3 countryBackground"
                show={showThree}
                onMouseEnter={showDropdownThree}
                onMouseLeave={hideDropdownThree}
              >
                <ul className="sub-menu px-3 topContainer">
                  <Row>
                    {tvShowsTypeList.map((data, i) => (
                      <Col key={i} md={3}>
                        <li
                          className="countryLi pl-2"
                          data-toggle="tooltip"
                          data-placement="top"
                          title={data.tvShows}
                          onClick={() => getSingleTvShowsTypeId(data._id)}
                        >
                          {data.tvShows}
                        </li>
                      </Col>
                    ))}
                  </Row>
                </ul>
              </NavDropdown>
              <Nav.Link className="active px-3" href="/imdbview">
                Top IMDB
              </Nav.Link>
              <Nav.Link
                className="active px-3"
                onClick={() => setRequestMovieShow(true)}
              >
                Request For Movie
              </Nav.Link>


              <Notification
                total={20}
                items={[
                  {
                    "_id": "6114794ed00d83177c5fe532",
                    "movieName": "The Florist"
                  },
                  {
                    "_id": "61101adeab1e7c1384c1e314",
                    "movieName": "Fresh, Fried & Crispy"
                  },
                  {
                    "_id": "60fc88d657596419c0b2a055",
                    "movieName": "Space Jam: A New Legacy"
                  },
                  {
                    "_id": "60fc86beed7be847a48969f2",
                    "movieName": "Jolt"
                  },
                  {
                    "_id": "60fc7d469c256a129c429dcf",
                    "movieName": "Blood Red Sky"
                  }
                ]} />
            </Nav>


            <Nav className="mainsearch pr-2">
              <div className="searchbox reactsearch ">
                <ReactLiveSearch
                  value={value}
                  onChange={onChange}
                  onSelect={onSelect}
                  data={data}
                ></ReactLiveSearch>
              </div>
            </Nav>
            <Nav className="me-2">
              {mylogin ? (
                <NavDropdown
                  className="active pl-2"
                  title={mylogin.accountName.name}
                  id="collasible-nav-dropdown"
                  style={{ paddingRight: 75 }}
                >
                  <NavDropdown.Item href="/user/profile">
                    <Icon className="pr-2" size={17} icon={userCircle} />
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => getSingleFavouriteId(mylogin.accountName._id)}>
                    <Icon className="pr-2" size={17} icon={heart} />
                    My Favourite
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/"
                    style={{ color: "red" }}
                    onClick={() =>
                      localStorage.clear()
                    }
                  >
                    <Icon
                      className="pr-2"
                      size={17}
                      icon={signOut}
                      style={{ color: "red" }}
                    />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>


              ) : (
                <div>
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => setLoginShow(true)}
                  >
                    <Icon size={17} icon={user} /> Login
                  </button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <div className="searchbox1 reactsearch1 subsearch">
        <ReactLiveSearch
          value={value}
          onChange={onChange}
          onSelect={onSelect}
          data={data}
        ></ReactLiveSearch>
      </div>
      <div>
        <Modal
          show={loginshow}
          onHide={() => setLoginShow(false)}
          size="md"
          centered
        >
          <Form onSubmit={loginSubmit}>
            <div className="p-4">
              <Modal.Header
                closeButton
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Modal.Title>
                  <Icon size={30} icon={playCircleO} /> MOVIERA
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group controlId="formInput1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                  />
                </Form.Group>
                <Form.Group controlId="formInput2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    >
                      <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                  </Col>
                  <Col className="text-right">
                    <span
                      onClick={() =>
                        setResetPassword(true) & setLoginShow(false)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      Forget Password ?
                    </span>
                  </Col>
                </Row>
                <Button
                  type="submit"
                  className="btn btn-warning"
                  block
                >
                  Log In
                </Button>
              </Modal.Body>
            </div>
            <Modal.Footer
              style={{
                display: "flex",
                justifyContent: "center",
                background: "#f5f5f3",
              }}
            >
              <Row>
                <Col>
                  <span className="text-left">
                    Do you have account?{" "}
                    <span
                      onClick={() =>
                        setRegisterShow(true) & setLoginShow(false)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      Register
                    </span>
                  </span>
                </Col>
              </Row>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal
          show={registershow}
          onHide={() => setRegisterShow(false)}
          size="md"
          centered
        >
          <Form onSubmit={registerSubmit}>
            <div className="p-4">
              <Modal.Header
                closeButton
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Modal.Title>Create New Account</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group controlId="formInput12">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Rname"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </Form.Group>
                <Form.Group controlId="formInput1">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Remail"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                  />
                </Form.Group>
                <Form.Group controlId="formInput2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Rpassword"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </Form.Group>
                <Form.Group controlId="formInput31">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="RconfirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter your password again"
                  />
                  <span style={{ color: "red" }}>{errorMessage}</span>
                </Form.Group>

                <Button
                  type="submit"
                  className="btn btn-warning"
                  //onClick={() => localStorage.setItem("login", JSON.stringify("2"))}
                  block
                >
                  Register
                </Button>
              </Modal.Body>
            </div>
            <Modal.Footer
              style={{
                display: "flex",
                justifyContent: "center",
                background: "#f5f5f3",
              }}
            >
              <Row>
                <Col>
                  <span className="text-left">
                    Have an account?{" "}
                    <span
                      onClick={() =>
                        setLoginShow(true) & setRegisterShow(false)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      Login
                    </span>
                  </span>
                </Col>
              </Row>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal
          show={resetPassword}
          onHide={() => setResetPassword(false)}
          size="md"
          centered
        >
          <Form>
            <div className="p-4">
              <Modal.Header
                closeButton
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Modal.Title>Reset Password</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group controlId="formInput1">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@email.com"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="btn btn-warning"
                  onClick={() =>
                    localStorage.setItem("login", JSON.stringify("2"))
                  }
                  block
                >
                  Submit
                </Button>
              </Modal.Body>
            </div>
            <Modal.Footer
              style={{
                display: "flex",
                justifyContent: "center",
                background: "#f5f5f3",
              }}
            >
              <Row>
                <Col>
                  <span
                    className="text-left"
                    onClick={() =>
                      setLoginShow(true) & setResetPassword(false)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    Back to Login
                  </span>
                </Col>
              </Row>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal
          show={requestMovie}
          onHide={() => setRequestMovieShow(false)}
          size="md"
          centered
        >
          <Form onSubmit={RequestMovieSubmit}>
            <div className="p-4">
              <Modal.Header
                closeButton
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Modal.Title>Request For Movie</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group controlId="formInput51">
                  <Form.Label>Movie Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="movieName"
                    onChange={(e) => setMovieName(e.target.value)}
                    placeholder="Enter your movie name"
                  />
                </Form.Group>

                <Form.Group controlId="formInput52">
                  <Form.Label>Movie Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="shortDescription"
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Enter your movie details here"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="btn btn-warning"
                  //onClick={() =>RequestMovieSubmit()}
                  block
                >
                  Add Request
                </Button>
              </Modal.Body>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
