import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './../actions/index';

class Sort extends Component {

    onSort = (sortBy , sortValue) =>{
        let sort= {
            by:sortBy,
            value:sortValue
        }
        this.props.onSort(sort)
    }
    render() {
        let {sortBy,sortValue, sortType} = this.props
        console.log(sortType)
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        <span className="fa fa-caret-square-o-down ml-5"> Sắp Xếp </span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onSort('name',1)}>
                            <a  role="button" className={(sortType.by === 'name' && sortType.value === 1 )? 'sort-selected':''}>
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                </span>
                            </a>
                        </li>
                        <li onClick={() => this.onSort('name',-1)}>
                            <a  role="button" className={(sortType.by === 'name' && sortType.value === -1) ? 'sort-selected':''}>
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                                                </span>
                            </a>
                        </li>
                        <li role="separator" className="divider" />
                        <li onClick={() => this.onSort('status',1)}><a className={(sortType.by === 'status' && sortType.value === 1) ? 'sort-selected':''} role="button">Trạng Thái Kích Hoạt</a></li>
                        <li onClick={() => this.onSort('status',-1)} ><a className={(sortType.by === 'status' && sortType.value === -1) ? 'sort-selected':''} role="button">Trạng Thái Ẩn</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return { 
        sortType:state.sortType
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onSort: (sortType)=>{
            dispatch(actions.sort(sortType))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Sort);