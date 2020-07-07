import React, {Component} from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import {Provider} from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/projects/add" component={AddProject}/>
                        <Route exact path="/projects/:id/update" component={UpdateProject}/>
                        <Route exact path="/project-board/:id" component={ProjectBoard}/>
                        <Route exact path="/projects/:id/tasks/add" component={AddProjectTask}/>
                        <Route exact path="/projects/:backlogId/tasks/:projectTaskId/update" component={UpdateProjectTask}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
