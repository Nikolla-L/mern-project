import { combineReducers } from 'redux'
import auth from './auth.js'
import posts from './posts'

export const reducers = combineReducers({ auth, posts })