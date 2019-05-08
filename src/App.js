import React, { Component } from "react";
import Analysis from "./components/Analysis.js";
import Conversation from "./components/Conversation.js";
import Solo from "./components/Solo.js";
import Placeholder from "./components/Placeholder";
// import "./App.css";
import "./style.sass";

class App extends Component {
  state = {
    mode: "solo",
    content: "",
    toneAnalysis: [],
    convoAnalysis: [],
    exchangePattern: [],
    loaded: false
  };

  tonePost = content => {
    if (!content) {
      alert("Please enter text.");
    } else {
      this.setState({ loaded: false });
      fetch("https://mind-reader-server.herokuapp.com/document", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: content
        })
      })
        .then(response => response.json())
        .then(json =>
          this.setState({ toneAnalysis: JSON.parse(json), loaded: true })
        );
    }
  };

  convoPost = convo => {
    this.findExchangePattern(convo.utterances);
    fetch(
      "https://gateway.watsonplatform.net/tone-analyzer/api//v3/tone_chat?version=2017-09-21",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          Authorization:
            "Basic YXBpa2V5Ojk2ZkM4U1lSdmFfTDFwckpHWE1QRkc2enRkeDZvel9mMExJSWNJMi16eDdO"
        },
        body: JSON.stringify(convo)
      }
    )
      .then(response => response.json())
      .then(json => this.setState({ convoAnalysis: json }));
  };

  findExchangePattern = rawConvo => {
    let foundPattern = [];
    rawConvo.forEach(speaker => {
      foundPattern.push(speaker.user);
    });
    this.setState({ exchangePattern: foundPattern });
  };

  soloListener = () => {
    this.setState({ mode: "solo" });
  };

  convoListener = () => {
    this.setState({ mode: "convo" });
  };

  render() {
    return (
      <div className="App">

        <div className="header">
          <h2 className="tagline">I'm Not a Damn . . .</h2>
          <h1 className="headline">MindReader</h1>
          {/* <div>
            <button onClick={this.soloListener}>Solo</button>
            <button onClick={this.convoListener}> Conversation</button>
          </div> */}
        </div>
        
        <div className="input">
              {this.state.mode === "solo" ? (
                <Solo tonePost={this.tonePost} />
              ) : (
                <Placeholder />
              )
              /* <Conversation convoPost={this.convoPost} /> */
              }
          </div>

        
        <div className="analysis">
        {this.state.loaded ? (
          <Analysis
            toneAnalysis={this.state.toneAnalysis}
            convoAnalysis={this.state.convoAnalysis}
            exchangePattern={this.state.exchangePattern}
          />
        ) : (
          <img
            className="loading App-logo"
            src="https://i.imgur.com/3Pci6WH.png"
            alt="loading"
          />
        )}

        </div>

      </div>
    );
  }
}

export default App;

//Good Sample POSTs
//I am happy. I am sad. I feel angry. I'm always right. I know it to be true. it's a fact.
