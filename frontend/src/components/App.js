import React, { Component } from "react";
import { render } from "react-dom";
import Upload from './upload';
import Wordheader from './wordheader';
import Wordcloud from './wordcloud';
import Bargraph from './bargraph';


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
      // <Upload />
      <div>
        <Wordheader />
        {/* <Wordcloud frequencyList={[{"text":"abcd", value: 50}]} /> */}
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);