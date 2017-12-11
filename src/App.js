import React, { Component } from "react";
import "./styles/style.css";
import img from "./assets/download.png";

class App extends Component {
	render() {
		return (
			<div>
				Hello World of
				<img src={img} />
			</div>
		);
	}
}

export default App;
