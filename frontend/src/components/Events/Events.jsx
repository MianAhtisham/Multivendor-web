import React from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard.jsx";

const Events = () => {
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>
      <div className="w-full grid">
        <EventCard />
      </div>
    </div>
  );
};

export default Events;
