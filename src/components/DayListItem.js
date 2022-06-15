import React, { useState } from "react";
import "components/DayListItem.scss";
import classNames from "classnames";



export default function DayListItem(props) {
  const formatSpots = () => {
    if (props.spots === 1) {
      return `${props.spots} spot remaining`
    }
    if (props.spots === 0) {
      return "no spots remaining"
    }
    return `${props.spots} spots remaining`; 
  }
  
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots
  })

  // const [day, setDay] = useState("Monday")
  //     <li onClick={() => setDay(props.name)}>im
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}