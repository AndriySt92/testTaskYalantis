import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BirthdayItem } from './BirthdayItems'
import './BirthdayPage.css'

export const BirthdayPage = () => {
  const activeEmloyeesByMonth = useSelector((state) => state.employeesPage.activeEmloyeesByMonth)
  const arrayAllEmployees = useSelector((state) => state.employeesPage.arrayAllEmployees)

  return (
    <div className="birthday_page">
      <h1> Employees Birthday </h1>
      {arrayAllEmployees.length === 0 && (
        <div className="no_employees">Employees List is empty</div>
      )}
      <div className="birthday_items">
        {Object.keys(activeEmloyeesByMonth).map((month) => {
          return (
            <div key={month} className="birthday_item">
              {activeEmloyeesByMonth[month].length !== 0 && (
                <div>
                  <h2>{month}</h2>
                  <BirthdayItem
                    activeEmloyeesByMonth={activeEmloyeesByMonth}
                    key={month.id}
                    month={month}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
