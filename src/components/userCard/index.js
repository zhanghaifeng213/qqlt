import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank,PullToRefresh} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
import { getMsgList } from "../../redux/chat.redux"
import { connect } from 'react-redux'

const { Header } = Card
const { Body } = Card

@withRouter
@connect(null, { getMsgList })

export default class UserCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
        };
    }
    componentWillMount () {
            console.log('我是chat.js获取的聊天信息')
            this.props.getMsgList()
    }
	goToChat (v) {
		this.props.history.push(`/chat/${v._id}`)
	}

	render () {
		return (
        <PullToRefresh
            damping={30}
            ref={el => this.ptr = el}
            style={{
                height: this.state.height-95,
                overflow: 'auto',
            }}
            refreshing={this.state.refreshing}
            onRefresh={() => {
                this.props.getMsgList()
            }}
        >
            <WingBlank ref="contentList">
                <QueueAnim type='scale'>
                    {this.props.userList.map(v => (
                        // 只显示有头像的用户
                        v.avatar ?
                            <div key={v._id} ref="contentList">
                                <WhiteSpace />
                                <Card onClick={() => this.goToChat(v)}>
                                    <Header
                                        title={v.user}
                                        thumb={
                                            require(`./../avatarSelector/avatars/${v.avatar}.png`)
                                        }
                                        extra={
                                            <span>
											{v.type === 'boss' ? '招聘岗位：' : '求职岗位：'}
                                                {v.title}
										</span>
                                        } />
                                    <Body>
                                    {v.type === 'boss' ? <div>公司名称：{v.company}</div> : null}
                                    {v.desc.split('\n').map((d, i) => <div key={i}>{d}</div>)}
                                    </Body>
                                </Card>
                            </div> : null
                    ))}
                </QueueAnim>
            </WingBlank>
        </PullToRefresh>

		)
	}
}

UserCard.propTypes = {
	userList: PropTypes.array.isRequired
}