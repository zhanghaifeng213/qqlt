import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatUser } from './redux/chatUser.redux'
import { chat } from "./redux/chat.redux"

// 合并所有reducer
const reducers = combineReducers({
	user,
	chatUser,
	chat
})

export default reducers