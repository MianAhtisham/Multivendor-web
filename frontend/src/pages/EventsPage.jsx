import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";
const EventsPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header active={true} />
      <div className="px-4 py-8">
        <EventCard active={true} />
      </div>
    </div>
  );
};

export default EventsPage;
