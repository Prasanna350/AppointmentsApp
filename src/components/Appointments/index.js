// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'

const appointmentsList = []

class Appointments extends Component {
  state = {
    stateAppointmentList: appointmentsList,
    title: '',
    date: '',
    starBtn: false,
  }

  starFun = id => {
    this.setState(prevState => ({
      stateAppointmentList: prevState.stateAppointmentList.map(
        eachAppointment => {
          if (eachAppointment.id === id) {
            return {...eachAppointment, isStarred: !eachAppointment.isStarred}
          }
          return eachAppointment
        },
      ),
    }))
  }

  starBtnFun = () => {
    this.setState(prevState => ({
      starBtn: !prevState.starBtn,
    }))
  }

  titleInputEle = event => {
    this.setState({title: event.target.value})
  }

  dateInputEle = event => {
    this.setState({date: event.target.value})
  }

  onAddButton = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    console.log(newAppointment)
    this.setState(prevState => ({
      stateAppointmentList: [...prevState.stateAppointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  render() {
    const {stateAppointmentList, starBtn, title, date} = this.state
    const actualAppointmentList = starBtn
      ? stateAppointmentList.filter(
          eachAppointment => eachAppointment.isStarred === true,
        )
      : stateAppointmentList
    const starBtnClassName = starBtn ? 'starred-btn' : 'star-btn'

    return (
      <div className="background-bg">
        <div className="white-card">
          <div className="details-card">
            <div>
              <h1 className="appointment-head">Add Appointment</h1>
              <form>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Title"
                  className="input-ele"
                  id="title"
                  value={title}
                  onChange={this.titleInputEle}
                />
                <br />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  className="input-ele"
                  id="date"
                  onChange={this.dateInputEle}
                  value={date}
                />
                <br />
                <button
                  type="submit"
                  className="add-button"
                  onClick={this.onAddButton}
                >
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-img"
              />
            </div>
          </div>
          <hr className="mediator-line" />
          <div className="head-card">
            <h1 className="list-head">Appointments</h1>
            <button
              type="button"
              className={`star-btn-default ${starBtnClassName}`}
              onClick={this.starBtnFun}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-card">
            {actualAppointmentList.map(eachAppointment => (
              <AppointmentItem
                appointment={eachAppointment}
                starFun={this.starFun}
                key={eachAppointment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
