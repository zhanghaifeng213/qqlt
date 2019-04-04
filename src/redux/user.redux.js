import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getRedirectPath } from "../utils"
const ERROR_MSG = 'ERROR_MSG'
const LOGOUT = 'LOGOUT'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
	redirectTo: '',
	msg: '',
	user: '',
	type: ''
}

export function user (state = initState, action) {
	switch (action.type) {
		case AUTH_SUCCESS:
			return {
				...state,
				msg: '',
				...action.payload,
				redirectTo: getRedirectPath(action.payload)
			}
		case LOGOUT:
			return { ...initState, redirectTo: '/login' }
		case LOAD_DATA:
			return { ...state, ...action.payload }
		case ERROR_MSG:
			return { ...state, msg: action.msg }
		default:
			return state
	}
}

function authSuccess (payload) {
	return { type: AUTH_SUCCESS, payload }
}

export function logoutSubmit () {
	return { type: LOGOUT }
}

export function loadData (payload) {
	return { type: LOAD_DATA, payload }
}

function errMsg (msg) {
	Toast.fail(msg, 2)
	return { type: ERROR_MSG, msg }
}

// 用户登录
export function login ({ user, pwd }) {
	if (!user || !pwd) {
		return errMsg('用户名或密码不能为空')
	} else {
		return dispatch => {
			axios.post('/user/login', { user, pwd }).then(res => {
				if (res.status === 200 && res.data.code === 0) {
                        dispatch(authSuccess(res.data.data))
				} else {
					dispatch(errMsg(res.data.msg))
				}
			})
		}
	}
}

// 用户注册
export function register ({ user, pwd, repeatpwd, type }) {
	if (!user || !pwd) {
		return errMsg('用户名或密码不能为空')
	} else if (pwd !== repeatpwd) {
		return errMsg('两次输入的密码不一致')
	} else {
		return dispatch => {
			axios.post('/user/register', { user, pwd, type }).then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess({ user, pwd, type }))
				} else {
					dispatch(errMsg(res.data.msg))
				}
			})
		}
	}
}

// 获取用户信息
export function userinfo (callback) {
	return dispatch => {
		axios.get('/user/info').then(res => {
			if (res.status === 200 && res.data.code === 0) {
				dispatch(loadData(res.data.data))
			} else {
				callback()
			}
		})
	}
}

// 完善用户信息
export function update (data) {
	let falg=false;
	for(let item of Object.values(data)){
		if(!item){
			falg=true
		}
	}
	if(falg){
		return errMsg('内容不能为空')
	}
	return dispatch => {
		axios.post('/user/update', data).then(res => {
			if (res.status === 200 && res.data.code === 0) {
				dispatch(authSuccess(res.data.data))
			} else {
				dispatch(errMsg(res.data.msg))
			}
		})
	}
}