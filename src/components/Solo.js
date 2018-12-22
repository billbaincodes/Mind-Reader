import React, { Component } from "react";

class Solo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: undefined
    };
  }

  contentListener = event => {
    this.setState({ content: event.target.value });
  };

  render() {
    return (
      <div>
        <h4 className="tagline">
          Enter text, reveal the author's true emotions
        </h4>
        <textarea
          cols="100"
          rows="10"
          onChange={this.contentListener}
          value={this.state.content}
        />
        <button onClick={() => this.props.tonePost(this.state.content)}>Read minds</button>
      </div>
    );
  }
}

export default Solo;
