import React, { Component } from "react";
import "./App.css";

class JokesList extends Component {
  renderViewButton = index => {
    return <button onClick={() => this.props.onSelect(index)}>View</button>;
  };
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
            {this.props.jokes.map((joke, index) => (
              <tr key={index}>
                <td>{joke}</td>
                <td>{this.renderViewButton(index)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default JokesList;
