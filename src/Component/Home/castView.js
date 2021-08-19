import React, { useEffect, useState } from "react";
import "./style.scss";
import "@babel/polyfill";
import { Icon } from "react-icons-kit";
//import pic2 from "../../images/img2.jpg";
//import { Link } from "react-router-dom";
//import ReactPlayer from "react-player/lazy";
//import pic5 from "../../images/img5.jpg";

import {
  playCircle,
  // thumbsUp,
  // thumbsDown,
  // play,
  // plus,
  // videoCamera,
  //arrowRight,
} from "react-icons-kit/fa";
//import { DownOutlined } from "@ant-design/icons";
import { Row, Col, Image } from "react-bootstrap";
import Footer from "../Layout/footer";
import Header from "../Layout/header";

import axios from "axios";
import { SingleCastApi } from "../../services/API";

const DATE_OPTIONS = { year: "numeric", month: "short", day: "numeric" };

const CastView = (props) => {
  //const [actressImage, setActressImage] = useState(null);
  //const [quality, setQuality] = useState("HD");

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState("");
  const [imgCast, setImgCast] = useState();
  const [relatedMovie, setRelatedMovie] = useState([]);

  const SingleCastId = props.match.params.id;

  const singleCastMethod = (id) => {
    //console.log(id);
    axios
      .get(SingleCastApi + `${id}`)
      .then((response) => {
        if (response.data.status) {
          let actressData = response.data.actress;
          console.log(actressData);
          setName(actressData.name);
          setDob(actressData.dob);
          setCountry(actressData.country);
          setAbout(actressData.about);

          let actressImage = response.data.actressImageFile;
          setImgCast(actressImage[0].actressImage);

          let movieData = response.data.movie;
          console.log(movieData);
          setRelatedMovie(movieData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    singleCastMethod(SingleCastId);
  }, [SingleCastId]);

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
          <div
            className=" container-fluid pt-5 forpadding1"
            style={{ background: "#f5f5f3" }}
          >
            <div className="py-4 row">
              <div
                className="p-4 card border-0 col-12  col-xl-7 cast1"
                style={{ borderRadius: 15 }}
              >
                <Row>
                  <Col xxl={2} lg={3} md={3} sm={6} xs={12} className=" colSize hdCol">
                    <div className="imageContainer">
                      <Image
                        className="imagesize"
                        name="actressImage"
                        src={imgCast}
                        rounded
                      />
                    </div>
                  </Col>
                  <Col className=" watchCol">
                    <Row className="movieName">
                      <Col className="">
                        <h4 style={{ fontSize: 25, fontWeight: 450 }}>
                          {name}
                        </h4>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <span style={{ fontSize: 15 }}>
                          {" "}
                          <span style={{ fontWeight: 500 }}>
                            Date Of Birth :{" "}
                          </span>
                          {new Date(dob).toLocaleDateString(
                            "en-US",
                            DATE_OPTIONS
                          )}{" "}
                        </span>
                        <br />
                        <span style={{ fontSize: 15 }}>
                          {" "}
                          <span style={{ fontWeight: 500 }}>Country : </span>
                          {country}{" "}
                        </span>
                        <br />
                        <span style={{ fontSize: 15 }}>
                          {" "}
                          <span style={{ fontWeight: 500 }}>About : </span>
                          {about}{" "}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <div
                className="card border-0 col-12  col-xl-4 col-md-6 castadd"
                style={{ borderRadius: 15, height: "auto" }}
              >
                <h1>Attached Add Here</h1>
              </div>
            </div>
            <div className="pt-2 forpadding">
              {/* <h3 className="pt-4">You may also like </h3> */}
              <div className="pt-3">
                <Row>
                  {relatedMovie.map((data, i) => {
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
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CastView;
