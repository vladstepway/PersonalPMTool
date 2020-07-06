import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {addProjectTask} from "../../../actions/backlogActions";
import PropTypes from "prop-types"
import classnames from "classnames";

class AddProjectTask extends Component {

    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        this.state = {
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: id,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newProjectTask = {
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
        }
        this.props.addProjectTask(this.state.projectIdentifier, newProjectTask, this.props.history)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }


    render() {
        const {id} = this.props.match.params;
        const {errors} = this.state;
        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projects/${id}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Add Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                           className={classnames("form-control form-control-lg ", {
                                               "is-invalid": errors.summary,
                                           })}
                                           name="summary"
                                           value={this.state.summary}
                                           placeholder="Project Task summary"
                                           onChange={this.onChange}
                                    />
                                    {errors.summary && (
                                        <div className="invalid-feedback">
                                            {errors.summary}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea className={classnames("form-control form-control-lg ", {
                                        "is-invalid": errors.acceptanceCriteria,
                                    })}
                                              placeholder="Acceptance Criteria"
                                              name="acceptanceCriteria"
                                              value={this.state.acceptanceCriteria}
                                              onChange={this.onChange}/>
                                    {errors.acceptanceCriteria && (
                                        <div className="invalid-feedback">
                                            {errors.acceptanceCriteria}
                                        </div>
                                    )}
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input type="date"
                                           className={classnames("form-control form-control-lg ", {
                                               "is-invalid": errors.dueDate,
                                           })}
                                           name="dueDate"
                                           value={this.state.dueDate}
                                           onChange={this.onChange}/>
                                    {errors.dueDate && (
                                        <div className="invalid-feedback">
                                            {errors.dueDate}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <select className={classnames("form-control form-control-lg ", {
                                        "is-invalid": errors.priority,
                                    })}
                                            name="priority"
                                            value={this.state.priority}
                                            onChange={this.onChange}>
                                        {errors.priority && (
                                            <div className="invalid-feedback">
                                                {errors.priority}
                                            </div>
                                        )}
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select className={classnames("form-control form-control-lg ", {
                                        "is-invalid": errors.status,
                                    })}
                                            name="status"
                                            value={this.state.status}
                                            onChange={this.onChange}>
                                        {errors.status && (
                                            <div className="invalid-feedback">
                                                {errors.status}
                                            </div>
                                        )}
                                        <option value="">Select Status</option>
                                        <option value="TO-DO">TO DO</option>
                                        <option value="IN-PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    errors: state.errors,
})


export default connect(mapStateToProps, {addProjectTask})(AddProjectTask);