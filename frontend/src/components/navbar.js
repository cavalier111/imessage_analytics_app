import React, { Component } from "react";
import { render } from "react-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" style={{fontSize: "20px"}} href="/">iStats<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Where to?
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/">Home</a>
                  <a className="dropdown-item" href="/wordcloud">Word cloud</a>
                  <a className="dropdown-item" href="/emojicloud">Emoji cloud</a>
                  <a className="dropdown-item" href="/tapbacks">Tapback analytics</a>
                  <a className="dropdown-item" href="/compare">Pie chart comparison</a>
                  <a className="dropdown-item" href="/calmap">Calendar heat map</a>
                  <a className="dropdown-item" href="/monthly">Monthly data</a>
                  <a className="dropdown-item" href="/weekly">Weekly data</a>
                  <a className="dropdown-item" href="/daily">Daily data</a>
                  <a className="dropdown-item" href="/weekday">Weekday data</a>
                  <a className="dropdown-item" href="/hourly">Hourly data</a>
                  <a className="dropdown-item" href="/polWeekDay">Sentiment Weekday</a>
                  <a className="dropdown-item" href="/polWeek">Sentiment Monthly</a>
              </div>
              </li>
            </ul>
          </div>
        <span className="navbar-text" style={{float: "right"}}>
            Texts Submitted on:
          </span>
        </nav>
      </div>
    );
  }
}

export default Navbar;
