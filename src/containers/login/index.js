import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { login } from "../../redux/user.redux"
import Logo from './../../components/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

@connect(state => state.user, { login })
export default class Login extends PureComponent {
	constructor () {
		super()
		this.state = { user: '', pwd: '' }
		this.handleLogin = this.handleLogin.bind(this)
		this.register = this.register.bind(this)
	}

	handleChange (key, val) {
		this.setState({ [key]: val })
	}

	handleLogin () {
		this.props.login(this.state)
	}

	register () {
		this.props.history.push('/register')
	}

	render () {
		return (
			<WingBlank>
				{this.props.redirectTo.length && this.props.redirectTo !== '/login' ?
					<Redirect to={this.props.redirectTo} /> :
					null}
				<Logo />
				<List>
					<InputItem
						onChange={v => this.handleChange('user', v)}
						placeholder='请输入用户名'>用户</InputItem>
					<InputItem
						onChange={v => this.handleChange('pwd', v)}
						placeholder='请输入密码'
						type='password'>密码</InputItem>
				</List>
				<WhiteSpace />
				<Button
					type='primary'
					onClick={this.handleLogin}>登录</Button>
				<WhiteSpace />
				<Button
					onClick={this.register}
					type='primary'>注册</Button>
			</WingBlank>
		)
	}
}