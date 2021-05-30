import React from 'react'

export const BirthdayItem = (props) => {
  return (
    <div>
      {props.activeEmloyeesByMonth[props.month].map((i) => (
        <ul className="employee_item" key={i.id}>
          <li>
            {i.lastName} {i.firstName} - {i.day} {i.month}, {i.year} year
          </li>
        </ul>
      ))}
    </div>
  )
}
