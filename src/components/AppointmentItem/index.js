// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointment, starFun} = props
  const {id, title, date, isStarred} = appointment

  const onChangeStar = () => {
    starFun(id)
  }

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item">
      <div className="head-star-card">
        <p className="title">{title}</p>
        <button
          className="star-btn"
          type="button"
          onClick={onChangeStar}
          data-testid="star"
        >
          <img src={starImg} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
