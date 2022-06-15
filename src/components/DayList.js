import React, {useState} from "react";
import DayListItem from "./DayListItem";
import classNames from "classnames";

export default function DayList(props) {
  const dayArray = props.days;
  const dayItem = dayArray.map((item) => 
      <DayListItem
        key={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === props.day}
        setDay={props.setDay}
      ></DayListItem>)
  return (
    <ul>
      {dayItem}
    </ul>
  )
}
