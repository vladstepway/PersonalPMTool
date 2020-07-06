import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ProjectTask from "./ProjectTasks/ProjectTask";
import Backlog from "./Backlog";

class ProjectBoard extends Component {
    render() {
        const {id} = this.props.match.params;

        return (
            <div className="container">
                <Link to={`/projects/${id}/tasks/add`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br/>
                <hr/>
                {/*{!--Backlog STARTS HERE --}*/}
                <Backlog/>

                {/*{!--Backlog ENDS HERE --}*/}
            </div>
        );
    }
}

export default ProjectBoard;