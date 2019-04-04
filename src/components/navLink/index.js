import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
const { Item } = TabBar
@connect(state => state.chat)
@withRouter
export default class NavLink extends PureComponent {
	render () {
		const navList = this.props.data.filter(v => !v.hide)

		return (
			<TabBar>
				{navList.map(v =>
					<Item
						badge={v.path === '/msg' ? this.props.unread : null}
						key={v.path}
						title={v.text}
						icon={{ uri: require(`./img/${v.icon}.png`) }}
						selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
						selected={this.props.location.pathname === v.path}
						onPress={() => this.props.history.push(v.path)}
					/>
				)}
			</TabBar>
		)
	}
}

NavLink.porpTypes = {
	data: PropTypes.array.isRequired
}