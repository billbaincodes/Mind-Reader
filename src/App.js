import React, { Component } from "react";
import "./App.css";
import Analysis from "./components/Analysis.js";

class App extends Component {
  state = {
    content: "",
    toneAnalysis: undefined,
    topTones: undefined
  };

  tonePost = () => {
    if (!this.state.content.length) {
      alert("bogus input");
    }
    fetch(
      "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          Authorization:
            "Basic YXBpa2V5Ojk2ZkM4U1lSdmFfTDFwckpHWE1QRkc2enRkeDZvel9mMExJSWNJMi16eDdO"
        },
        body: JSON.stringify({
          text: this.state.content
        })
      }
    )
      .then(response => response.json())
      .then(json => this.setState({ toneAnalysis: json }))
      .then(this.topTones);
  };

  topTones = () => {
    let unsortedTones = this.state.toneAnalysis.document_tone.tones;
    console.log(
      unsortedTones.sort(function(a, b) {
        return b.score - a.score;
      })
    );
  };

  contentListener = event => {
    this.setState({ content: event.target.value });
  };

  render() {
    return (
      <div>
        <h3>MindReader</h3>
        <textarea onChange={this.contentListener} value={this.state.content} />
        <button onClick={this.tonePost}>Read minds</button>
      </div>
    );
  }
}

export default App;
