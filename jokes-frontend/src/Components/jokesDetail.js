import React, { Component } from "react";

class JokesDetail extends Component {
  state = {
    jokeContent: this.props.joke.value
  };

  handleJokeChange = e =>
    this.setState({
      jokeContent: e.target.value
    });

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          value={this.state.jokeContent}
          onChange={this.handleJokeChange}
        />

        <button onClick={this.props.onDelete}>Delete joke</button>
        <button onClick={() => this.props.onUpdate(this.state.jokeContent)}>
          Update joke
        </button>
      </React.Fragment>
    );
  }
}

export default JokesDetail;
