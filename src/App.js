import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthRoute from './components/authroute'
import Login from './containers/login'
import Register from './containers/register'
import BossInfo from "./containers/bossinfo/index"
import GeniusInfo from "./containers/geniusinfo/index"
import Dashboard from "./components/dashboard/index"
import Chat from "./components/chat/chat"

export default () => (
	<div>
		<AuthRoute />
		<Switch>
			<Route path='/bossinfo' component={BossInfo} />
			<Route path='/geniusinfo' component={GeniusInfo} />
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/chat/:user' component={Chat} />
			<Route component={Dashboard} />
		</Switch>
	</div>
)