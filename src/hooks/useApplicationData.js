import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({...state, day});

  // returns new Array of day Objects with updated spots count. Requires state and appointments Array with updated interview data.
  const updateSpots = function(state, appointments) {
    let spotsCount = 0;
    let theDay = state.days.find(day => day.name === state.day);
    let newDay = {...theDay};
    let newDaysArr = [...state.days];
    let newDayIndex = newDaysArr.findIndex((day) => day.name === state.day);
    
    for (let id of newDay.appointments) {
      if (!appointments[id].interview) {
        spotsCount += 1;
      }
    }
    newDay.spots = spotsCount;
    newDaysArr.splice(newDayIndex, 1, newDay);

    return newDaysArr;
  };

  // returns promise from axios call. Updates api database with new appointment given appointment id and interview object.
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments);

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => setState({...state, days, appointments}));
  }

  // returns promise from axios call. Updates appointment Object in api database. Sets assosiated interview value to null. Requires appointment id.
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments);

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState({...state, days, appointments}))
  }

  // initial axios calls to api database on refresh
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
    .catch((err) => console.log('ERROR FROM useEffect>>>', err))
  }, []);

  return { state, setDay, bookInterview, cancelInterview};
}
