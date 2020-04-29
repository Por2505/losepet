import {createStore, combineReducers} from 'redux'

export const photoReducer = (photo = {preview: '', raw: ''}, action) => {
    switch (action.type) {
        case 'PHOTO_SET':
            return {preview: action.preview,raw: action.raw}
        default:
            return photo
    }
 }
const initial = {
    name:'',
    pet:'',
    photoURL:'',
    gender:'',
    location:'',
    phone:'',
    email:''
}
export const formReducer = (data = initial, action) => {
    switch (action.type) {
        case 'NAME_SET':
            return {...data,name:action.name}
        case 'PET_SET':
            return {...data,pet:action.pet}
        case 'PHOTOURL_SET':
            return {...data,photoURL:action.photoURL}
        case 'GENDER_SET':
            return {...data,gender:action.gender}
        case 'LOCATION_SET':
            return {...data,location:action.location}
        case 'PHONE_SET':
            return {...data,phone:action.phone}
        case 'EMAIL_SET':
            return {...data,email:action.email}
        default:
            return data
    }
}
export const searchReducer = (search = '', action) => {
    switch (action.type) {
        case 'SEARCH_SET':
            return action.search
        default:
            return search
    }
}

export const taskReducer = (tasks = [], action) => {
    switch (action.type) {
        case 'TASKS_SET':
            return action.tasks
        default:
            return tasks
    }
}
export const signinReducer = (signin = '', action) => {
    switch (action.type) {
        case 'SIGNIN_SET':
            return action.signin
        default:
            return signin
    }
}
export const rootReducer = combineReducers({
     photo: photoReducer,
     form: formReducer,
     search: searchReducer,
     tasks: taskReducer,
     signin: signinReducer
})
 
export const store = createStore(rootReducer)
 