import React, { PureComponent } from 'react'
import {
	WingBlank, NavBar, InputItem, TextareaItem, WhiteSpace, Button
} from 'antd-mobile'
import AvatarSelector from './../../components/avatarSelector'
import { connect } from 'react-redux'
import { update } from "../../redux/user.redux"
import { Redirect } from 'react-router-dom'

@connect(state => state.user, { update })
export default class BossInfo extends PureComponent {
	constructor () {
		super()
		this.state = { title: '', company: '', money: '', desc: '', avatar: '' }
		this.selectAvatar = this.selectAvatar.bind(this)
	}

	handleChange (key, val) {
		this.setState({ [key]: val })
	}

	selectAvatar (avatar) {
		this.setState({ avatar })
	}

	render () {
		const { redirectTo } = this.props
		const { pathname } = this.props.location

		return (
			<div>
				{redirectTo.length && redirectTo !== pathname ?
					<Redirect to={redirectTo} /> :
					null}
				<NavBar mode='dark'>BOSS信息完善</NavBar>
				<AvatarSelector selectAvatar={this.selectAvatar} />
				<WhiteSpace />
				<InputItem
					onChange={v => this.handleChange('title', v)}>招聘职位</InputItem>
				<InputItem
					onChange={v => this.handleChange('company', v)}>公司名称</InputItem>
				<InputItem
					onChange={v => this.handleChange('money', v)}>薪资待遇</InputItem>
				<TextareaItem
					rows={3}
					autoHeight
					title='岗位描述'
					onChange={v => this.handleChange('desc', v)} />
				<WhiteSpace />
				<WingBlank>
					<Button
						type='primary'
						onClick={() => this.props.update(this.state)}>提交信息</Button>
				</WingBlank>
			</div>
		)
	}
}
