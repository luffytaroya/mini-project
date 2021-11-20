import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="username-password-label" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          className="password-input-field"
          type="password"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="username-password-label" htmlFor="username">
          USERNAME
        </label>
        <br />
        <input
          className="username-input-field"
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-and-form-container">
        <form onSubmit={this.submitForm} className="form-container">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/ccbpsama/image/upload/v1636948599/Group_7420_fqmbec.png"
            alt="website logo"
          />
          <h1 className="tasty-kitchens">Tasty Kitchens</h1>
          <h1 className="login-name">Login</h1>
          <div>{this.renderUsernameField()}</div>
          <div>{this.renderPasswordField()}</div>
          <div className="error-msg-con">
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <img
          alt="website login"
          src="https://res.cloudinary.com/ccbpsama/image/upload/v1636947492/Rectangle_1456_sxo0jz.png"
          className="website-login"
        />
      </div>
    )
  }
}
export default LoginForm
