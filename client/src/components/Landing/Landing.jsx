import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import logo from "./logoHome.png";
function Landing() {
  return (
    <div className={style.imagen}>
      <div className={style.contenedor}>
        <div className={style.countryLogo}>
          <div className={style.contenedorLogo}>
            <div>
              <h3 className={style.country}>WELCOME TO COUNTRIES</h3>
              <p className={style.intro}>"This is our countries application. 
                Here you can explore detailed information about countries and tourist activities, 
                as well as create new activities. On the main page, you can search for countries by name, 
                filter by continent and type of activity, and sort them alphabetically or by population. 
                You can also access the details of each country and see its specific characteristics.
                 From the activity creation page, you can add new data and relate it to one or more countries. 
                 Enjoy your experience in our application!"</p>
            </div>
            <div>
              <img src={logo} alt="logo" className={style.logo} />
            </div>
          </div>
          
        </div>
        <div className={style.home}>
          <Link to="/countries">
            <button className={style.button}>TRAVEL</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
