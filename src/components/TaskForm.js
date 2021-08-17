import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './../actions/index'
import Lodash from 'lodash'
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name:'',
            status:false,
        }
    }
    componentDidMount(){ //componentWillmount
        let {updatingTask} = this.props
        if(this.props.updatingTask){
            this.setState({
                id:updatingTask.id,
                name:updatingTask.name,
                status:Boolean(updatingTask.status),
            })
        }
        else{
            console.log("AAAAAA")
            this.clearForm();
        }
    }
    static getDerivedStateFromProps(props,state){ //componentwillreceiveprops
        if(props.updatingTask){
            if(props.updatingTask.id !== state.id){
                return {
                    id: props.updatingTask.id,
                    name: props.updatingTask.name,
                    status: Boolean(props.updatingTask.status),
                }
            }
        } 
        else{
            if(state.id){
                return {
                    id:"",
                    name:"",
                    status:false
                }
            }
        }
        return null;
    }
    CloseForm = () =>{
        this.props.onCloseForm();
    }
    onChange = (event) =>{
        let names = event.target.name;
        let values = event.target.value;
        if(names === 'status'){
            values = (values == 'true'); 
        }
        this.setState({
            [names]:values
        })
    }
    onSubmit = (event) =>{
        event.preventDefault();
        this.props.onAddOrUpdateTask(this.state)
        this.clearForm();
        this.CloseForm();
    }
    clearForm = () =>{
        this.setState({
            id:'',
            name:'',
            status:false,
        })
        this.props.emptyForm();
    }
    render() {
        let {isDisplayForm , updatingTask}=this.props
        return isDisplayForm ? (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{ this.state.id === "" ?"Thêm Công Việc":"Sửa công việc"} <button onClick={this.CloseForm}>X</button></h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit} >
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChange}/>
                        </div>
                        <label>Trạng Thái :</label>
                        <select name="status" className="form-control" required="required" value={this.state.status} onChange={this.onChange}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Lưu lại</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.clearForm}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        ) : null
        
    }
}

const mapStateToProps = (state) =>{
    return {
        isDisplayForm:state.isDisplayForm,
        updatingTask :state.updateTask
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onCloseForm : () =>{
            dispatch(actions.closeForm())
        },
        onAddOrUpdateTask : (task) => {
            dispatch(actions.addOrUpdateTask(task))
        },
        emptyForm : () =>{
            dispatch(actions.updateTask({id:'',name:'',status:false}))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (TaskForm);