import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="failure-view-image"
      alt="not found"
      src="https://res.cloudinary.com/ccbpsama/image/upload/v1637333378/erroring_1_bnmrh3.png"
    />
    <h1 className="failure-view-page-not-found">Page Not Found</h1>
    <p className="failure-view-para">
      We are sorry, the page you requested could not be found. Please go back to
      homepage.
    </p>
    <Link to="/">
      <button className="home-page-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
