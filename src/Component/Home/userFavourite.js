import React, { useEffect, useState } from "react";
import "./style.scss";
import "@babel/polyfill";
import { Icon } from "react-icons-kit";

import {
  playCircle,
  remove
} from "react-icons-kit/fa";
import { Row, Col,Image} from "react-bootstrap";
import Footer from "../Layout/footer";
import Header from "../Layout/header";
import axios from "axios";
import {SingleFavouriteListApi,DeleteFavouriteApi} from "../../services/API";

const UserFavourite = () => {
    
    
    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const latestMoviesApi = () => {
        let mylogin = JSON.parse(localStorage.getItem("myLoginData"));
        //let id = mylogin.accountName._id;
        let token = mylogin.token;
        let id = mylogin.accountName._id;
        console.log(token);
        console.log(id);
        axios
          .get(SingleFavouriteListApi + `${id}`,{ headers: {"Authorization" : `Bearer ${token}`} }) 
          .then((response) => {
            if (response.data.status) {
              console.log(response.data.Favouritelist);
              setFavouriteMovies(response.data.Favouritelist);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      };
      useEffect(()=>{
          latestMoviesApi();
          
      },[])

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
            window.location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
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
          <div className="mt-3 forpadding1">
            <h4 className="ml-1">Favourite</h4>
          <div className="pt-3 favourite">
            <Row>
              {favouriteMovies.map((data, i) => {
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
                      <span
                        className="badge passwordShow"
                        style={{ float: "right",background:"white" ,cursor:"pointer"}}
                        onClick={()=>DeleteFavourite(data._id)}

                      >
                        <Icon
                          size={17}
                          icon={remove}
                          //className="hoverable"
                          style={{ color: "red"}}
                        />
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
                      <span
                        className="badge passwordShow"
                        style={{ float: "right",background:"white" ,cursor:"pointer"}}

                      >
                        <Icon
                          size={17}
                          icon={remove}
                          //className="hoverable"
                          style={{ color: "red"}}
                          onClick={()=>DeleteFavourite(data._id)}

                        />
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
          

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserFavourite;
