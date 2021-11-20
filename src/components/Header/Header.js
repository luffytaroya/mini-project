import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-and-carousel">
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-large-container">
            <Link className="nav-link" to="/">
              <div className="website-logo-and-text">
                <img
                  className="website-logo"
                  alt="website logo"
                  src="https://res.cloudinary.com/ccbpsama/image/upload/v1636948599/Group_7420_fqmbec.png"
                />
                <p className="tasty-kitchens-text">Tasty Kitchens</p>
              </div>
            </Link>
            <div className="nav-buttons">
              <ul className="nav-home-and-cart">
                <li>
                  <Link className="home-link" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="cart-link" to="/cart">
                    Cart
                  </Link>
                </li>
              </ul>
              <button
                className="logout-button"
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default withRouter(Header)
