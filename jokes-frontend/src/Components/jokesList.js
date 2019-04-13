import React, { Component } from "react";
import "./App.css";

class JokesList extends Component {
  state = {
    newJoke: ""
  };
  renderViewButton = index => (
    <button onClick={() => this.props.onSelect(index)}>View</button>
  );

  handleNewJoke = e => {
    this.setState({ newJoke: e.target.value });
  };

  renderAddButton = () => (
    <button
      disabled={this.state.newJoke === ""}
      onClick={() => {
        this.props.onNewJoke(this.state.newJoke);
        this.setState({ newJoke: "" });
      }}
    >
      Add
    </button>
  );

  render() {
    return (
      <div className="Jokes-List">
        <table>
          <thead>
            <tr className="List-Header">
              <th>joke ({this.props.jokes.length})</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="type a new joke"
                  value={this.state.newJoke}
                  style={{ width: "100%" }}
                  onChange={this.handleNewJoke}
                />
              </td>
              <td>{this.renderAddButton()}</td>
            </tr>
            {this.props.jokes.map(({ value, id }) => (
              <tr key={id}>
                <td>{value}</td>
                <td>{this.renderViewButton(id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default JokesList;
