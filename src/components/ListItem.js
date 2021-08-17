import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index'

class ListItem extends Component {
    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id)
        
    }
    onDelete = ()=>{
        this.props.onDeleteTask(this.props.task.id)
        this.props.onCloseForm()
        this.props.emptyForm();
    }
    onUpdate = () =>{
        this.props.onOpenForm();
        this.props.onUpdateTask(this.props.task);
    }
    render() {
        let {task , index} = this.props
        return (
            <tr>
                <td>{index +1}</td>
                <td>{task.name}</td>
                <td className="text-center" onClick={this.onUpdateStatus}>
                    {
                        task.status ? <span className="label label-success">Kích Hoạt</span> :<span className="label label-danger">Ẩn</span>
                    }
                </td>
                <td className="text-center">
                    <button onClick={this.onUpdate} type="button" className="btn bt-warning">
                        <span className="fa fa-pencil mr-5" >Sửa</span>
                    </button>
                                    &nbsp;
                    <button onClick={this.onDelete} type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5" >Xóa</span>
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        tasks : state.tasks
    }
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onUpdateStatus : (id)  =>{
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask : (id) =>{
            dispatch(actions.deleteStatus(id));
        },
        onCloseForm : () =>{
            dispatch(actions.closeForm())
        },
        onOpenForm : () =>{
            dispatch(actions.openForm())
        },
        onUpdateTask : (task) => {
            dispatch(actions.updateTask(task))
        },
        emptyForm : () =>{
            dispatch(actions.updateTask({id:'',name:'',status:false}))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (ListItem);