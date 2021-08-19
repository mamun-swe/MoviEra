import React, { useEffect, useState } from "react";
import "./style.scss";
import "@babel/polyfill";
import { Icon } from "react-icons-kit";
import ReactPaginate from "react-paginate";
import { Nav, Tab, Row, Col, Image } from "react-bootstrap";

import { playCircle } from "react-icons-kit/fa";
import Footer from "../Layout/footer";
import Header from "../Layout/header";
import axios from "axios";
import {
  ImdbMovieListApi,
  ImdbTvShowsListApi,
  ImdbAllListApi,
} from "../../services/API";

const ImdbView = () => {
  const [movie, setMovie] = useState([]);
  const [all, setAll] = useState([]);
  const [tv, setTv] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);

  const moviePerPage = 12;
  const pagesVisited = pageNumber * moviePerPage;

  const displayall = (
    <div className="pt-3">
      <Row>
        {all.slice(pagesVisited, pagesVisited + moviePerPage).map((data, i) => {
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
  );

  const displaymovie = (
    <div className="pt-3">
      <Row>
        {movie
          .slice(pagesVisited, pagesVisited + moviePerPage)
          .map((data, i) => {
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
                <h6 className="pt-2" onClick={() => getSingleMovieId(data._id)}>
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
  );

  const displaytvshows = (
    <div className="pt-3">
      <Row>
        {tv.slice(pagesVisited, pagesVisited + moviePerPage).map((data, i) => {
          return (
            <Col key={i} lg={2} md={3} sm={6} xs={12} className="pr-1 colSize">
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

              <span className="badge p-1 border hd" style={{ float: "right" }}>
                {data.movieQuality}
              </span>
              <h6 className="pt-2" onClick={() => getSingleTvShowsId(data._id)}>
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
            </Col>
          );
        })}
      </Row>
    </div>
  );

  const pageCount = Math.ceil(movie.length / moviePerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  //const SingleGenreId = props.match.params.id;

  const imdbMovieMethod = () => {
    //console.log(id);
    axios
      .get(ImdbMovieListApi)
      .then((response) => {
        if (response.data.status) {
          let movieData = response.data.MoviesList;
          console.log(movieData);
          setMovie(movieData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const imdbAllMethod = () => {
    //console.log(id);
    axios
      .get(ImdbAllListApi)
      .then((response) => {
        if (response.data.status) {
          let movieData = response.data.MoviesList;
          console.log(movieData);
          setAll(movieData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const imdbTvMethod = () => {
    //console.log(id);
    axios
      .get(ImdbTvShowsListApi)
      .then((response) => {
        if (response.data.status) {
          let movieData = response.data.MoviesList;
          console.log(movieData);
          setTv(movieData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    imdbMovieMethod();
    imdbAllMethod();
    imdbTvMethod();
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

  return (
    <div style={{ background: "#f5f5f3" }}>
      <div className="singleView">
        <Header />
        <div className="container-fluid">
          <div className="pt-3 tablink tablinkImdb forpadding1">
            <Tab.Container id="left-tabs-example" defaultActiveKey="all">
              <Nav variant="pills">
                <Nav.Item>
                  <h3 className="pr-4">Top IMDB Rating </h3>
                </Nav.Item>
                <Nav.Item className="pr-2">
                  <Nav.Link eventKey="all">All</Nav.Link>
                </Nav.Item>
                <Nav.Item className="pr-2">
                  <Nav.Link eventKey="first">Movies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second"> TV Shows</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="all">
                  <div className="pt-1">
                    <div
                      className=" container-fluid pt-5"
                      style={{ background: "#f5f5f3" }}
                    >
                      <div className="pt-2">
                        <ReactPaginate
                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName={"paginationBttns"}
                          previousLinkClassName={"previousBttn"}
                          nextLinkClassName={"nextBttn"}
                          disabledClassName={"paginationDisabled"}
                          activeClassName={"paginationActive"}
                        />
                        {displayall}
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="first">
                  <div className="pt-3">
                    <div
                      className=" container-fluid pt-5 "
                      style={{ background: "#f5f5f3" }}
                    >
                      <div className="pt-2 ">
                        <ReactPaginate
                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName={"paginationBttns"}
                          previousLinkClassName={"previousBttn"}
                          nextLinkClassName={"nextBttn"}
                          disabledClassName={"paginationDisabled"}
                          activeClassName={"paginationActive"}
                        />
                        {displaymovie}
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div>
                    <div
                      className=" container-fluid pt-5 "
                      style={{ background: "#f5f5f3" }}
                    >
                      <div className="pt-2 ">
                        <ReactPaginate
                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName={"paginationBttns"}
                          previousLinkClassName={"previousBttn"}
                          nextLinkClassName={"nextBttn"}
                          disabledClassName={"paginationDisabled"}
                          activeClassName={"paginationActive"}
                        />
                        {displaytvshows}
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>

          {/* <div className="row">
            <div
              className="card rounded bg-white col-md-3 col-lg-3 col-6 m-auto"
              style={{ height: 125 }}
            >
              <h2>Attached add Here</h2>
            </div>
          </div> */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ImdbView;
