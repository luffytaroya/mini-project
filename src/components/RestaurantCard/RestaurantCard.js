import {Link} from 'react-router-dom'
import './index.css'

const RestaurantCard = props => {
  const {restaurantDetails} = props
  const {imageUrl, name, cuisine, rating, totalReviews, id} = restaurantDetails
  return (
    <li test="restaurant-item" className="restaurant-card">
      <Link to={`/restaurant/${id}`} className="link-item">
        <img className="restaurant-image" src={imageUrl} alt="restaurant" />
        <div className="restaurant-card-text">
          <div className="name-cuisine-container">
            <p className="restaurant-name">{name}</p>
            <p className="restaurant-cuisine">{cuisine}</p>
          </div>

          <div className="restaurant-rating-con">
            <img
              className="star"
              alt="star"
              src="https://res.cloudinary.com/ccbpsama/image/upload/v1637063034/7_Rating_dqrpig.png"
            />
            <p className="rating-text">{rating}</p>
            <p className="restaurant-total-reviews">({totalReviews} rating)</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantCard
