import React, { Component } from "react";
import { render } from "react-dom";
import Upload from './upload';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("api/texts")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
      <Upload />
      // <ul>
      //   {this.state.data.map(text => {
      //     return (
      //         <p> Hey </p>
      //         // <Upload handleSubmit={this.handleSubmit} />

      //     );
      //   })}
      // </ul>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);