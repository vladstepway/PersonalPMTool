import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Backlog from "./Backlog";
import {connect} from "react-redux";
import {getBacklog} from "../../actions/backlogActions";
import PropTypes from "prop-types";

class ProjectBoard extends Component {

    constructor() {
        super();
        this.state = {
            errors: {}
        }

    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }


    render() {
        const {id} = this.props.match.params;
        const {projectTasks} = this.props.backlog;
        const {errors} = this.state;

        let boardContent;

        const boardAlgorithm = (errors, projectTasks) => {
            if (projectTasks.length < 1) {
                if (errors.projectNotFound) {
                    return (
                        <div className="alert alert-danger text-center" role="alert">
                            {errors.projectNotFound}
                        </div>
                    )
                } else if (errors.projectNotFound) {
                    return (
                        <div className="alert alert-danger text-center" role="alert">
                            {errors.projectNotFound}
                        </div>
                    )
                } else {
                    return <div className="alert alert-info text-center" role="alert">
                        No project tasks on this board
                    </div>
                }
            } else {
                return <Backlog projectTasks={projectTasks}/>
            }
        };

        boardContent = boardAlgorithm(errors, projectTasks);

        return (
            <div className="container">
                <Link to={`/projects/${id}/tasks/add`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br/>
                <hr/>
                {boardContent}
            </div>
        );
    }
}

ProjectBoard.propTypes = {
    getBacklog: PropTypes.func.isRequired,
    backlog: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    backlog: state.backlog,
    errors: state.errors,
})

export default connect(mapStateToProps, {getBacklog})(ProjectBoard);