import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUserList } from "../../redux/chatUser.redux"
import UserCard from "../userCard/"

@connect(state => state.chatUser, { getUserList })
export default class Boss extends PureComponent {
	componentDidMount () {
		this.props.getUserList('genius')
	}

	render () {
		return <UserCard userList={this.props.userList} />
	}
}