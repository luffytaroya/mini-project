import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {BsFillStarFill} from 'react-icons/bs'

import Counter from '../Counter/index'

import './index.css'

class FoodItemCard extends Component {
  state = {
    quantity: 0,
  }

  onClickAddQuantity = () => {
    const {onClickAddCartItem, foodItemDetails} = this.props
    const quantity = 1
    const cartItem = {...foodItemDetails, quantity}
    onClickAddCartItem(cartItem)
    this.setState({
      quantity: 1,
    })
  }

  onDecrementItem = () => {
    const {onClickDecreaseCartItem, foodItemDetails} = this.props
    const {id} = foodItemDetails
    onClickDecreaseCartItem(id)
    this.setState(prevState => ({
      quantity: prevState.quantity - 1,
    }))
  }

  onIncrementItem = () => {
    const {onClickIncreaseCartItem, foodItemDetails} = this.props
    const {id} = foodItemDetails
    onClickIncreaseCartItem(id)
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  render() {
    const {quantity} = this.state

    const {foodItemDetails} = this.props
    const {cost, imageUrl, id, name, rating} = foodItemDetails
    return (
      <li testid="foodItem" className="food-item-card-container">
        <img className="food-item-image" src={imageUrl} alt={name} />
        <div className="food-item-text">
          <h1 className="food-item-name">{name}</h1>
          <div className="food-item-cost-con">
            <BiRupee />
            <p className="food-item-cost">{cost}</p>
          </div>
          <div className="food-item-rating-con">
            <BsFillStarFill className="food-item-star" />
            <p className="food-item-rating-text">{rating}</p>
          </div>
          {quantity === 0 ? (
            <button
              onClick={this.onClickAddQuantity}
              className="food-item-add-button"
              type="button"
            >
              Add
            </button>
          ) : (
            <Counter
              testid="active-count"
              onDecrementItem={this.onDecrementItem}
              onIncrementItem={this.onIncrementItem}
              id={id}
              quantity={quantity}
            />
          )}
        </div>
      </li>
    )
  }
}

export default FoodItemCard
