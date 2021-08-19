import React, { useEffect, useState } from "react";
import "./style.scss";
import { Icon } from "react-icons-kit";
//import pic from "../../images/img.jpg";
// import pic1 from "../../images/img1.jpg";
//import pic2 from "../../images/img2.jpg";
// import pic3 from "../../images/img3.jpg";
//import pic4 from "../../images/img4.jpg";
//import { Link } from "react-router-dom";
import axios from "axios";

import {
  playCircleO,
  userCircle,
  heart,
  signOut,
  arrowRight,
  twitter,
  facebookF,
  whatsapp,
  pinterest,
  telegram,
  envelopeO,
  plus,
  thList,
  playCircle,
  user,
} from "react-icons-kit/fa";
import ReactLiveSearch from "react-live-search";
//import { DownOutlined } from "@ant-design/icons";
import {
  Nav,
  NavDropdown,
  Navbar,
  Tab,
  Row,
  Col,
  Image,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import Footer from "../Layout/footer";
import {
  LatestMoviesApi,
  CommingSoonMoviesApi,
  TrendingMoviesApi,
  TrendingTvShowsApi,
  LatestTvShowsApi,
  CountryListApi,
  GenreListApi,
  MovieVersionListApi,
  TvShowsTypeListApi,
  RegisterApi,
  LoginApi,
  RequestMovieApi
} from "../../services/API";
// import Search from '../Search/Index'

const Home = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [commingSoonMovies, setCommingSoonMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [latestTvShows, setLatestTvShows] = useState([]);

  //const [login, setLogin] = useState("1");
  const [show, setShow] = useState(false);
  const [loginshow, setLoginShow] = useState(false);
  const [registershow, setRegisterShow] = useState(false);
  const [requestMovie, setRequestMovieShow] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
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

  //const [quality, setQuality] = useState("HD");
  // const [imgTrendingTv, setImgTrendingTv] = useState(pic1);
  // const [imgLatestTv, setImgLatestTv] = useState(pic3);

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
  const [shortDescription,setShortDescription] = useState("");

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

  const latestMoviesApi = () => {
    axios
      .get(LatestMoviesApi)
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.MoviesList);
          setLatestMovies(response.data.MoviesList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const commingSoonMoviesApi = () => {
    axios
      .get(CommingSoonMoviesApi)
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.MoviesList);
          setCommingSoonMovies(response.data.MoviesList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const trendingMoviesApi = () => {
    axios
      .get(TrendingMoviesApi)
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.MoviesList);
          setTrendingMovies(response.data.MoviesList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const trendingTvShowsApi = () => {
    axios
      .get(TrendingTvShowsApi)
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.MoviesList);
          setTrendingTvShows(response.data.MoviesList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const latestTvShowsApi = () => {
    axios
      .get(LatestTvShowsApi)
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.SeasonsList);
          setLatestTvShows(response.data.SeasonsList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
  // let header ={
  //   "Content-Type" : "application/json",

  // }

  const registerSubmit = (e) => {
    e.preventDefault();
    let data = { name, email, password };
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
    } else {
      console.log(data);
      axios
        .post(RegisterApi,data)
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
        .post(LoginApi,data)
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
    let data = { sender,movieName,shortDescription };
    
      axios
        .post(RequestMovieApi,data,{
          headers: { Authorization: `Bearer ${token}` }})
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
    latestMoviesApi();
    commingSoonMoviesApi();
    trendingMoviesApi();
    trendingTvShowsApi();
    latestTvShowsApi();
    countryListApi();
    genreListApi();
    movieVersionListApi();
    tvShowsTypeListApi();
  }, []);

  const getSingleMovieId = (id) => {
    if (id) {
      console.log(id);
      window.location.href = `/singlemovieview/${id}`;
    }
  };
  const getSingleTvShowsId = (id) => {
    if (id) {
      console.log(id);
      window.location.href = `/singletvshowsview/${id}`;
    }
  };
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
                  <NavDropdown.Item onClick={()=>getSingleFavouriteId(mylogin.accountName._id)}>
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
                ) }
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>

        <div style={{ background: "#fdd92a" }}>
          <div className="container text-center pt-5 pb-5">
            <h5 style={{ fontSize: "2.2em", fontWeight: 350 }}>
              Find Movies, TV shows and more
            </h5>
          </div>
          <div className="searchbox reactsearch">
            {/* <Search/> */}
            <ReactLiveSearch
              value={value}
              onChange={onChange}
              onSelect={onSelect}
              data={data}
              //className="reactsearch"
            />
          </div>
          <div className="searchIcon p-3 shadow">
            <Icon size={30} icon={arrowRight} />
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5" style={{ background: "#f5f5f3" }}>
        <div className="container-fluid px-5 tag">
          <p>
            Why spend your hard earned cash on cable or Netflix when you can
            stream thousands of movies and series at no cost? More and more
            people cut the cord because entertainment on demand sounds more
            tempting. And more and more people stop purchasing a subscription
            plan because they can get the same service at free online movie
            streaming sites. At Attacker.tv, you can watch any movie of your
            choice without paying a penny or even signing up. With a huge
            collection of movies and TV shows, Attacker.tv is confident to meet
            your entertainment needs and even exceed your expectations. With
            full HD movies and mobile-friendly and Chromecast supported
            features, Attacker.tv is your best alternative to cable and paid
            streaming services. free movies streaming, watch movies online free,
            full hd movies stream, full hd series stream, movie streaming
            online, watch hd series online, hd movie streaming, hd movies
            online, watch new movies online free, stream movies online free,
            reddit watch movies free, watch movies online free streaming, watch
            movies online free hd
          </p>
        </div>
        <div className="pt-3 text-center hoverDiv">
          <button
            type="button"
            className="btn btn-sm m-1"
            style={{ background: "#1da1f2", color: "white" }}
          >
            <Icon size={15} icon={twitter} style={{ color: "white" }} /> Twitter
          </button>
          <button
            type="button"
            className="btn btn-sm m-1"
            style={{ background: "#3b5998", color: "white" }}
          >
            <Icon size={15} icon={facebookF} style={{ color: "white" }} />{" "}
            Facebook
          </button>
          <button
            type="button"
            className="btn btn-sm m-1"
            style={{ background: "#4dc247", color: "white" }}
          >
            <Icon size={16} icon={whatsapp} style={{ color: "white" }} />{" "}
            Whatsapp
          </button>
          <button
            type="button"
            className="btn btn-sm m-1"
            style={{ background: "#cb2027", color: "white" }}
          >
            <Icon size={16} icon={pinterest} style={{ color: "white" }} />{" "}
            Pinterest
          </button>
          <button
            type="button"
            className="btn btn-sm m-1"
            style={{ background: "#0088cc", color: "white" }}
          >
            <Icon size={16} icon={telegram} style={{ color: "white" }} />{" "}
            Telegram
          </button>
          <button
            type="button"
            className="btn btn-sm m-1"
            style={{ background: "#848484", color: "white" }}
          >
            <Icon size={16} icon={envelopeO} style={{ color: "white" }} /> Email
          </button>
          <button
            type="button"
            className="btn btn-sm m-1"
            style={{ background: "#ff6550", color: "white" }}
          >
            <Icon size={16} icon={plus} style={{ color: "white" }} /> More
          </button>
        </div>
        <div className="pt-5 px-5 tablink">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav variant="pills">
              <Nav.Item>
                <h3 className="pr-4">Trending </h3>
              </Nav.Item>
              <Nav.Item className="pr-2">
                <Nav.Link eventKey="first">
                  <Icon size={16} icon={playCircleO} /> Movies
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">
                  {" "}
                  <Icon size={16} icon={thList} /> TV Shows
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div className="pt-3">
                  <Row>
                    {trendingMovies.map((data, i) => {
                      return (
                        <Col
                          key={i}
                          lg={2}
                          md={3}
                          sm={6}
                          xs={12}
                          className="pr-1 colSize"
                        >
                          <div className="imageContainer">
                            <Image
                              className="imagesize"
                              name="imgTrendingMovies"
                              src={data.movieImage}
                              onClick={() => getSingleMovieId(data._id)}
                              rounded
                            />
                            <Icon
                              size={60}
                              icon={playCircle}
                              className="hoverable"
                              style={{ color: "yellow" }}
                            />
                          </div>

                          <span
                            className="badge p-1 border hd"
                            style={{ float: "right" }}
                            name="quality"
                          >
                            {data.movieQuality}
                          </span>
                          <h6
                            className="pt-2"
                            onClick={() => getSingleMovieId(data._id)}
                          >
                            {data.movieName}{" "}
                          </h6>
                          <div className="pb-3">
                            <span name="trendingMovieYear">{data.year}</span>
                            <span className="dot"></span>
                            <span name="trendingMovieTime">
                              {data.duration}
                            </span>
                            <span
                              className="badge border"
                              style={{ float: "right" }}
                            >
                              {data.type}
                            </span>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <div>
                  <Row>
                    {trendingTvShows.map((data, i) => {
                      return (
                        <Col
                          key={i}
                          lg={2}
                          md={3}
                          sm={6}
                          xs={12}
                          className="pr-1 colSize"
                        >
                          <div className="imageContainer">
                            <Image
                              className="imagesize"
                              src={data.movieImage}
                              onClick={() => getSingleTvShowsId(data._id)}
                              rounded
                            />
                            <Icon
                              size={60}
                              icon={playCircle}
                              className="hoverable"
                              style={{ color: "yellow" }}
                            />
                          </div>
                          <span
                            className="badge p-1 border hd"
                            style={{ float: "right" }}
                          >
                            {data.movieQuality}
                          </span>
                          <h6 className="pt-2">{data.movieName}</h6>
                          <div className="pb-3">
                            <span>SS {data.seasonName[0].seasonNo}</span>
                            <span className="dot"></span>
                            <span>
                              EPS {data.seasonName[0].episod[0].episodNo}
                            </span>
                            <span
                              className="badge border"
                              style={{ float: "right" }}
                            >
                              {data.type}
                            </span>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
        <div className="px-5 pt-5">
          <h3 className="pt-4">Latest Movies </h3>
          <div className="pt-3">
            <Row>
              {latestMovies.map((data, i) => {
                return (
                  <Col
                    key={i}
                    lg={2}
                    md={3}
                    sm={6}
                    xs={12}
                    className="pr-1 colSize"
                  >
                    <div className="imageContainer">
                      <Image
                        className="imagesize"
                        src={data.movieImage}
                        //onChange={() => setImgLatestMovies()}
                        onClick={() => getSingleMovieId(data._id)}
                        rounded
                      />
                      <Icon
                        size={60}
                        icon={playCircle}
                        className="hoverable"
                        style={{ color: "yellow" }}
                      />
                    </div>

                    <span
                      className="badge p-1 border hd"
                      style={{ float: "right" }}
                      //onChange={() => setQuality()}
                    >
                      {data.movieQuality}
                    </span>
                    <h6
                      className="pt-2"
                      onClick={() => getSingleMovieId(data._id)}
                    >
                      {data.movieName}
                    </h6>
                    <div className="pb-3">
                      <span>{data.year}</span>
                      <span className="dot"></span>
                      <span>{data.duration}</span>
                      <span className="badge border" style={{ float: "right" }}>
                        {data.type}
                      </span>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
        <div className="px-5 pt-5">
          <h3 className="pt-4">Latest TV Shows </h3>
          <div className="pt-3">
            <Row>
              {latestTvShows.map((data, i) => {
                return (
                  <Col
                    key={i}
                    lg={2}
                    md={3}
                    sm={6}
                    xs={12}
                    className="pr-1 colSize"
                  >
                    <div className="imageContainer">
                      <Image
                        className="imagesize"
                        src={data.movieImage}
                        onClick={() => getSingleTvShowsId(data._id)}
                        rounded
                      />
                      <Icon
                        size={60}
                        icon={playCircle}
                        className="hoverable"
                        style={{ color: "yellow" }}
                      />
                    </div>

                    <span
                      className="badge p-1 border hd"
                      style={{ float: "right" }}
                      //onChange={() => setQuality()}
                    >
                      {data.movieQuality}
                    </span>
                    <h6 className="pt-2">{data.movieName}</h6>
                    <div className="pb-3">
                      <span>SS {data.seasonName[0].seasonNo}</span>
                      <span className="dot"></span>
                      <span>EPS {data.seasonName[0].episod[0].episodNo}</span>
                      <span className="badge border" style={{ float: "right" }}>
                        {data.type}
                      </span>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
        <div className="px-5 pt-5">
          <h3 className="pt-4">Coming Soon </h3>
          <div className="pt-3">
            <Row>
              {commingSoonMovies.map((data, i) => {
                return (
                  <Col
                    key={i}
                    lg={2}
                    md={3}
                    sm={6}
                    xs={12}
                    className="pr-1 colSize"
                  >
                    <div className="imageContainer">
                      <Image
                        className="imagesize"
                        src={data.movieImage}
                        //onChange={() => setImgComingSoon()}
                        onClick={() => getSingleMovieId(data._id)}
                        rounded
                      />
                      <Icon
                        size={60}
                        icon={playCircle}
                        className="hoverable"
                        style={{ color: "yellow" }}
                      />
                    </div>

                    {/* <span
                      className="badge p-1 border hd"
                      style={{ float: "right" }}
                    >
                      {data.movieQuality}
                    </span> */}
                    <h6
                      className="pt-2"
                      onClick={() => getSingleMovieId(data._id)}
                    >
                      {data.movieName}
                    </h6>
                    <div className="pb-3">
                      <span>{data.year}</span>
                      {/* <span className="dot"></span> */}
                      {/* <span>{data.duration}</span> */}
                      <span className="badge border" style={{ float: "right" }}>
                        {data.type}
                      </span>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>

        <div>
          <Footer />
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
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="name@email.com"
                    />
                  </Form.Group>
                  <Form.Group controlId="formInput2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      onChange={(e)=>setPassword(e.target.value)}
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
                      onChange={(e)=>setMovieName(e.target.value)}
                      placeholder="Enter your movie name"
                    />
                  </Form.Group>

                  <Form.Group controlId="formInput52">
                    <Form.Label>Movie Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="shortDescription"
                      onChange={(e)=>setShortDescription(e.target.value)}
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
    </div>
  );
};

export default Home;
