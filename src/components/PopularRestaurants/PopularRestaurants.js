import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'

import RestaurantCard from '../RestaurantCard/RestaurantCard'

import SortByOption from '../SortByOption/SortByOption'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularRestaurants extends Component {
  state = {
    restaurantList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortByOptions[0].value,
    pageNumber: 1,
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {pageNumber, activeOptionId} = this.state
    const LIMIT = 9
    const offset = (pageNumber - 1) * LIMIT
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        cuisine: each.cuisine,
        rating: each.user_rating.rating,
        totalReviews: each.user_rating.total_reviews,
      }))
      this.setState({
        restaurantList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="restaurants-list-loader" className="loader-container">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  changeSortBy = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurantsList)
  }

  onClickIncreasePageNumber = () => {
    const {pageNumber} = this.state
    if (pageNumber < 20) {
      this.setState(
        prevState => ({
          pageNumber: prevState.pageNumber + 1,
        }),
        this.getRestaurantsList,
      )
    } else {
      this.setState({pageNumber: 20}, this.getRestaurantsList)
    }
  }

  onClickDecreasePageNumber = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(
        prevState => ({
          pageNumber: prevState.pageNumber - 1,
        }),
        this.getRestaurantsList,
      )
    } else {
      this.setState({pageNumber: 1}, this.getRestaurantsList)
    }
  }

  renderPopularRestaurants = () => {
    const {restaurantList, pageNumber, activeOptionId} = this.state
    return (
      <div className="popular-restaurants-container">
        <h1 className="popular-restaurants-text">Popular Restaurants</h1>
        <div className="para-and-sort">
          <p>
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div>
            <SortByOption
              activeOptionId={activeOptionId}
              sortByOptions={sortByOptions}
              changeSortBy={this.changeSortBy}
            />
          </div>
        </div>
        <hr className="h-line" />
        <ul className="restaurant-cards-container">
          {restaurantList.map(each => (
            <RestaurantCard key={each.id} restaurantDetails={each} />
          ))}
        </ul>
        <div className="arrows-container">
          <button
            testid="pagination-left-button"
            onClick={this.onClickDecreasePageNumber}
            className="icon-button-con"
            type="button"
          >
            <IoIosArrowBack />
          </button>
          <p className="page-number-para">
            <span testid="active-page-number">{pageNumber}</span> of 20
          </p>
          <button
            testid="pagination-right-button"
            onClick={this.onClickIncreasePageNumber}
            className="icon-button-con"
            type="button"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    )
  }

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
        return this.renderPopularRestaurants()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default PopularRestaurants
