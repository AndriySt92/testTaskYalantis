import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestEmployees, setActiveEmployee } from '../../redux/employees'
import { Employees } from './Employees'

export const EmployeesPage = () => {
  const emloyeesByAlphabet = useSelector((state) => state.employeesPage.employeesByAlphabet)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestEmployees())
  }, [])

  const activeEmployeeHandler = (employee, isActive) => {
    dispatch(setActiveEmployee(employee, isActive))
  }
  return (
    <div className="employees_page">
      <h1>Employees</h1>
      <div className="employees_content">
        {Object.keys(emloyeesByAlphabet).map((key) => {
          return (
            <div key={key} className="employee_items">
              <h2>{key}</h2>
              <Employees
                emloyeesByAlphabet={emloyeesByAlphabet}
                key={key.id}
                objKey={key}
                activeEmployeeHandler={activeEmployeeHandler}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
