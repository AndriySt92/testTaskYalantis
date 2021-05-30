import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import './EmployeesPage.css'

export const Employee = ({ item, activeEmployeeHandler }) => {
  const [activeItem, setActiveItem] = useState(false)

  useEffect(() => {
    const activeEmploye = localStorage.getItem(item.id)
    if (activeEmploye !== null) {
      setActiveItem(true)
      activeEmployeeHandler(item, true)
    }
  }, [])

  const onChangeHandlerInput = (isActive) => {
    const boolean = isActive === 'true' ? true : false

    setActiveItem(boolean)
    if (boolean) {
      localStorage.setItem(item.id, item.id)
      activeEmployeeHandler(item, true)
    } else {
      localStorage.removeItem(item.id)
      activeEmployeeHandler(item, false)
    }
  }

  if (item.noMatch) {
    return <div>{item.noMatch}</div>
  }
  return (
    <div className="employee_item">
      <div key={item.id} className={classNames('employee_item_name', { active: activeItem })}>
        {item.lastName} {item.firstName}
      </div>
      <form className="employee_item_form">
        <fieldset>
          <input
            type="radio"
            value="false"
            name="notActive"
            checked={activeItem === false}
            onChange={(e) => onChangeHandlerInput(e.target.value)}
          />
          <label htmlFor="notActive">Not active</label>
          <br />
          <input
            type="radio"
            value="true"
            name="active"
            checked={activeItem === true}
            onChange={(e) => onChangeHandlerInput(e.target.value)}
          />
          <label htmlFor="active">Active</label>
          <br />
        </fieldset>
      </form>
    </div>
  )
}
