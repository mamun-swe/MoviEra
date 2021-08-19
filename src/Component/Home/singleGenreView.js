import React, { useEffect, useState } from "react";
import "./style.scss";
import "@babel/polyfill";
import { Icon } from "react-icons-kit";
import ReactPaginate from "react-paginate";

import {
  playCircle,
} from "react-icons-kit/fa";
import { Row, Col, Image } from "react-bootstrap";
import Footer from "../Layout/footer";
import Header from "../Layout/header";
import axios from "axios";
import { SingleGenreApi } from "../../services/API";

const SingleGenreView = (props) => {
  const [movie, setMovie] = useState([]);

  const [genreName, setGenreName] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  const moviePerPage = 12;
  const pagesVisited = pageNumber * moviePerPage;

  const displaymovie = (
    <div className="pt-3">
      <Row>
        {movie
          .slice(pagesVisited, pagesVisited + moviePerPage)
          .map((data, i) => {
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

  const pageCount = Math.ceil(movie.length / moviePerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const SingleGenreId = props.match.params.id;

  const singleGenreMethod = (id) => {
    //console.log(id);
    axios
      .get(SingleGenreApi + `${id}`)
      .then((response) => {
        if (response.data.status) {
          let genreData = response.data.genreName;
          console.log(genreData);
          setGenreName(genreData.genre);

          let movieData = response.data.movie;
          console.log(movieData);
          setMovie(movieData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    singleGenreMethod(SingleGenreId);
  }, [SingleGenreId]);

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
          <div className="mt-3 forpadding1">
            <h3 className="ml-3">{genreName} Movies and TV Shows
</h3>
          </div>
          <div className="row">
            <div
              className="card rounded bg-white col-md-3 col-lg-3 col-6 m-auto"
              style={{ height: 125 }}
            >
              <h2>Attached add Here</h2>
            </div>
          </div>
          <div
            className=" container-fluid pt-5 forpadding1"
            style={{ background: "#f5f5f3" }}
          >
            <div className="pt-2 forpadding">

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

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SingleGenreView;
