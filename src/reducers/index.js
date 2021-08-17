import {combineReducers} from 'redux'
import tasks from './tasks'
import isDisplayForm from './isDisplayForm';
import updateTask from './updateTask';
import filterTable from './filterTable'
import keywordSearch from './search'
import sortType from './sort'


const myReducer = combineReducers({
    tasks, //tasks = tasks
    isDisplayForm,
    updateTask ,
    filterTable,
    keywordSearch,
    sortType
})

export default myReducer;