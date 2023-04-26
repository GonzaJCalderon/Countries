import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/Navbar";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  allCountries,
  clear,
  sort,
  sorNumerico,
  sortContinent,
  sortActivity,
} from "../../Redux/actions";
import style from "./Home.module.css";
import Paginado from "../Paginado/Paginado";
import loading from "./logoapp1-01.png";

function Home() {
  const { countries, allActivity } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allCountries());
    dispatch(clear());
  }, [dispatch]);

  // filtro por continente
  let filtroActivity = allActivity.filter((c) => {
    if (c.activities && c.activities[0]) {
      return c.activities;
    }
    return false;
  })
  
  let arrayActivity = filtroActivity.map((c) => c.activities[0]["name"]);
  let arrayActivity1 = arrayActivity.filter((item, index) => {
    return arrayActivity.indexOf(item) === index;
  });

  //------ Paginacion---
  const [pag, setPag] = useState(1);
  const [countriesPag] = useState(10); // Number of countries to display per page
  let [input, setInput] = useState(1);
  let datos = countries === "The country was not found" ? "0" : countries;
  const max = Math.ceil(
    datos?.length ? datos.length / countriesPag : datos.length / countriesPag
  );

  function handleSelectAlfabetico(e) {
    e.preventDefault();
    dispatch(sort(e.target.value));
    setInput((input = 1));
    setPag(1);
  }
  function handleSelectPopulation(e) {
    e.preventDefault();
    dispatch(sorNumerico(e.target.value));
    setInput((input = 1));
    setPag(1);
  }
  function handleSelectContinent(e) {
    dispatch(sortContinent(e.target.value));
    setInput((input = 1));
    setPag(1);
  }
  function handleSelectActivity(e) {
    dispatch(sortActivity(e.target.value));
    setInput((input = 1));
    setPag(1);
  }

  return (
    <div className={style.imagen}>
      <NavBar setInput={setInput} setPag={setPag} />
      <nav className={style.opciones}>
        <select
          className={style.orden}
          onChange={(e) => handleSelectAlfabetico(e)}
        >
          <option>ORDER</option>
          <option value="asc">Asc</option>
          <option value="des">Des</option>
        </select>
        <select
          className={style.poblacion}
          onChange={(e) => handleSelectPopulation(e)}
        >
          <option>POBLATION</option>
          <option value="asc">Asc</option>
          <option value="des">Des</option>
        </select>
        <select
          className={style.poblacion}
          onChange={(e) => handleSelectContinent(e)}
        >
          <option>CONTINENTS</option>
          <option value="todos">All Contitentes</option>
          <option value="Africa">Africa</option>
          <option value="South America">South America</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select
          className={style.actividad}
          onChange={(e) => handleSelectActivity(e)}
        >
          <option>ACTIVITY</option>
          {arrayActivity1?.map((item) => {
            return (
              <option value={item} key={Math.random()}>
                {item}
              </option>
            );
          })}
        </select>
      </nav>

      <Paginado
        pag={pag}
        setPag={setPag}
        max={max}
        input={input}
        setInput={setInput}
      />
      <div className={style.cardContent}>
        {!countries.length ? (
          <div className={style.loading}>
            <img src={loading} className={style.imagenLoading} alt={""}/>
          </div>
        ) : countries === "The country was not found" ? (
          <h1 className={style.search}>
            ! Ups we did not find the Country!
            <br />
            Please try again
          </h1>
        ) : (
          countries
            .slice(
              (pag - 1) * countriesPag,
              (pag - 1) * countriesPag + countriesPag
            )
            .map((country) => {
              return (
                <div>
                  <Card
                    flags={country.flags}
                    name={country.name}
                    continents={country.continents}
                    key={country.id}
                    id={country.id}
                    activities={country.activities}
                  />
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default Home;
