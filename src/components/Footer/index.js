import {
  FaPinterestSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="items-con">
      <div className="footer-website-logo-and-text">
        <img
          className="website-footer-logo"
          alt="website-footer-logo"
          src="https://res.cloudinary.com/ccbpsama/image/upload/v1637376315/Vector_ynn1xz.png"
        />
        <h1 className="tasty-kitchens"> Tasty Kitchens</h1>
      </div>

      <p className="para-one">
        The only thing we are serious about is food. Contact us on
      </p>

      <div className="icons">
        <FaPinterestSquare testid="pintrest-social-icon" className="icon" />
        <FaInstagram testid="instagram-social-icon" className="icon" />
        <FaTwitter testid="twitter-social-icon" className="icon" />
        <FaFacebookSquare testid="facebook-social-icon" className="icon" />
      </div>
    </div>
  </div>
)

export default Footer
