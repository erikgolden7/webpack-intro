import React, { Component } from "react"
import "./styles/style.css"
import img from "./assets/download.png"

class App extends Component {
  render() {
    return (
      <div>
        <img src={img} />
        <div>Webpack!</div>
      </div>
    )
  }
}

export default App
