import React, { useSelect } from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

const InterviewerListItem = function(props) {
  
  let interviewerClass = classNames("interviewers__item--selected", {
    "interviewers__item--selected": props.selected
  })

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
    />
    {props.selected && props.name}
    </li>
  );
}

export default InterviewerListItem;