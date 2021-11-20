import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header/Header'
import FoodItemCard from '../FoodItemCard/FoodItemCard'
import Footer from '../Footer/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantData: {},
    foodItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedRestaurantData = {
        costForTwo: fetchedData.cost_for_two,
        cuisine: fetchedData.cuisine,
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        location: fetchedData.location,
        name: fetchedData.name,
        rating: fetchedData.rating,
        reviewsCount: fetchedData.reviews_count,
      }
      const updatedFoodItemsData = fetchedData.food_items.map(each => ({
        cost: each.cost,
        foodType: each.food_type,
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.rating,
      }))
      this.setState({
        restaurantData: updatedRestaurantData,
        foodItems: updatedFoodItemsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickAddCartItem = cartItem => {
    const cartData = localStorage.getItem('cartData')
    if (cartData === null) {
      const cartItemData = [cartItem]
      localStorage.setItem('cartData', JSON.stringify(cartItemData))
    } else {
      const cartDataList = localStorage.getItem('cartData')
      const parsedCartData = JSON.parse(cartDataList)
      parsedCartData.push(cartItem)
      localStorage.setItem('cartData', JSON.stringify(parsedCartData))
    }
  }

  onClickDecreaseCartItem = id => {
    const newCartDataList = []
    const cartDataList = localStorage.getItem('cartData')
    const parsedCartData = JSON.parse(cartDataList)
    for (let i = 0; i < parsedCartData.length; i += 1) {
      if (id === parsedCartData[i].id) {
        if (parsedCartData[i].quantity > 1) {
          parsedCartData[i].quantity -= 1
          newCartDataList.push(parsedCartData[i])
        }
      } else {
        newCartDataList.push(parsedCartData[i])
      }
    }
    localStorage.setItem('cartData', JSON.stringify(newCartDataList))
  }

  onClickIncreaseCartItem = id => {
    const cartDataList = localStorage.getItem('cartData')
    const parsedCartData = JSON.parse(cartDataList)
    for (let i = 0; i < parsedCartData.length; i += 1) {
      if (id === parsedCartData[i].id) {
        parsedCartData[i].quantity += 1
      }
    }
    localStorage.setItem('cartData', JSON.stringify(parsedCartData))
  }

  renderRestaurantDetailsView = () => {
    const {restaurantData, foodItems} = this.state
    const {
      costForTwo,
      cuisine,
      imageUrl,
      location,
      name,
      rating,
      reviewsCount,
    } = restaurantData

    return (
      <div>
        <Header />
        <div className="restaurant-con">
          <div className="restaurant-details-con">
            <img
              className="restaurant-details-image"
              src={imageUrl}
              alt="restaurant"
            />
            <div className="restaurant-details-text-con">
              <h1 className="restaurant-details-restaurant-name">{name}</h1>
              <p className="restaurant-details-restaurant-cuisine">{cuisine}</p>
              <p className="restaurant-details-restaurant-location">
                {location}
              </p>
              <div className="restaurant-details-rating-and-cost-con">
                <div className="restaurant-details-rating-and-reviews-con">
                  <div className="restaurant-details-rating-con">
                    <BsFillStarFill />
                    <p className="restaurant-details-rating-text">{rating}</p>
                  </div>
                  <p className="restaurant-details-reviews-text">
                    {reviewsCount}+ Ratings
                  </p>
                </div>
                <hr className="h-line-details" />
                <div>
                  <div className="restaurant-details-cost-con">
                    <BiRupee />
                    <p className="restaurant-details-cost-text">{costForTwo}</p>
                  </div>
                  <p className="restaurant-details-cost-for-two-text">
                    Cost for two
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-card-con">
          {foodItems.map(each => (
            <FoodItemCard
              key={each.id}
              onClickAddCartItem={this.onClickAddCartItem}
              onClickDecreaseCartItem={this.onClickDecreaseCartItem}
              onClickIncreaseCartItem={this.onClickIncreaseCartItem}
              foodItemDetails={each}
            />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div testid="restaurant-details-loader" className="loader-container">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-con">
      <img
        className="failure-view-image"
        alt="not found"
        src="https://res.cloudinary.com/ccbpsama/image/upload/v1637333378/erroring_1_bnmrh3.png"
      />
      <h1 className="failure-view-page-not-found">Page Not Found</h1>
      <p className="failure-view-para">
        We are sorry, the page you requested could not be found. Please go back
        to homepage.
      </p>
      <Link to="/">
        <button className="home-page-button" type="button">
          Home Page
        </button>
      </Link>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default RestaurantDetails
