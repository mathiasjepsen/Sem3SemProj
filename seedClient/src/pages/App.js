import React from "react"
import { Route, Switch } from "react-router-dom"
import Login from "../authorization/Login";
import Logout from "../authorization/Logout";
import TopMenu from "./TopMenu";
import Signup from "../authorization/Signup";
import AllUsers from './admin/AllUsers'
import Places from "./place/Places";
import CreatePlace from "./place/CreatePlace"
import Rating from './place/Rating'
import EditUser from './user/EditUser'

function App() {
  return (
    <div>
      <TopMenu />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={Signup} />
        <Route path="/allUsers" component={AllUsers} />
        <Route path="/places" component={Places} />
        <Route path="/createplace" component={CreatePlace} />
        <Route path="/rate/:id" component={Rating} />
        <Route path="/edit" component={EditUser}/>
      </Switch>
    </div>
  )
}
export default App;