import React, { Component } from 'react';
import TaskForm from './TaskForm'
import Control from './Control'
import TaskList from './TaskList';
import Lodash from 'lodash'
import { connect } from 'react-redux'
import * as actions from './../actions/index';
class layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort : {
                by:'name',
                value:1
            }
        }
    }

    /* Thay đổi trạng thái form thêm - sửa */ 

    onDisplayAddForm = () => {
        if(this.props.editItem.id !== ""){
            this.props.emptyForm()
       }
       else{
            this.props.onToggleForm();
       }
    }

    render() {
        let {
            sort} = this.state;
        let {isDisplayForm} = this.props
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={ isDisplayForm ?"col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                        {/*Task Form*/}
                        <TaskForm></TaskForm>
                        {/* <TaskForm></TaskForm> */}
                    </div>
                    <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button onClick={this.onDisplayAddForm} type="button" className="btn btn-primary">
                            <span className="fa fa-plus mr-5" >Thêm Công Việc</span>
                        </button>
                        {/* Search - Sort*/}
                        <Control></Control>
                        {/* List item*/}
                        <TaskList 
                            onUpdate={this.onUpdate} 
                            ></TaskList>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return { 
        isDisplayForm:state.isDisplayForm,
        editItem : state.updateTask,
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onToggleForm : () =>{
            dispatch(actions.toggleForm())
        },

        onOpenForm : () =>{
            dispatch(actions.openForm())
        },
        emptyForm : () =>{
            dispatch(actions.updateTask({id:'',name:'',status:false}))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(layout);