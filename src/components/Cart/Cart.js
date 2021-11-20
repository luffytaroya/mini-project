import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import {TiTick} from 'react-icons/ti'
import Header from '../Header/Header'
import Footer from '../Footer/index'
import CartDetails from '../CartDetails/CartDetails'
import './index.css'

class Cart extends Component {
  state = {
    paymentSuccessful: false,
    cartList: [],
  }

  componentDidMount() {
    const cartData = localStorage.getItem('cartData')
    const pharsedCartData = JSON.parse(cartData)
    this.setState({cartList: pharsedCartData})
  }

  renderNoOrdersView = () => (
    <div className="no-orders-container">
      <img
        alt="empty cart"
        src="https://res.cloudinary.com/ccbpsama/image/upload/v1637303407/cooking_1_zbdnbc.png"
      />
      <h1 className="no-orders-head">No Orders Yet!</h1>
      <p className="empty-cart-para">
        Your Cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="order-now-button">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderTotal = () => {
    const cartData = localStorage.getItem('cartData')
    const pharsedCartData = JSON.parse(cartData)
    let total = 0
    for (let i = 0; i < pharsedCartData.length; i += 1) {
      total += pharsedCartData[i].quantity * pharsedCartData[i].cost
    }
    return total
  }

  onClickPaymentSuccessful = () => {
    this.setState(prevState => ({
      paymentSuccessful: !prevState.paymentSuccessful,
    }))
  }

  onClickDecrementFoodQuantity = id => {
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
    const cartData = localStorage.getItem('cartData')
    const modifiedCartData = JSON.parse(cartData)

    this.setState({cartList: modifiedCartData})
  }

  onClickIncrementFoodQuantity = id => {
    const cartDataList = localStorage.getItem('cartData')
    const parsedCartData = JSON.parse(cartDataList)
    for (let i = 0; i < parsedCartData.length; i += 1) {
      if (id === parsedCartData[i].id) {
        parsedCartData[i].quantity += 1
      }
    }
    localStorage.setItem('cartData', JSON.stringify(parsedCartData))
  }

  renderCartItemsView = () => {
    const {cartList} = this.state
    return (
      <div className="footer-and-cart-con">
        <div className="cart-items-container">
          <div className="cart-data-head">
            <h1 className="cart-items-headings">Item</h1>
            <h1 className="cart-items-headings">Quantity</h1>
            <h1 className="cart-items-headings">Price</h1>
          </div>
          <div className="unordered-list-container">
            <ul className="list-cart-items-container">
              {cartList.map(each => (
                <CartDetails
                  onClickIncrementFoodQuantity={
                    this.onClickIncrementFoodQuantity
                  }
                  onClickDecrementFoodQuantity={
                    this.onClickDecrementFoodQuantity
                  }
                  key={each.id}
                  details={each}
                />
              ))}
            </ul>
            <hr className="cart-h-line" />
          </div>
          <div className="total-order-container">
            <h1 className="order-total-text">Order Total:</h1>
            <p testid="total-price" className="total-cost">
              <BiRupee />
              {this.renderTotal()}
            </p>
          </div>
          <div className="place-order-button-con">
            <button
              onClick={this.onClickPaymentSuccessful}
              className="place-order-button"
              type="button"
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="footer-con">
          <Footer />
        </div>
      </div>
    )
  }

  renderCartData = () => {
    const cartData = localStorage.getItem('cartData')
    const emptycartDataOrNot = JSON.parse(cartData)
    return (
      <div>
        <Header />
        <div className="cart-container">
          {emptycartDataOrNot.length === 0
            ? this.renderNoOrdersView()
            : this.renderCartItemsView()}
        </div>
      </div>
    )
  }

  renderPaymentSuccessful = () => (
    <div>
      <Header />
      <div className="payment-container">
        <div className="payment-card">
          <TiTick className="tick" />
          <h1 className="payment-successful-text">Payment Successful</h1>
          <p className="payment-para">
            Thank you for ordering Your payment is successfully completed.
          </p>

          <Link to="/">
            <button type="button" className="go-to-home-page-button">
              Go To Home Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  )

  render() {
    const {paymentSuccessful} = this.state

    return (
      <>
        {paymentSuccessful
          ? this.renderPaymentSuccessful()
          : this.renderCartData()}
      </>
    )
  }
}
export default Cart
