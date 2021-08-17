import * as types from '../constants/ActionTypes'
import Lodash from 'lodash'
let data = JSON.parse(localStorage.getItem('tasks'));
let initialState = data ? data: []

/* Random id */ 

let s4 = ()=>{
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
}
let randomID = () =>{
    return s4() + s4() + '-' +s4() + s4()
}
let findIndex = (id, state) =>{
    let index = Lodash.findIndex(state, (task)=>{
        return task.id === id
    })
    
    return index;
}
let myReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.LIST_ALL:
            return state
        case types.ADD_UPDATE_TASK:{
            console.log(action);
            let Task = {
                id : action.task.id,
                name:action.task.name,
                status:Boolean(action.task.status)
            }
            if(!Task.id){
                Task.id = randomID();
                state.push(Task);
            }
            else{
                let index = findIndex(Task.id,state);
                state[index] = Task
            }
            localStorage.setItem('tasks',JSON.stringify(state))
            return [...state]
        }
        case types.UPDATE_STATUS:{
            let index = findIndex(action.id,state);
            if(index !== -1){
                state[index].status = !state[index].status
            }
            localStorage.setItem('tasks',JSON.stringify(state))
            return [...state]
        }
        case types.DELETE_TASK:{
            console.log(action)
            let index = findIndex(action.id,state);
            if(index !== -1){
                state.splice(index,1);
            }
            localStorage.setItem('tasks',JSON.stringify(state))
            return [...state]
        }
        // case types.FILTER_TABLE: {

        //     return state
        // }
        default:
            return state;
    }
}

export default myReducer;