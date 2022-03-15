import React from "react";
import styles from "../singleresult.module.css";

const YelpSingleResult = () => {
  return (
    <div className={styles.searchresult}>
      <img
        className={styles.searchresultimg}
        src="https://via.placeholder.com/105"
      />
      <div className={styles.businessdetails}>
        <h4 className={styles.businessname}>Business Name</h4>
        <p>Rating</p>
        <p>Reviews</p>
        <p>
          $$ <span className="tag">Sports Bar</span>{" "}
          <span className="tag">Food</span>
        </p>
      </div>
      <div>
        <p>Number and Street Name</p>
        <p>City Name</p>
      </div>
    </div>
  );
};

export default YelpSingleResult;
