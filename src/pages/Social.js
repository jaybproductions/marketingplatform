import React, { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useParams } from "react-router-dom";
import EventModal from "../components/social/EventModal";
import AddEventModal from "../components/social/AddEventModal";
import UserContext from "../contexts/UserContext";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { GetSocialPostsFromFirebase } from "../utils/Database/Social/GetSocialPostsFromFirebase";

const SocialPage = (props) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState([]);

  const [eventsArray, setEventsArray] = useState([]);
  const [image, setImage] = useState("");
  const [eventDetails, setEventDetails] = useState(null);
  const [openEvent, setOpenEvent] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  let params = useParams();
  let client = params.client;
  let userID = params.userid;

  useEffect(() => {
    if (!user) return;
    HandleGetSocialPostsFromFirebase();
  }, [user]);

  useEffect(() => {
    if (eventDetails !== null) {
      setOpenEvent(true);
    }
  }, [eventDetails]);

  const HandleGetSocialPostsFromFirebase = async () => {
    const socialPostsArr = await GetSocialPostsFromFirebase(user.uid);
    setEventsArray(socialPostsArr);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEvent(false);
    setOpenLogin(false);
  };
  const events = eventsArray;
  const localizer = momentLocalizer(moment);

  const handleSelect = (date) => {
    const results = Object.values(date.slots).toString();
    console.log(date.slots);
    console.log(results);
    setOpen(true);
    setTime(results);
  };

  const handleEventSelect = async (event) => {
    setEventDetails([event]);
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];

    setImage(file);
  };

  return (
    <div className="social">
      <div className="dialog">
        {user && (
          <AddEventModal
            open={open}
            time={time}
            handleFileRead={handleFileRead}
            handleClose={handleClose}
            client={client}
            image={image}
            getEvents={HandleGetSocialPostsFromFirebase}
            userID={user.uid}
          />
        )}

        <EventModal
          eventDetails={eventDetails}
          openEvent={openEvent}
          handleClose={handleClose}
        />
      </div>
      <div className="calendar">
        <Calendar
          selectable={true}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh" }}
          onSelectSlot={handleSelect}
          onSelectEvent={handleEventSelect}
          eventPropGetter={(event, start, end, isSelected) => {
            let newStyle = {
              backgroundColor: "lightgrey",
              color: "black",
              borderRadius: "0px",
              border: "none",
            };

            if (event.platform == "Facebook") {
              newStyle.backgroundColor = "#3b5998";
              newStyle.color = "white";
            } else if (event.platform === "Instagram") {
              newStyle.backgroundColor = "#F56040";
            } else if (event.platform === "LinkedIn") {
              newStyle.backgroundColor = "#0e76a8";
            } else if (event.platform === "Twitter") {
              newStyle.backgroundColor = "#00acee";
            }

            return {
              className: "",
              style: newStyle,
            };
          }}
        />
      </div>
    </div>
  );
};

export default SocialPage;
