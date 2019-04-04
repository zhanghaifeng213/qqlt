import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { register } from "../../redux/user.redux"
import Logo from './../../components/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

const RadioItem = Radio.RadioItem

@connect(state => state.user, { register })
export default class Register extends PureComponent {
	constructor () {
		super()
		this.state = {
			type: 'genius', // 或者 'boss'
			user: '',
			pwd: '',
			repeatpwd: '',
		}
		this.handleRegister = this.handleRegister.bind(this)
	}

	handleChange (key, val) {
		this.setState({ [key]: val })
	}

	handleRegister () {
		this.props.register(this.state)
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
						type='password'
						onChange={v => this.handleChange('pwd', v)}
						placeholder='请输入密码'>密码</InputItem>
					<InputItem
						type='password'
						onChange={v => this.handleChange('repeatpwd', v)}
						placeholder='请再次输入密码'>确认密码</InputItem>
				</List>
				<WhiteSpace />
				<RadioItem
					checked={this.state.type === 'genius'}
					onClick={() => this.handleChange('type', 'genius')}>牛人</RadioItem>
				<RadioItem
					checked={this.state.type === 'boss'}
					onClick={() => this.handleChange('type', 'boss')}>BOSS</RadioItem>
				<WhiteSpace />
				<Button
					type='primary'
					onClick={this.handleRegister}>注册</Button>
			</WingBlank>
		)
	}
}