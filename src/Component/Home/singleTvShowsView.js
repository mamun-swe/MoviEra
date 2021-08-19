import React, { useEffect, useState } from "react";
import "./style.scss";
import "@babel/polyfill";
import { Icon } from "react-icons-kit";
import axios from "axios";
import { AddFavouriteApi, DeleteFavouriteApi, SingleTvShowsApi, LikeApi, DislikeApi } from "../../services/API";
import LoadingOverlay from "react-loading-overlay";

import {
  playCircle,
  thumbsUp,
  thumbsDown,
  play,
  plus,
  videoCamera,
  list,
  close,
  minus
  //arrowRight,
} from "react-icons-kit/fa";
//import { DownOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Image,
  DropdownButton,
  Dropdown,
  Modal,
} from "react-bootstrap";
import Footer from "../Layout/footer";
import Header from "../Layout/header";

const DATE_OPTIONS = { year: "numeric", month: "short", day: "numeric" };

const SingleTvShowsView = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [trailerShow, setTrailerShow] = useState(false);

  //const [movieImage, setMovieImage] = useState(pic);
  const [movieQuality, setMovieQuality] = useState("");
  const [movieName, setMovieName] = useState("");

  const [trailerUrl, setTrailerUrl] = useState("");
  const [imdb, setIMDB] = useState(null);
  const [shortDescription, setShortDescription] = useState("");
  const [releasedDate, setReleasedDate] = useState("");
  const [genre, setGenre] = useState([]);
  const [casts, setCasts] = useState([]);
  const [duration, setDuration] = useState("");
  const [country, setCountry] = useState([]);
  const [production, setProduction] = useState([]);
  const [season, setSeason] = useState([]);
  const [singleImage, setSingleImage] = useState();
  const [playerLink, setPlayerLink] = useState("");
  const SingleTvShowsId = props.match.params.id;

  const [dropdownName, setDropdownName] = useState("");
  const [seasonData, setSeasonData] = useState([]);
  const [serverData, setServerData] = useState([]);

  const [likeAlsoMovieData, setLikeAlsoMovieData] = useState([]);
  const [addFav, setAddFav] = useState(true);
  const [favourite, setFavourite] = useState([]);
  const [favID, setFavID] = useState("");
  const [like, setLike] = useState("");
  const [dislike, setDislike] = useState("");
  const [viewCount, setViewCount] = useState("");
  let favId = "";

  //const [videoShow,setVideoShow] = useState(false);
  //console.log(seasonData);

  const SingleTvShowsMethod = (id) => {
    setIsActive(true);
    //console.log(id);
    axios
      .get(SingleTvShowsApi + `${id}`)
      .then((response) => {
        if (response.data.status) {
          setIsActive(false);
          let movieData = response.data.movie;
          console.log(movieData);
          setMovieName(movieData.movieName);
          setMovieQuality(movieData.movieQuality);
          setGenre(movieData.genre);
          setCasts(movieData.casts);
          setCountry(movieData.country);
          setProduction(movieData.production);
          setIMDB(movieData.imdb);
          setShortDescription(movieData.shortDescription);
          setReleasedDate(movieData.releasedDate);
          setDuration(movieData.duration);
          setTrailerUrl(movieData.trailerUrl);
          setLike(movieData.like);
          setDislike(movieData.dislike);
          setViewCount(movieData.viewCount);
          
          let likeAlso = response.data.movielist;
          setLikeAlsoMovieData(likeAlso);
          //setServer(movieData.server);

          let seasonFullData = movieData.seasonName;
          setSeason(seasonFullData);
          
          setSeasonData(seasonFullData[0].episod);
          setServerData(seasonFullData[0].episod[0].server);
          setPlayerLink(seasonFullData[0].episod[0].server[0].url);
          setDropdownName(`Season ${seasonFullData[0].seasonNo}`);

          let imgData = response.data.movieImageFile;
          console.log(imgData);

          setSingleImage(imgData[0].movieImage);
          setFavourite(movieData.favourite);
          
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let mylogin = JSON.parse(localStorage.getItem("myLoginData"));
  

    favourite.map((data)=>
    //console.log(data._id)
    mylogin?
    (data._id === mylogin.accountName._id?
  favId = data._id :
  favId = ""):
  (favId = "")
    )
   
  
  console.log(`jjj ${favId}`)

  const AddFavourite = (id) => {
    let mylogin = JSON.parse(localStorage.getItem("myLoginData"));
    let token = mylogin.token;
    let favourite = mylogin.accountName._id;
    console.log(`Movie id : ${id}`);
    console.log(`favourite : ${favourite}`);
    console.log(`Token : ${mylogin.token}`);
    let data = {favourite};
    axios
      .put(AddFavouriteApi + `${id}`,data,{ headers: {"Authorization" : `Bearer ${token}`} }) 
      .then((response) => {
        console.log(response.message);
        //window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const DeleteFavourite = (id) => {
    
    let mylogin = JSON.parse(localStorage.getItem("myLoginData"));
    let token = mylogin.token;
    let favourite = mylogin.accountName._id;
    console.log(`Movie id : ${id}`);
    console.log(`favourite : ${favourite}`);
    console.log(`Delete Token : ${token}`);
    //let data = {favourite};
    axios
      .delete(DeleteFavouriteApi + `${id}`, {
        headers: {
          "Authorization" : `Bearer ${token}`
        },
        data: {
          "favourite": favourite
        }
      }) 
      .then((response) => {
        console.log(response.message);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const Like = (id) => {
    let mylogin = JSON.parse(localStorage.getItem("myLoginData"));
    let token = mylogin.token;
    let likeUser = mylogin.accountName._id;
    let data = {likeUser};
    axios
      .put(LikeApi + `${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.message);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Dislike = (id) => {
    let mylogin = JSON.parse(localStorage.getItem("myLoginData"));
    let token = mylogin.token;
    let dislikeUser = mylogin.accountName._id;
    let data = {dislikeUser};
    console.log(`id : ${id}`);
    axios
    .put(DislikeApi + `${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response.message);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    SingleTvShowsMethod(SingleTvShowsId);
  }, [SingleTvShowsId]);
  const getSingleCastId = (id) => {
    if (id) {
      console.log(id);
      window.location.href = `/castview/${id}`;
    }
  };

  const getSingleCountryId = (id) => {
    if (id) {
      console.log(id);
      window.location.href = `/countryview/${id}`;
    }
  };
  const getSingleGenreId = (id) => {
    if (id) {
      window.location.href = `/genreview/${id}`;
    }
  };
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

  return (
    <div style={{ background: "#f5f5f3" }}>
      <div className="singleView">
        <Header />
        <div className="container-fluid">
          <div className="mt-3 row">
            <div
              className="card rounded bg-white col-md-3 col-lg-3 col-6 m-auto"
              style={{ height: 125 }}
            >
              <h2>Attached add Here</h2>
            </div>
          </div>
          <LoadingOverlay
            active={isActive}
            spinner
            text="Tv Show is Loading..."
          >
            <div className="videoplayer container-fluid pt-3 forpadding1">
              {/* <ReactPlayer
            url="https://www.youtube.com/embed/uLo3x4oPLrs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          /> */}
              <div className="embed-responsive embed-responsive-4by3">
                <iframe
                  className="embed-responsive-item"
                  src={playerLink}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </LoadingOverlay>

          <div
            className=" container-fluid pt-3 forpadding1"
            style={{ background: "#f5f5f3" }}
          >
            <div className=" pt-3 px-1">
              <div className="bg-white text-center server">
                <h6 className="p-4">
                  If current server doesn't work please try other servers below.
                </h6>
                {serverData.map((data, i) => (
                  <button
                    key={i}
                    type="button"
                    className="btn btn-sm rounded-lg mb-4 mx-3"
                    style={{ background: "#f5f5f3", color: "black" }}
                    onClick={() => setPlayerLink(data.url)}
                  >
                    <Row>
                      <Col md={2}>
                        <Icon
                          className="pl-2 pt-2"
                          size={15}
                          icon={play}
                          style={{ color: "black" }}
                        />
                      </Col>
                      <Col md={9}>
                        Server
                        <br />
                        <strong>{data.serverName}</strong>
                      </Col>
                    </Row>
                  </button>
                ))}
              </div>

              <div className="bg-white pb-4 px-4 server1">
                <Row>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={
                      <span>
                        <Icon
                          className="pt-2"
                          size={15}
                          icon={list}
                          style={{ color: "black" }}
                        />{" "}
                        {dropdownName}
                      </span>
                    }
                    className="bg-white border-0"
                    size="sm"
                    style={{ color: "black" }}
                    variant=""
                  >
                    {/* <Dropdown.Toggle
                      className="bg-white border-0"
                      size="sm"
                      style={{ color: "black" }}
                    >
                      <Icon
                        className="pt-2"
                        size={15}
                        icon={list}
                        style={{ color: "black" }}
                      />{" "}
                      {dropdownName}
                    </Dropdown.Toggle> */}
                    {season.map((data, i) => (
                      <Dropdown.Item
                        key={i}
                        className="seasonhover"
                        //style={{ background: "#fdd92a", color: "black" }}
                        onClick={() =>
                          setDropdownName(`Season ${data.seasonNo}`) &
                          setSeasonData(data.episod)
                        }
                      >
                        Season {data.seasonNo}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Row>
                <Row className="mt-2">
                  {seasonData.map((data, i) => (
                    <Col className="p-2" key={i} sm={5} md={4} lg={3} xl={3}>
                      <button
                        type="button"
                        className="btn btn-sm rounded-lg bttn"
                        style={{ background: "#f5f5f3", color: "black" }}
                        onClick={() =>
                          setServerData(data.server) &
                          setPlayerLink(data.server[0].url)
                        }
                      >
                        <Row>
                          <Col xs={1}>
                            <Icon
                              className="px-2 pb-1"
                              size={12}
                              icon={play}
                              style={{ color: "black" }}
                            />
                          </Col>
                          <Col xs={10}>
                            <strong>EPS {data.episodNo}: </strong>
                            <span>{data.episodName}</span>
                          </Col>
                        </Row>
                      </button>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
            <div className="py-4">
              <div className="p-4 card border-0" style={{ borderRadius: 15 }}>
                <Row>
                  <Col lg={2} md={3} sm={6} xs={12} className=" colSize hdCol">
                    <div className="imageContainer">
                      <Image
                        className="imagesize"
                        name="movieImage"
                        src={singleImage}
                        //onChange={() => setMovieImage()}
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
                      name="movieQuality"
                      onChange={(e) => setMovieQuality()}
                    >
                      {movieQuality}
                    </span>
                    <div className="mt-3 ">
                      <Row>
                        <Col className="text-left">
                          <h5 style={{color:"#1baf69"}}>{like}</h5>
                        </Col>
                        <Col className="text-right">
                        <h5 style={{color:"#444"}}>{dislike}</h5>
                        </Col>
                      </Row>
                    </div>
                    {mylogin ? (
                      <div className=" mainlike">
                        <button
                          type="button"
                          className="btn btn-sm px-4 like"
                          style={{
                            background: "#1baf69",
                            color: "white",
                            fontSize: 15,
                          }}
                          onClick={() => Like(SingleTvShowsId)}
                        >
                          <Icon
                            className="pr-2 icon1"
                            size={19}
                            icon={thumbsUp}
                            style={{ color: "white" }}
                          />
                          Like
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm px-3 dislike"
                          style={{
                            background: "#444",
                            color: "white",
                            fontSize: 15,
                            float: "right",
                          }}
                          onClick={() => Dislike(SingleTvShowsId)}
                        >
                          {" "}
                          <Icon
                            className="pr-2 icon2"
                            size={19}
                            icon={thumbsDown}
                            style={{ color: "white" }}
                          />{" "}
                          Dislike
                        </button>
                      </div>
                    ) : (
                      <div className=" mainlike">
                        <button
                          type="button"
                          className="btn btn-sm px-4 like"
                          style={{
                            background: "#1baf69",
                            color: "white",
                            fontSize: 15,
                          }}
                          onClick={() => alert("You need to login")}
                        >
                          <Icon
                            className="pr-2 icon1"
                            size={19}
                            icon={thumbsUp}
                            style={{ color: "white" }}
                          />
                          Like
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm px-3 dislike"
                          style={{
                            background: "#444",
                            color: "white",
                            fontSize: 15,
                            float: "right",
                          }}
                          onClick={() => alert("You need to login")}
                        >
                          {" "}
                          <Icon
                            className="pr-2 icon2"
                            size={19}
                            icon={thumbsDown}
                            style={{ color: "white" }}
                          />{" "}
                          Dislike
                        </button>
                      </div>
                    )}
                    <div className="mt-2 text-left ">
                      <h5><span style={{color:"#ffa600"}}>{viewCount}</span> <span style={{fontSize:20}}>views</span></h5>
                    </div>
                  </Col>
                  <Col className="pt-5 watchCol">
                    <Row className="firstRow">
                      <Col>
                        <button
                          type="button"
                          className="btn btn-sm rounded-pill"
                          style={{
                            background: "#fdd92a",
                            color: "black",
                            fontSize: 18,
                          }}
                        >
                          <Icon
                            className="pr-2 "
                            size={15}
                            icon={play}
                            style={{ color: "black" }}
                          />
                          Watch Now
                        </button>
                        {mylogin ? (
                                favId !== "" & addFav === true ? (
                                  <button
                                type="button"
                                className="btn btn-sm rounded-pill addFavourite"
                                style={{
                                  background: "#e6e6e6",
                                  color: "black",
                                  fontSize: 18,
                                  float: "right",
                                }}
                                onClick={() => setAddFav(false) & DeleteFavourite(SingleTvShowsId)}
                              >
                                <Icon
                                  className="pr-1 "
                                  size={13}
                                  icon={minus}
                                  style={{ color: "black" }}
                                />
                                Remove from favourite
                              </button>
                             
                              
                            ):
                              favID !== "" & addFav === true ? (
                                <button
                              type="button"
                              className="btn btn-sm rounded-pill addFavourite"
                              style={{
                                background: "#e6e6e6",
                                color: "black",
                                fontSize: 18,
                                float: "right",
                              }}
                              onClick={() => setAddFav(false) & DeleteFavourite(SingleTvShowsId)}
                            >
                              <Icon
                                className="pr-1 "
                                size={13}
                                icon={minus}
                                style={{ color: "black" }}
                              />
                              Remove from favourite
                            </button>
                           
                            
                          ): (
                              <button
                              type="button"
                              className="btn btn-sm rounded-pill addFavourite"
                              style={{
                                background: "#e6e6e6",
                                color: "black",
                                fontSize: 18,
                                float: "right",
                              }}
                              onClick={() => setAddFav(true) & AddFavourite(SingleTvShowsId) & setFavID(mylogin.accountName._id)}
                            >
                              <Icon
                                className="pr-1 "
                                size={13}
                                icon={plus}
                                style={{ color: "black" }}
                              />
                              Add to favourite
                            </button>
                            )):(
                              <button
                            type="button"
                            className="btn btn-sm rounded-pill addFavourite"
                            style={{
                              background: "#e6e6e6",
                              color: "black",
                              fontSize: 18,
                              float: "right",
                            }}
                            onClick={() => alert("You need to login")}
                          >
                            <Icon
                              className="pr-1 "
                              size={13}
                              icon={plus}
                              style={{ color: "black" }}
                            />
                            Add to favourite
                          </button>
                            )}
                        </Col>
                    </Row>
                    <Row className="movieName">
                      <Col className="pt-3">
                        <h2 style={{ fontSize: 38, fontWeight: 350 }}>
                          {movieName}
                        </h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <button
                          type="button"
                          className="btn btn-sm border-dark"
                          onClick={() => setTrailerShow(true)}
                        >
                          <Icon
                            className="pr-2 "
                            size={15}
                            icon={videoCamera}
                            style={{ color: "black" }}
                          />
                          Trailer
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm border-dark m-2"
                          style={{ fontWeight: 700 }}
                        >
                          {movieQuality}
                        </button>
                        <span
                          className="p-2 font-weight-bold imdb"
                          style={{ color: "#ffa600" }}
                        >
                          IMDB : {imdb}
                        </span>
                        <p className="py-2" style={{ fontSize: 15 }}>
                          {shortDescription}
                        </p>{" "}
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={5} md={5} sm={12}>
                        <span style={{ fontSize: 15 }}>
                          {" "}
                          <span style={{ fontWeight: 500 }}>Released : </span>
                          {new Date(releasedDate).toLocaleDateString(
                            "en-US",
                            DATE_OPTIONS
                          )}{" "}
                        </span>
                        <br />
                        <span style={{ fontSize: 15 }}>
                          {" "}
                          <span style={{ fontWeight: 500 }}>Genre : </span>
                          {genre.map((data, i) => (
                            <span
                              key={i}
                              onClick={() => getSingleGenreId(data._id)}
                              style={{ cursor: "pointer" }}
                            >
                              {data.genre + ", "}
                            </span>
                          ))}
                        </span>
                        <br />
                        <span style={{ fontSize: 15 }}>
                          {" "}
                          <span style={{ fontWeight: 500 }}>Cast : </span>
                          {casts.map((data, i) => (
                            <span
                              key={i}
                              onClick={() => getSingleCastId(data._id)}
                              style={{ cursor: "pointer" }}
                            >
                              {data.name + ", "}
                            </span>
                          ))}
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <span style={{ fontSize: 15 }}>
                          {" "}
                          <span style={{ fontWeight: 500 }}>Duration : </span>
                          {duration}{" "}
                        </span>
                        <br />
                        <span style={{ fontSize: 15 }}>
                          {" "}
                          <span style={{ fontWeight: 500 }}>Country : </span>
                          {country.map((data, i) => (
                            <span
                              key={i}
                              onClick={() => getSingleCountryId(data._id)}
                              style={{ cursor: "pointer" }}
                            >
                              {data.country + ", "}
                            </span>
                          ))}{" "}
                        </span>
                        <br />
                        <span style={{ fontSize: 15 }}>
                          {" "}
                          <span style={{ fontWeight: 500 }}>Production : </span>
                          {production.map(
                            (data, i) => data.productionName + ", "
                          )}{" "}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="py-2">
              <button
                type="button"
                className="btn btn-sm btn-light bg-white m-2"
              >
                Watch {movieName} Online Free
              </button>
              <button
                type="button"
                className="btn btn-sm btn-light bg-white m-2"
              >
                {movieName} Online Free
              </button>
              <button
                type="button"
                className="btn btn-sm btn-light bg-white m-2"
              >
                {" "}
                Where to watch {movieName}
              </button>
              <button
                type="button"
                className="btn btn-sm btn-light bg-white m-2"
              >
                {movieName} Movie Free Online
              </button>
              <button
                type="button"
                className="btn btn-sm btn-light bg-white m-2"
              >
                {movieName} Free Online
              </button>
            </div>

            <div className="pt-2 forpadding">
              <h3 className="pt-4">You may also like </h3>
              <div className="pt-3">
                <Row>
                  {likeAlsoMovieData.map((data,i) => {
                    return (
                      <Col key={i} lg={2} md={3} sm={6} xs={12} className="pr-1 colSize">
              {data.type === "Movie" ? (
                <div>
                  <div className="imageContainer">
                    <Image
                      className="imagesize"
                      src={data.movieImage}
                      rounded
                      onClick={() => getSingleMovieId(data._id)}
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
                </div>
              ) : (
                <div>
                  <div className="imageContainer">
                    <Image
                      className="imagesize"
                      src={data.movieImage}
                      rounded
                      onClick={() => getSingleTvShowsId(data._id)}
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
                  <h6
                    className="pt-2"
                    onClick={() => getSingleTvShowsId(data._id)}
                  >
                    {data.movieName}
                  </h6>
                  <div className="pb-3">
                    <span>SS {data.seasonName[0].seasonNo}</span>
                    <span className="dot"></span>
                    <span>EPS {data.seasonName[0].episod[0].episodNo}</span>
                    <span className="badge border" style={{ float: "right" }}>
                      {data.type}
                    </span>
                  </div>
                </div>
              )}
            </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
          </div>
          <div>
            <Modal
              show={trailerShow}
              onHide={() => setTrailerShow(false)}
              size="md"
              centered
            >
              <div className="trailerModal">
                <div className=" closebttn">
                  <span className=" buttonClose shadow">
                    <Icon
                      //className="pl-2 pt-2"
                      size={25}
                      icon={close}
                      style={{ color: "#e04646" }}
                      onClick={() => setTrailerShow(false)}
                    />
                  </span>
                </div>
                <div className="startbttn">
                  <Modal.Body>
                    <div className="embed-responsive embed-responsive-4by3">
                      <iframe
                        className="embed-responsive-item"
                        src={trailerUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </Modal.Body>
                </div>
              </div>

              {/* <Modal.Body>
                
                </Modal.Body> */}
            </Modal>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SingleTvShowsView;
