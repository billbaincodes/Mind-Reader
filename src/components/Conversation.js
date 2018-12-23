import React, { Component } from "react";

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      convo: {
        utterances: [
          {
            text: "Hey baby, how was your day",
            user: "customer"
          },
          {
            text: "Leave me alone",
            user: "agent"
          },
          {
            text: "Damn! :(",
            user: "customer"
          }
        ]
      },
      textInput: "",
      currentSpeaker: "agent"
    };
  }

  selectListener = event => {
    this.setState({ currentSpeaker: event.target.value });
  };

  textListener = event => {
    this.setState({ textInput: event.target.value });
  };

  addStatement = event => {
    event.preventDefault();

    let payload = {utterances : this.state.convo.utterances.concat({
      text: this.state.textInput,
      user: this.state.currentSpeaker
    })}

    this.setState({
      convo : payload
    })
    ;
  };




  render() {
    return (
      <div>
              <h4 className="tagline">
          Enter a conversation, how did it really go?
        </h4>
        <div class="conversation">
          {this.state.convo.utterances.map(utterance => {
            let speaker = utterance.user;
            let words = utterance.text;

            return <div className={`statement ${speaker}`}>{words}</div>;
          })}
        </div>

        <form>
          <select onChange={this.selectListener}>
            <option value="agent">I</option>
            <option value="customer">They</option>
          </select>
          <label>Said</label>
          <input
            type="text"
            value={this.state.textInput}
            onChange={this.textListener}
          />
          <button onClick={this.addStatement}>Add statement</button>
        </form>
        <button onClick={() => this.props.convoPost(this.state.convo)}>
          What did it all mean???
        </button>
      </div>
    );
  }
}

export default Conversation;

// Sample Convo
// {
//   "utterances": [
//     {
//       "text": "Hello, I'm having a problem with your product.",
//       "user": "customer"
//     },
//     {
//       "text": "OK, let me know what's going on, please.",
//       "user": "agent"
//     },
//     {
//       "text": "Well, nothing is working :(",
//       "user": "customer"
//     },
//     {
//       "text": "Sorry to hear that.",
//       "user": "agent"
//     }
//   ]
// }
