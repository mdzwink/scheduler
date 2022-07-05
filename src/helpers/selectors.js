// returns Array of appointment Objects given state and name of day
export function getAppointmentsForDay(state, day) {
  let matchingDayObj;
  let dayAppointmentArr = [];
  
  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      matchingDayObj = dayObj;
    } 
  }
  if (!matchingDayObj) {
    return [];
  }
  for (let appmnt of matchingDayObj.appointments) {
    if (state.appointments[appmnt]) {
      dayAppointmentArr.push(state.appointments[appmnt]);
    } 
  }
  return dayAppointmentArr;
}
// returns interview Object given state and Object for specific appointment
export function getInterview(state, appointmentData) {
  if (!appointmentData) {
    return null
  }
  const interviewer = state.interviewers[appointmentData.interviewer]
  let interview = { student: appointmentData.student, interviewer };

  return interview;
}

//returns Array of interviewers given state and String name of specific day
export function getInterviewersForDay(state, day) {
  let matchingDayObj;
  let dayInterviewersArr = [];

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      matchingDayObj = dayObj;
    } 
  }
  if (!matchingDayObj) {
    return [];
  }
  for (let appmnt of matchingDayObj.interviewers) {
    if (state.interviewers[appmnt]) {
      dayInterviewersArr.push(state.interviewers[appmnt]);
    } 
  }
  return dayInterviewersArr;
}
