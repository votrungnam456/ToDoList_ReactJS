import * as types from '../constants/ActionTypes'
let initialState = ""
let myReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.KEYWORD_SEARCH:{
            return action.keyword
        }
        default:
            return state;
    }
}

export default myReducer;