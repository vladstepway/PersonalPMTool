import React, {Component} from 'react';
import {Link} from "react-router-dom";
import classnames from "classnames";
import {connect} from "react-redux";
import {getProjectTask} from "../../../actions/backlogActions";
import PropTypes from "prop-types"

class UpdateProjectTask extends Component {

    constructor() {
        super();
        this.state = {
            errors: {}
        }
    }


    componentDidMount() {
        const {backlogId, projectTaskId} = this.props.match.params;
        this.props.getProjectTask(backlogId, projectTaskId, this.props.history)
    }

    render() {
        const {backlogId} = this.props.match.params;
        const {errors} = this.state;

        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/project-board/${backlogId}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Update Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                           className={classnames("form-control form-control-lg ", {
                                               // "is-invalid": errors.summary,
                                           })}
                                           name="summary"
                                           value={this.state.summary}
                                           placeholder="Project Task summary"
                                           // onChange={this.onChange}
                                    />
                                    {/*{errors.summary && (*/}
                                    {/*    <div className="invalid-feedback">*/}
                                    {/*        {errors.summary}*/}
                                    {/*    </div>*/}
                                    {/*)}*/}
                                </div>
                                <div className="form-group">
                                    <textarea className={classnames("form-control form-control-lg ", {
                                        // "is-invalid": errors.acceptanceCriteria,
                                    })}
                                              placeholder="Acceptance Criteria"
                                              name="acceptanceCriteria"
                                              value={this.state.acceptanceCriteria}
                                              // onChange={this.onChange}
                                    />
                                    {/*{errors.acceptanceCriteria && (*/}
                                    {/*    <div className="invalid-feedback">*/}
                                    {/*        {errors.acceptanceCriteria}*/}
                                    {/*    </div>*/}
                                    {/*)}*/}
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input type="date"
                                           className={classnames("form-control form-control-lg ", {
                                               // "is-invalid": errors.dueDate,
                                           })}
                                           name="dueDate"
                                           value={this.state.dueDate}
                                           // onChange={this.onChange}
                                    />
                                    {/*{errors.dueDate && (*/}
                                    {/*    <div className="invalid-feedback">*/}
                                    {/*        {errors.dueDate}*/}
                                    {/*    </div>*/}
                                    {/*)}*/}
                                </div>
                                <div className="form-group">
                                    <select className={classnames("form-control form-control-lg ", {
                                        // "is-invalid": errors.priority,
                                    })}
                                            name="priority"
                                            value={this.state.priority}
                                            // onChange={this.onChange}
                                    >
                                        {/*{errors.priority && (*/}
                                        {/*    <div className="invalid-feedback">*/}
                                        {/*        {errors.priority}*/}
                                        {/*    </div>*/}
                                        {/*)}*/}
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select className={classnames("form-control form-control-lg ", {
                                        // "is-invalid": errors.status,
                                    })}
                                            name="status"
                                            value={this.state.status}
                                            // onChange={this.onChange}
                                    >
                                        {/*{errors.status && (*/}
                                        {/*    <div className="invalid-feedback">*/}
                                        {/*        {errors.status}*/}
                                        {/*    </div>*/}
                                        {/*)}*/}
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

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    projectTask: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    projectTask: state.backlog.projectTask
})

export default connect(mapStateToProps, {getProjectTask})(UpdateProjectTask);