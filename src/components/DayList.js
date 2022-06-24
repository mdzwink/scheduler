import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const daysArray = props.days;
  const dayItem = daysArray.map((day) =>  {
    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={e => props.onChange(day.name)}
    />
  });

  return (
    <ul>
      {dayItem}
    </ul>
  );
}
