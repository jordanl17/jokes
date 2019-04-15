import React, { Component } from "react";

class JokesDetail extends Component {
  state = {
    joke: this.props.joke
  };

  handleJokeChange = e => {
    const value = e.target.value;
    this.setState(prevState => ({
      joke: {
        id: prevState.joke.id,
        value
      }
    }));
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState) {
      return { joke: nextProps.joke };
    } else if (!nextProps.joke) {
      // in the case of deleting a joke
      return null;
    } else if (nextProps.joke.id !== prevState.joke.id) {
      return { joke: nextProps.joke };
    } else {
      return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          value={this.state.joke.value}
          onChange={this.handleJokeChange}
        />

        <button onClick={this.props.onDelete}>Delete joke</button>
        <button onClick={() => this.props.onUpdate(this.state.joke.value)}>
          Update joke
        </button>
      </React.Fragment>
    );
  }
}

export default JokesDetail;
