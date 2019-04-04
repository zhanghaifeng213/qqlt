import React, {PureComponent} from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import Boss from "../boss/"
import Genius from "../genius/"
import Msg from "../msg/"
import User from "../user/"
import NavLink from '../navLink/'
import {Route, Switch,Redirect} from 'react-router-dom'
import {getMsgList, recvMsg, listenStart} from "../../redux/chat.redux"

@connect(state => state, {getMsgList, recvMsg, listenStart})
export default class Dashboard extends PureComponent {
    componentWillMount() {
        if (!this.props.chat.listening) {
            this.props.getMsgList()
            this.props.recvMsg()
            this.props.listenStart()
        }
        console.log('dashbord')
    }

    render() {
        const navList = [{
            path: '/boss',
            text: '牛人',
            icon: 'boss',
            title: '牛人列表',
            component: Boss,
            hide: this.props.user.type === 'genius'
        }, {
            path: '/genius',
            text: 'BOSS',
            icon: 'job',
            title: 'BOSS列表',
            component: Genius,
            hide: this.props.user.type === 'boss'
        }, {
            path: '/msg',
            text: '消息',
            icon: 'msg',
            title: '消息列表',
            component: Msg
        }, {
            path: '/me',
            text: '我',
            icon: 'user',
            title: '个人中心',
            component: User
        }]
        const {pathname} = this.props.location
        const page = navList.find(v => v.path === pathname)

        return page ? (
            <div>
                <NavBar className="fixd-header">{page.title}</NavBar>
                <div className='dashboard-content'>
                    <Switch>
                        {navList.map(v =>
                            <Route
                                key={page.path}
                                path={page.path}
                                component={page.component}/>
                        )}
                    </Switch>
                </div>
                <NavLink data={navList}/>
            </div>
        ) : <Redirect to='/login'/>
    }
}