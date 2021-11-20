import {Component} from 'react'

import './index.css'

class Counter extends Component {
  onDecrement = () => {
    const {onDecrementItem} = this.props
    onDecrementItem()
  }

  onIncrement = () => {
    const {onIncrementItem} = this.props
    onIncrementItem()
  }

  render() {
    const {quantity} = this.props

    return (
      <div className="counter-container">
        <button
          testid="decrement-count"
          className="decrease-button"
          type="button"
          onClick={this.onDecrement}
        >
          -
        </button>
        <div>
          <p className="quantity-value">{quantity}</p>
        </div>
        <button
          testid="increment-count"
          className="increase-button"
          type="button"
          onClick={this.onIncrement}
        >
          +
        </button>
      </div>
    )
  }
}
export default Counter
