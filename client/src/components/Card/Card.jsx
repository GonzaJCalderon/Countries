import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ flags, name, continents, id }) {
  return (
    <div className={styles.borde}>
      <div className={styles.contenido}>
        <div>
          <img className={styles.imagen} src={flags} alt="flag" />
        </div>
        <div className={styles.pais}>
          <h4>{name}</h4>
        </div>
        <div>
          <p>{continents}</p>
        </div>
        <div className={styles.detalle}>
          <Link to={`/countries/${id}`}>
            <button className={styles.button}>Detail</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
