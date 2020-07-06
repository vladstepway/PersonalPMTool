import React, {Component} from 'react';
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
    render() {
        const {projectTasks} = this.props;
        const tasks = projectTasks.map(pt => (<ProjectTask key={pt.id} projectTask={pt}/>));

        let todoItems = [];
        let inProgressItems = [];
        let doneItems = [];

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].props.projectTask.status === "TO-DO") {
                todoItems.push(tasks[i])
            } else if (tasks[i].props.projectTask.status === "IN-PROGRESS") {
                inProgressItems.push(tasks[i])
            } else if (tasks[i].props.projectTask.status === "DONE") {
                doneItems.push(tasks[i])
            }
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {todoItems.sort()}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {inProgressItems.sort()}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {doneItems.sort()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Backlog;