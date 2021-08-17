import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from './../actions/index';

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        }
    }
    onChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name] : value
        })
    }
    onSearch = () =>{
        this.props.onSearch(this.state.keyword)
    }
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input type="text" name='keyword' onChange={this.onChange} value={this.state.keyword}  className="form-control" placeholder="Nhập từ khóa..." />
                    <span className="input-group-btn">
                        <button onClick={this.onSearch} className="btn btn-primary" type="button">
                            <span className="fa fa-search mr-5">Tìm</span>
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return { 
        
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onSearch: (keyword)=>{
            dispatch(actions.search(keyword))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Search);