import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'

import './index.css'

class CartDetails extends Component {
  state = {
    quantityValue: 0,
  }

  componentDidMount() {
    this.renderQuantityValues()
  }

  renderQuantityValues = () => {
    const {details} = this.props
    const {quantity} = details
    this.setState({quantityValue: quantity})
  }

  decreaseQuantity = () => {
    const {details, onClickDecrementFoodQuantity} = this.props

    const {id} = details
    const {quantityValue} = this.state
    if (quantityValue > 1) {
      this.setState(prevState => ({
        quantityValue: prevState.quantityValue - 1,
      }))
    }
    onClickDecrementFoodQuantity(id)
  }

  increaseQuantity = () => {
    const {details, onClickIncrementFoodQuantity} = this.props
    const {id} = details

    this.setState(prevState => ({
      quantityValue: prevState.quantityValue + 1,
    }))

    onClickIncrementFoodQuantity(id)
  }

  render() {
    const {details} = this.props
    const {imageUrl, name, cost} = details
    const {quantityValue} = this.state

    return (
      <li testid="cartItem" className="list-cart-item">
        <div className="cart-item-food-name-and-image-con">
          <img className="cart-item-food-image" src={imageUrl} alt={name} />
          <h1 className="cart-item-food-name">{name}</h1>
        </div>
        <div className="quantity-container">
          <button
            testid="decrement-quantity"
            className="decrease-button"
            type="button"
            onClick={this.decreaseQuantity}
          >
            -
          </button>
          <div>
            <p testid="item-quantity" className="quantity-value">
              {quantityValue}
            </p>
          </div>
          <button
            testid="increment-quantity"
            className="increase-button"
            type="button"
            onClick={this.increaseQuantity}
          >
            +
          </button>
        </div>
        <div className="cost-container">
          <BiRupee />
          <p>{quantityValue * cost}</p>
        </div>
      </li>
    )
  }
}

export default CartDetails
