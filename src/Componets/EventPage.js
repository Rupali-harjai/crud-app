import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { getUser } from "../user";

const EventPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    get();
  }, []);

  const user = getUser();

  const get = () => {
    const events = JSON.parse(localStorage.getItem("events"));
    setEvents(events.filter((o) => o.userId === user.id || []));
  };

  const deleteEvent = (id) => {
    const data = [];
    const events = JSON.parse(localStorage.getItem("events"));
    data.push(...events.filter((e) => e.id !== id));
    localStorage.setItem("events", JSON.stringify(data));
    get();
  };
  return (
    <div>
      <Profile
        children={
          <button
            style={{ width: "80px" }}
            onClick={() => navigate("/events/new")}
          >
            Add Event
          </button>
        }
      />
      <div className="eventPage">
        <table className="table">
          <thead>
            <tr>
              <th width="6%">No.</th>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>Event Date</th>
              <th>Event Type</th>
              <th width="15%" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {events?.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
                <td>{item.price}</td>
                <td>{item.type}</td>
                <td>
                  <button onClick={() => navigate(`/events/${item.id}`)}>
                    Edit
                  </button>
                  <button onClick={() => deleteEvent(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!events.length && (
          <p style={{ textAlign: "center", marginTop: "15px" }}>No Results</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
