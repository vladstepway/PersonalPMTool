import React, {Component} from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import {Provider} from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode"
import {setJWTToken} from "./securityUtils/setJWTToken";
import {SET_CURRENT_USER} from "./actions/types";
import {logout} from "./actions/securityActions";
import SecureRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
    setJWTToken(jwtToken);
    const decodedToken = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decodedToken
    });

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>

                        <Switch>
                            <SecureRoute exact path="/dashboard" component={Dashboard}/>
                            <SecureRoute exact path="/projects/add" component={AddProject}/>
                            <SecureRoute exact path="/projects/:id/update" component={UpdateProject}/>
                            <SecureRoute exact path="/project-board/:id" component={ProjectBoard}/>
                            <SecureRoute exact path="/projects/:id/tasks/add" component={AddProjectTask}/>
                            <SecureRoute exact path="/projects/:backlogId/tasks/:projectTaskId/update"
                                         component={UpdateProjectTask}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
