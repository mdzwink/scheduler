import React from "react";
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

const EMPTY = "Empty";
const SHOW = "Show";
const CREATE = "Create";
const SAVING = "Saving";
const CONFIRM = "Confirm";
const CANCELING = "Canceling";
const EDIT = "Edit";
const ERROR_SAVE = "Error_Save";
const ERROR_DELETE = "Error_Delete";


export default function Appointment(props) {
  const { mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY)
  //initiates the saving process on submission of the Form
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true))
  }
  //initiates the deletion process after the delete button is pressed
  function confirmCancel() {
    transition(CONFIRM)
  }
  function destroy() {
    transition(CANCELING, true);
    props.onDelete(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  }

  function edit() {
    transition(EDIT);
  }
  return (
    <article className="appointment">
      <Header time={props.time} />  
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={ props.interview.interviewer }
          onDelete={confirmCancel}
          onEdit={edit}
          />)}
      {mode === CREATE &&
        <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()} 
        data-testid="Edit"
        />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && 
        <Confirm 
          message={"Are you sure you want to delete this appointment?"}
          onConfirm={destroy}
          onCancel={() => back()}
        />}
      {mode === CANCELING && <Status message={"Deleting"} />}
      {mode === EDIT &&
        <Form
          student={props.interview.student}
          interviewer={props.interview.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={() => back()}/>}
      {mode === ERROR_DELETE && <Error message={"Could not delete appointment"} onClose={() => back()} />}
    </article>
  );
}