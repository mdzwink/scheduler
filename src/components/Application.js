import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors.js";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const appointmentsArr = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointmentsArr.map(appointment => {
    const interviewReturn = getInterview(state, appointment.interview); //
    let interview = null;
    if (interviewReturn) {
      interview = {...interviewReturn, id: interviewReturn.interviewer.id, interviewer: interviewReturn.interviewer.name };
    }
    console.log("TEST>>>", interview)
    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}    // passing interview to Appointment props
      interviewers={interviewers}
      bookInterview={bookInterview}
      onDelete={cancelInterview}
    />
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
