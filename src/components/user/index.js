import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookies from 'browser-cookies'
import { logoutSubmit } from './../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

const { Item } = List
const { Brief } = Item

@connect(state => state.user, { logoutSubmit })
export default class User extends PureComponent {
	constructor () {
		super()
		this.state = { show: false }
		this.logout = this.logout.bind(this)
	}

	componentDidMount () {
		this.setState({ show: true })
	}

	logout () {
		Modal.alert('注销', '确认退出登录吗?', [
			{ text: '取消' },
			{
				text: '确认',
				onPress: () => {
					browserCookies.erase('react-chat')
					this.props.logoutSubmit()
				}
			}
		])
	}

	render () {
		const {
			user, avatar, title, type, company, desc, money, redirectTo
		} = this.props

		return user ? (
			<QueueAnim type='scale'>
				{this.state.show ? [
					<Result
						key='result'
						img={<img
							width="50"
							alt="用户头像"
							src={require(`./../avatarSelector/avatars/${avatar}.png`)} />}
						title={user}
						message={type === 'boss' ? company : null} />,
					<List renderHeader={() => '简介'} key='brief'>
						<Item multipleLine>
							{type === 'boss' ? '招聘岗位' : '求职意向'}：{title}
							<Brief>
								{type === 'boss' ? '岗位描述' : '个人描述'}：
							</Brief>
							{desc.split('\n').map((v, i) => <Brief key={i}>{v}</Brief>)}
							{type === 'boss' ?
								<Brief>薪资待遇：{money}</Brief> :
								<Brief>期望薪资：{money}</Brief>}
						</Item>
					</List>,
					<WhiteSpace key='whiteSpace' />,
					<List key='logout'>
						<Item arrow="horizontal" onClick={this.logout}>退出登录</Item>
					</List>] : null}
			</QueueAnim>
		) : <Redirect to={redirectTo} />
	}
}