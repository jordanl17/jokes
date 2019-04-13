import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import JokesList from "./jokesList";
import JokesDetail from "./jokesDetail";

class App extends Component {
  state = {
    loaded: false,
    jokes: undefined,
    selectedId: undefined
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:3050/jokes")
      .then(({ data: jokes }) => {
        const jokesWithId = jokes.map((joke, index) => ({
          value: joke,
          id: index
        }));
        this.setState({ jokes: jokesWithId, loaded: true });
      })
      .catch(err => this.setState({ err }));
  };

  handleUpdate = newJokeContent => {
    const request = {
      joke: newJokeContent
    };
    axios
      .patch(`http://localhost:3050/joke?id=${this.state.selectedId}`, request)
      .then(() => {
        const { jokes, selectedId } = this.state;
        let newJokes = [...jokes].map(({ value, id }) => {
          return id !== selectedId
            ? { value, id }
            : { value: newJokeContent, id };
        });
        this.setState({
          jokes: newJokes
        });
      })
      .catch(err => console.log(err));
  };

  handleDelete = () => {
    axios
      .delete(`http://localhost:3050/joke?id=${this.state.selectedId}`)
      .then(() => {
        const { jokes } = this.state;
        const newJokes = [];
        [...jokes].forEach(joke => {
          if (joke.id !== this.state.selectedId) {
            newJokes.push(joke);
          }
        });

        this.setState({
          jokes: newJokes,
          selectedIndex: undefined
        });
      })
      .catch(err => this.setState({ err }));
  };

  handleSelect = id => {
    this.setState({ selectedId: id });
  };

  getSelectedJoke = () => {
    const { selectedId, jokes } = this.state;
    return jokes.find(({ id }) => id === selectedId);
  };

  handleNewJoke = newJokeContent => {
    const request = {
      joke: newJokeContent
    };
    axios.post("http://localhost:3050/joke", request).then(() => {
      const { jokes } = this.state;
      const newJokes = [{ value: newJokeContent, id: jokes.length }, ...jokes];

      this.setState({
        jokes: newJokes
      });
    });
  };

  renderViews = () => {
    const { selectedId, jokes } = this.state;

    return (
      <React.Fragment>
        <JokesList
          jokes={jokes}
          onSelect={this.handleSelect}
          onNewJoke={this.handleNewJoke}
        />
        {selectedId !== undefined ? (
          <JokesDetail
            joke={this.getSelectedJoke()}
            selectedIndex={selectedId}
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
          />
        ) : (
          <div>Select a joke from above</div>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { loaded } = this.state;
    return (
      <div className="App">
        {loaded ? this.renderViews() : <div>loading...</div>}
      </div>
    );
  }
}

export default App;
