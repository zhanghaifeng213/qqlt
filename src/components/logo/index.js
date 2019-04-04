import React from 'react'
import './logo.css'

const Logo = () => (
	<div className="logo-container">
		<img src={require('./logo.png')} alt="图片加载失败" />
	</div>
)

export default Logo