import React, { Component } from 'react';
import ListItem from './ListItem';
import { connect } from 'react-redux'
import * as actions from './../actions/index'


class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus: -1, // all -1, active: 1 , deactive: 0
        }
    }
    onChange = (event) =>{
        let name = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        let filter = {
            name:name === "filterName" ? value : this.state.filterName,
            status:name === "filterStatus" ? value : this.state.filterStatus
        }
        this.props.onFilterTable(filter)
        this.setState({
            [name] : value
        })
    }


    render() {
        
        let {tasks,filterTable,keyWord, sortType } = this.props;

        if(filterTable.name){
            if(filterTable.name !== ''){
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
                });
            }
        }
        tasks = tasks.filter((task) => {
            
            if(+filterTable.status === -1){
                return task;
            }else{
                tasks.status = (tasks.status == 'true');
                return task.status === (+filterTable.status === 1 ? true : false)
            }
        })

        if(keyWord){
            tasks = tasks.filter((task)=>{
                return task.name.toLowerCase().indexOf(keyWord) !== -1;
            })
            
        }


        if(sortType.by === 'name'){
            tasks.sort((a,b) => {
                if(a.name > b.name) return sortType.value;
                else if(a.name < b.name) return -sortType.value;
                else return 0;
            })
        }
        else{
            tasks.sort((a,b) => {
                if(a.status > b.status) return -sortType.value;
                else if(a.status < b.status) return sortType.value;
                else return 0;
            }) 
        }

        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover" style={{ marginTop: '15px' }}>
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td />
                                <td>
                                    <input type="text" 
                                        value={this.state.filterName} 
                                        onChange={this.onChange} 
                                        name="filterName" className="form-control" />
                                </td>
                                <td>
                                    <select value={this.state.filterStatus} className="form-control" name="filterStatus" 
                                        onChange={this.onChange}
                                    >
                                        <option value={-1}>Tất Cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td />
                            </tr>
                            {
                                tasks.map((value,index) => {
                                    return (
                                    <ListItem 
                                        key={value.id} 
                                        index={index} 
                                        task={value}
                                        ></ListItem>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyWord : state.keywordSearch,
        sortType:state.sortType
    }
}
const mapDispatchToProps = (dispatch , props) =>{
    return {
        onFilterTable : (filter) =>{
            dispatch(actions.filterTable(filter))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);