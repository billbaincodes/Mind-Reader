import React, { Component } from "react";
import "./App.css";
import Analysis from "./components/Analysis.js";
import loadingPic from './assets/mind-reader.jpg'
import Conversation from "./components/Conversation.js"


class App extends Component {
  state = {
    content: "",
    toneAnalysis: [],
    convoAnalysis: [],
    loaded: false
  };

  tonePost = () => {
    if (!this.state.content.length) {
      alert("bogus input");
    } else {
      this.setState({loaded: false})
      fetch(
        "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21",
        {
          method: "POST",
          mode: "cors",
          // credentials: "include",
          headers: {
            // 'Access-Control-Allow-Origin': 'http://localhost:3000',
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
        .then(json => this.setState({ toneAnalysis: json, loaded: true }));
    }
  };






  convoPost = (convo) => {

    console.log(convo)

      fetch(
        "https://gateway.watsonplatform.net/tone-analyzer/api//v3/tone_chat?version=2017-09-21",
        {
          method: "POST",
          mode: "cors",
          // credentials: "include",
          headers: {
            // 'Access-Control-Allow-Origin': 'http://localhost:3000',
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            Authorization:
              "Basic YXBpa2V5Ojk2ZkM4U1lSdmFfTDFwckpHWE1QRkc2enRkeDZvel9mMExJSWNJMi16eDdO"
          },
          body: JSON.stringify(convo)
        }
      )
        .then(response => response.json())
        .then(json => this.setState({ convoAnalysis: json}));
    
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

  //Good Sample POSTs
  //I am happy. I am sad. I feel angry. I'm always right. I know it to be true. it's a fact.



  render() {
    return (
      <div className="App">
      <div className="container">
        <h2 className="tagline">I'm Not a Damn...</h2>
        <h1 className="headline">MindReader</h1>
        <h4 className="tagline"> Enter text, reveal the author's true emotions</h4>
        <textarea cols="100" rows="10" onChange={this.contentListener} value={this.state.content} />
        <button onClick={this.tonePost}>Read minds</button>
        <Conversation convoPost={this.convoPost}/>
        </div>
        <div className="container">
        {this.state.loaded ? (
          <Analysis toneAnalysis={this.state.toneAnalysis} />
        ) : (
          <img className="loading App-logo" src={loadingPic} alt="loading"/>
        )}
        </div>
      </div>
    );
  }
}

export default App;
