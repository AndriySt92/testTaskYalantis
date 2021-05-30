import React from 'react'
import './App.css'
import { BirthdayPage } from './Components/BirthdayPage/BirthdayPage'
import { EmployeesPage } from './Components/EmployeesPage/EmployeesPage'

function App() {
  return (
    <div className="container">
      <div className="content">
        <EmployeesPage />
        <BirthdayPage />
      </div>
    </div>
  )
}

export default App
