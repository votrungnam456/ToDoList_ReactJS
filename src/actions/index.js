import * as types from './../constants/ActionTypes'
export const listAll = () => {
    return {
        type:types.LIST_ALL
    }
}
export const addOrUpdateTask = (task) => {
    return {
        type:types.ADD_UPDATE_TASK,
        task // task:task
    }
}

export const toggleForm = () => {
    return {
        type:types.TOGGLE_FORM
    }
}
export const closeForm = () => {
    return {
        type:types.CLOSE_FORM
    }
}
export const openForm = () => {
    return {
        type:types.OPEN_FORM
    }
}
export const updateStatus = (id) => {
    return {
        type:types.UPDATE_STATUS,
        id
    }
}
export const deleteStatus = (id) => {
    return {
        type:types.DELETE_TASK,
        id
    }
}
export const updateTask = (task) => {
    return {
        type:types.UPDATE_TASK,
        task
    }
}
export const filterTable = (filter) => {
    return {
        type:types.FILTER_TABLE,
        filter
    }
}
export const search = (keyword) => {
    return {
        type:types.KEYWORD_SEARCH,
        keyword
    }
}
export const sort = (sortType) => {
    return {
        type:types.SORT_TYPE,
        sortType
    }
}