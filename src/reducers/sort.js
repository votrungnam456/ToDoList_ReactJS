import * as types from '../constants/ActionTypes'
let initialState = {
    by:"name",
    value:1
};
let myReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.SORT_TYPE:{
            console.log(action.sortType.by)
            return action.sortType
        }
        default:
            return state;
    }
}

export default myReducer;