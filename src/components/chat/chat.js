import React, { PureComponent } from 'react'
import {Toast, List, InputItem, NavBar, Icon, Grid,PullToRefresh } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg, listenStart } from "../../redux/chat.redux"
import { getChatId } from "../../utils"
import QueueAnim from 'rc-queue-anim'

const { Item } = List

@connect(state => state, { getMsgList, sendMsg, recvMsg, readMsg, listenStart })
export default class Chat extends PureComponent {
	constructor () {
		super()
		this.state = {
			text: '',
			sendBtnStyle: { marginRight: '15px', fontSize: '17px' },
			showEmoji: false,
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.showEmoji = this.showEmoji.bind(this)
		this.goBack = this.goBack.bind(this)
		this.selectEmoji = this.selectEmoji.bind(this)
	}

	componentWillMount () {
		if (!this.props.chat.listening) {
			this.props.getMsgList()
			this.props.recvMsg()
			this.props.listenStart()
		}
	}

	componentWillUnmount () {
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}

	handleChange (key, val) {
		this.setState({ [key]: val })
	}

	handleSubmit () {
		if (this.state.text.trim()) {
			const from = this.props.user._id
			const to = this.props.match.params.user
			const msg = this.state.text
			this.handleChange('text', '')
            this.setState({ showEmoji: false })
            if(!from){
                Toast.fail('发送失败', 1);
            }else{
                this.props.sendMsg(from, to, msg)
            }

		}
	}

	showEmoji () {
		this.setState({ showEmoji: !this.state.showEmoji })
		this.fixCarousel()
	}

	selectEmoji (el) {
		this.setState({ text: this.state.text + el.text })
	}

	fixCarousel () {
		setTimeout(() => {
			window.dispatchEvent(new Event('resize'))
		}, 0)
	}

	goBack () {
		this.props.history.goBack()
	}

	render () {
		const { user } = this.props.match.params
		const { chatmsg, users } = this.props.chat
		const chatId = getChatId(user, this.props.user._id)
		const msgList = chatmsg.filter(v => v.chatId === chatId)
		const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
			.split(' ')
			.filter(v => v)
			.map(v => ({ text: v }))

		if (!users[user]) {
			console.log('333339999999999999')
			return null
		} else {
			return (
				<div id='chat-page'>
					<NavBar
						mode='dark'
						icon={<Icon type="left" />}
						onLeftClick={this.goBack}>
						{users[user].name}
					</NavBar>
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
                        <QueueAnim>
                            {msgList.map(v => {
                                const avatar = require(`../avatarSelector/avatars/${users[v.from].avatar}.png`)
                                return v.from === user ? (
                                    <List key={v._id}>
                                        <Item thumb={avatar}>{v.content}</Item>
                                    </List>
                                ) : (
                                    <List key={v._id}>
                                        <Item extra={<img src={avatar} alt='头像' />}
                                              className='chat-me'>
                                            {v.content}
                                        </Item>
                                    </List>
                                )
                            })}
                        </QueueAnim>
                    </PullToRefresh>

					<div className="sticky-footer">
						<List>
							<InputItem
								placeholder='请输入信息'
								value={this.state.text}
								onChange={v => this.handleChange('text', v)}
								extra={
									<div>
						        <span
							        onClick={this.showEmoji}
							        style={this.state.sendBtnStyle}
							        role="img"
							        aria-label="emoji">😀</span>
										<span onClick={this.handleSubmit}>发送</span>
									</div>
								} />
						</List>
						{/* 选择 emoji */}
						{this.state.showEmoji ?
							<Grid
								data={emoji}
								columnNum={9}
								carouselMaxRow={4}
								isCarousel={true}
								onClick={el => this.selectEmoji(el)}
							/> : null}
					</div>
				</div>
			)
		}
	}
}