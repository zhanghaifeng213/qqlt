import { PureComponent } from 'react'
import { userinfo } from "../../redux/user.redux"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

@withRouter
@connect(null, { userinfo })
export default class AuthRoute extends PureComponent {
	constructor () {
		super()
		this.redirectToLogin = this.redirectToLogin.bind(this)
	}

	componentWillMount () {
		const publicList = ['/login', '/register']
		const pathname = this.props.location.pathname
		if (publicList.indexOf(pathname) > -1) {
			return null
		} else {
			this.props.userinfo(this.redirectToLogin)
		}
	}

	redirectToLogin () {
		this.props.history.push('/login')
	}

	render () {
		console.log('3322222')
		return null
	}
}
