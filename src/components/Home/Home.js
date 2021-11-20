import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Header from '../Header/Header'
import PopularRestaurants from '../PopularRestaurants/PopularRestaurants'
import ReactSlider from '../ReactSlider/ReactSlider'
import Footer from '../Footer/index'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <ReactSlider />
      <PopularRestaurants />
      <Footer />
    </>
  )
}

export default Home
