import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import JokesList from "./jokesList";
import JokesDetail from "./jokesDetail";

class App extends Component {
  state = {
    loaded: false,
    jokes: undefined,
    selectedIndex: undefined
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:3050/jokes")
      .then(({ data: jokes }) => {
        this.setState({ jokes, loaded: true }, () => console.log(this.state));
      })
      .catch(err => this.setState({ err }));
  };

  handleUpdate = newJokeContent => {
    const request = {
      joke: newJokeContent
    };
    axios
      .patch(
        `http://localhost:3050/joke?id=${this.state.selectedIndex}`,
        request
      )
      .then(() => {
        const { jokes, selectedIndex } = this.state;
        let newJokes = [...jokes].map((joke, index) => {
          return index !== selectedIndex ? joke : newJokeContent;
        });
        this.setState({
          jokes: newJokes
        });
      });
  };

  handleDelete = () => {
    axios
      .delete(`http://localhost:3050/joke?id=${this.state.selectedIndex}`)
      .then(() => {
        const { jokes } = this.state;
        const newJokes = [];
        [...jokes].forEach((joke, index) => {
          if (index !== this.state.selectedIndex) {
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

  handleSelect = index => {
    this.setState({ selectedIndex: index });
  };

  getSelectedJoke = () => {
    const { selectedIndex, jokes } = this.state;
    return {
      value: jokes[selectedIndex],
      index: selectedIndex
    };
  };

  renderViews = () => {
    const { selectedIndex, jokes } = this.state;

    return (
      <React.Fragment>
        <JokesList jokes={jokes} onSelect={this.handleSelect} />
        {selectedIndex !== undefined ? (
          <JokesDetail
            joke={this.getSelectedJoke()}
            selectedIndex={selectedIndex}
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
