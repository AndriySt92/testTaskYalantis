import React from 'react'
import { Employee } from './Employee'
import './EmployeesPage.css'

export const Employees = ({ objKey, emloyeesByAlphabet, activeEmployeeHandler }) => {
  return (
    <div>
      {emloyeesByAlphabet[objKey].map((item) => (
        <Employee
          item={item}
          activeEmployeeHandler={activeEmployeeHandler}
          key={`${item.id}_${item.lastName}`}
        />
      ))}
    </div>
  )
}
