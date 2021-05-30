import axios from 'axios'

const SET_EMPLOYEES = 'SET_EMPLOYEES'
const SET_IS_ACTIVE = 'SET_IS_ACTIVE'
const SET_ACTIVE_EMPLOYE = 'SET_ACTIVE_EMPLOYE'

const initialState = {
  emloyees: [],
  employeesByAlphabet: {},
  activeEmloyeesByMonth: {
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
    January: [],
    February: [],
    March: [],
    April: [],
  },
  isAddActiveEmployees: false,
  arrayAllEmployees: [],
}
const employees = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEES:
      let employees = action.payload

      // generate an object with an alphabet
      let alphabets
      function generateAlphabets() {
        alphabets = {}
        let start = 'A'.charCodeAt(0)
        let last = 'Z'.charCodeAt(0)
        for (let i = start; i <= last; ++i) {
          alphabets[String.fromCharCode(i).toString()] = []
        }
        return alphabets
      }
      generateAlphabets()

      //sort employees by alphabets
      for (let key in alphabets) {
        employees.forEach((item) => {
          if (key === item.lastName.charAt(0)) {
            alphabets[key].push(item)
          } else {
            return
          }
        })
        if (alphabets[key].length == 0) {
          alphabets[key].push({ noMatch: '-----' })
        }
      }
      return {
        ...state,
        emloyees: action.payload,
        employeesByAlphabet: alphabets,
      }

    case SET_ACTIVE_EMPLOYE:
      let employee = action.payload.employee
      let employeeObj = {}
      const monthNames = [
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
        'January',
        'February',
        'March',
        'April',
      ]
      let activeEmloyeesByMonth = state.activeEmloyeesByMonth
      const birthday = new Date(Date.parse(employee.dob))
      let day = birthday.getDate()
      let monthIndex = birthday.getMonth()
      let month = monthNames[monthIndex]
      let year = birthday.getFullYear()
      employeeObj = {
        day,
        month,
        year,
        id: employee.id,
        lastName: employee.lastName,
        firstName: employee.firstName,
      }
      if (action.payload.isActive) {
        activeEmloyeesByMonth[month] = [...activeEmloyeesByMonth[month], employeeObj].sort(
          (a, b) => a.lastName - b.lastName,
        )
      } else {
        activeEmloyeesByMonth[month] = activeEmloyeesByMonth[month]
          .filter((e) => e.id !== employee.id)
          .sort((a, b) => a.lastName - b.lastName)
      }

      return {
        ...state,
        activeEmloyeesByMonth,
        isAddActiveEmployees: !state.isAddActiveEmployees,
        arrayAllEmployees: [].concat.apply([], Object.values(state.activeEmloyeesByMonth)),
      }
    default:
      return state
  }
}

const setEmployees = (emloyees) => ({
  type: SET_EMPLOYEES,
  payload: emloyees,
})

export const setActiveEmployee = (employee, isActive) => ({
  type: SET_ACTIVE_EMPLOYE,
  payload: { employee, isActive },
})

export const requestEmployees = () => async (dispatch) => {
  try {
    let response = await axios.get(`https://yalantis-react-school-api.yalantis.com/api/task0/users`)
    if (response.status === 200) {
      dispatch(setEmployees(response.data))
    }
  } catch (e) {
    alert('не сработает')
  }
}
export default employees
