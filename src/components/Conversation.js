import React, { Component } from "react";

class Conversation extends Component {


  state = {
    conversation: {}
  }


  renderStatement = (event) => {
    event.preventDefault()
    console.log('butts')
    return (
      <div>you are dumb!!!</div>
    )
  }

  render() {
    return (
      <div>
        <div class="conversation">
          <div class="statement i-said">you are dumb!</div>
          <div class="statement they-said">no, you are dumb</div>
          {this.renderStatement}
        </div>

        <form>
          <select>
            <option>I</option>
            <option>They</option>
          </select>
          <label>Said</label>
          <input type="text" />
          <button onClick={this.renderStatement}>Add statement</button>
        </form>
      </div>
    );
  }
}

export default Conversation;
