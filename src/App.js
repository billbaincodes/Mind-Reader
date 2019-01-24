import React, { Component } from "react";
import "./App.css";
import Analysis from "./components/Analysis.js";
import loadingPic from "./assets/mind-reader.jpg";
import Conversation from "./components/Conversation.js";
import Solo from "./components/Solo.js";
import TempConvo from './components/Placeholder'

class App extends Component {
  state = {
    mode: "solo",
    content: "",
    toneAnalysis: [],
    convoAnalysis: [],
    exchangePattern: [],
    loaded: false
  };

  // componentDidMount(){
  //   document.title = 'Mind Reader'
  // }

  tonePost = content => {
    if (!content) {
      alert("Please enter text.");
    } else {
      this.setState({ loaded: false });
      fetch(
        "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21",
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': "http:localhost:3000",
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            Authorization:
              "Basic YXBpa2V5Ojk2ZkM4U1lSdmFfTDFwckpHWE1QRkc2enRkeDZvel9mMExJSWNJMi16eDdO"
          },
          body: JSON.stringify({
            text: content
          })
        }
      )
        .then(response => response.json())
        .then(json => this.setState({ toneAnalysis: json, loaded: true }));
    }
  };

  convoPost = convo => {
    this.findExchangePattern(convo.utterances)
    fetch(
      "https://gateway.watsonplatform.net/tone-analyzer/api//v3/tone_chat?version=2017-09-21",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          'Access-Control-Allow-Origin': '*',
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

  findExchangePattern = (rawConvo) => {
    let foundPattern = []
    rawConvo.forEach(speaker => {
      foundPattern.push(speaker.user)
    });
    this.setState({exchangePattern : foundPattern})
  }

  soloListener = () => {
    this.setState({ mode: "solo" });
  };

  convoListener = () => {
    this.setState({ mode: "convo" });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h2 className="tagline">I'm Not a Damn . . .</h2>
          <h1 className="headline">MindReader</h1>

          <div>
            <button onClick={this.soloListener}>Solo</button>
            <button onClick={this.convoListener}> Conversation</button>

            {this.state.mode === "solo" ? (
              <Solo tonePost={this.tonePost} />
            ) : (
              <TempConvo />
              /* <Conversation convoPost={this.convoPost} /> */
            )}
          </div>
        </div>
        <div className="container">
          {this.state.loaded ? (
            <Analysis
              toneAnalysis={this.state.toneAnalysis}
              convoAnalysis={this.state.convoAnalysis}
              exchangePattern={this.state.exchangePattern}
            />
          ) : (
            <img className="loading App-logo" src={loadingPic} alt="loading" />
          )}
        </div>
      </div>
    );
  }
}

export default App;

//Good Sample POSTs
//I am happy. I am sad. I feel angry. I'm always right. I know it to be true. it's a fact.
