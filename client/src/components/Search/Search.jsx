import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { countryByName } from "../../Redux/actions";
import style from "./Search.module.css";
import Lupa from "./lupa.png";

function Search({ setInput, setPag }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSumit(e) {
    e.preventDefault();
    dispatch(countryByName(name));
    setName("");
    setInput(1);
    setPag(1);
  }

  return (
    <div className={style.contenedor}>
      <input
        className={style.input}
        type="search"
        name="search"
        value={name}
        onChange={(e) => handleChange(e)}
        placeholder="Search country"
      />
      <button className={style.button} onClick={(e) => handleSumit(e)}>
        <img
          src={Lupa}
          className={style.button_img}
          alt="img_button_search"
        />
      </button>
    </div>
  );
}

export default Search;
