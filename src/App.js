
import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import CastView from "./Component/Home/castView";
//import SingleCountryView from "./Component/Home/singleCountryview";
import Home from "./Component/Home/home";
import ImdbView from "./Component/Home/imdbView";
import SingleCountryView from "./Component/Home/singleCountryView";
import SingleGenreView from "./Component/Home/singleGenreView";
import SingleMovieVersionView from "./Component/Home/singleMovieVersionView";
import SingleMovieView from "./Component/Home/singleMovieView";
import SingleTvShowsTypeView from "./Component/Home/singleTvShowsTypeView";
import SingleTvShowsView from "./Component/Home/singleTvShowsView";
import UserFavourite from "./Component/Home/userFavourite";
import UserProfile from "./Component/Home/userProfile";



function App() {
  // //authenticated page......
  // if (sessionStorage.getItem("token")) {
    return (
      <div className="App">
        <Router>
          <Switch>

             
            <Route path ="/" exact component={Home}></Route>
            <Route path ="/singlemovieview/:id" exact component={SingleMovieView}/>
            <Route path ="/singletvshowsview/:id" exact component={SingleTvShowsView}/>
            <Route path ="/castview/:id" exact component={CastView} />
            <Route path ="/countryview/:id" exact component={SingleCountryView} />
            <Route path = "/genreview/:id" exact component={SingleGenreView} />
            <Route path = "/moviesview/:id" exact component={SingleMovieVersionView} />
            <Route path = "/tvshowsview/:id" exact component={SingleTvShowsTypeView} />
            <Route path = "/imdbview" exact component = {ImdbView} />
            <Route path = "/user/profile" exact component = {UserProfile} />
            <Route path = "/user/favourite/:id" exact component = {UserFavourite}/>
            

            {/* <Redirect to="/home"/> */}

          </Switch>
        </Router>
      </div>
    );
  // }

  //public pages.....
  // else {
  //   return (
  //     <div className="App">
  //       <Router>
  //         <Switch>
  //              <Route path="/" exact component={Login}></Route>
  //               <Redirect to="/"/> 
  //         </Switch>
  //       </Router>
  //     </div>
  //   );
  // }
}

export default App;
