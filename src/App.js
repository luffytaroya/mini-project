import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm/LoginForm'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import RestaurantDetails from './components/RestaurantDetails/RestaurantDetails'
import Cart from './components/Cart/Cart'
import NotFound from './components/NotFound/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route path="/bad-path" component={NotFound} />
  </Switch>
)

export default App
