import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { List, Badge,PullToRefresh } from 'antd-mobile'
import { getLast } from "../../utils"
import QueueAnim from 'rc-queue-anim'
const { Item } = List
const { Brief } = Item
@connect(state => state)
export default class Msg extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight
        };
}
	push (id) {
		this.props.history.push(`/chat/${id}`)
	}

	render () {
		const userId = this.props.user._id // 当前登录用户ID
		const userInfo = this.props.chat.users // 所有与当前用户发生过对话的用户信息
		const msgGroup = {} // 按chatId将聊天分组
		this.props.chat.chatmsg.forEach(v => {
			msgGroup[v.chatId] = msgGroup[v.chatId] || []
			msgGroup[v.chatId].push(v)
		})

		// 按时间将给聊天分组排序
		const chatList = Object.values(msgGroup).sort((a, b) => {
			const a_last = getLast(a).create_time
			const b_last = getLast(b).create_time
			return b_last - a_last
		})

		return (
		<PullToRefresh
			damping={30}
			ref={el => this.ptr = el}
			style={{
                height: this.state.height-95,
                overflow: 'auto',
            }}
			indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
			direction={this.state.down ? 'down' : 'up'}
			refreshing={this.state.refreshing}
			onRefresh={() => {

            }}
		>
			<QueueAnim type='scale'>
                {chatList.map(v => {
                    const lastItem = getLast(v)
                    const targetId = v[0].from === userId ? v[0].to : v[0].from
                    const unreadNum = v.filter(k => !k.read && k.to === userId).length
                    if (!userInfo[targetId]) {
                        return null
                    } else {
                        return (
							<List key={lastItem._id}>
								<Item
									extra={<Badge text={unreadNum} />}
									thumb={require(`../avatarSelector/avatars/${userInfo[targetId].avatar}.png`)}
									arrow="horizontal"
									onClick={() => this.push(targetId)}>
                                    {lastItem.content}
									<Brief>{userInfo[targetId].name}</Brief>
								</Item>
							</List>
                        )
                    }
                })}
			</QueueAnim>
		</PullToRefresh>

		)
	}
}