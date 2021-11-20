import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ReactSlider extends Component {
  state = {
    carouselList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getCarouselList()
  }

  getCarouselList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        carouselList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="restaurants-offers-loader" className="loader-container">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderCaraousalView = () => {
    const {carouselList} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    }
    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {carouselList.map(each => (
            <li key={each.id}>
              <img className="carousel-image" alt="offer" src={each.imageUrl} />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
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
        return this.renderCaraousalView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ReactSlider
