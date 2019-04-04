import React, { PureComponent } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends PureComponent {
	constructor () {
		super()
		this.state = {
			ele: {},
			text: '',
			avatars: [
				{ text: 'boy', icon: require(`./avatars/boy.png`) },
				{ text: 'bull', icon: require(`./avatars/bull.png`) },
				{ text: 'chick', icon: require(`./avatars/chick.png`) },
				{ text: 'crab', icon: require(`./avatars/crab.png`) },
				{ text: 'girl', icon: require(`./avatars/girl.png`) },
				{ text: 'hedgehog', icon: require(`./avatars/hedgehog.png`) },
				{ text: 'hippopotamus', icon: require(`./avatars/hippopotamus.png`) },
				{ text: 'koala', icon: require(`./avatars/koala.png`) },
				{ text: 'lemur', icon: require(`./avatars/lemur.png`) },
				{ text: 'man', icon: require(`./avatars/man.png`) },
				{ text: 'pig', icon: require(`./avatars/pig.png`) },
				{ text: 'tiger', icon: require(`./avatars/tiger.png`) },
				{ text: 'whale', icon: require(`./avatars/whale.png`) },
				{ text: 'woman', icon: require(`./avatars/woman.png`) },
				{ text: 'zebra', icon: require(`./avatars/zebra.png`) }
			]
		}
	}

	render () {
		const gridHeader = this.state.ele.icon ? (
			<div>
				<span>已选择头像：</span>
				<img
					src={this.state.ele.icon}
					style={{ width: '20px', verticalAlign: 'middle' }}
					alt='图片加载失败' />
			</div>
		) : <div>请选择头像：</div>

		return (
			<div className="photoImg">
				<List
					renderHeader={() => gridHeader}
					align='left'>
					<Grid
						data={this.state.avatars}
						columnNum={5}
						onClick={ele => {
							this.setState({ ele })
							this.props.selectAvatar(ele.text)
						}} />
				</List>
			</div>
		)
	}
}

AvatarSelector.propTypes = {
	selectAvatar: PropTypes.func.isRequired
}

export default AvatarSelector