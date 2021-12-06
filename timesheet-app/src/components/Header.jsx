import React from "react";
import quotes from "./quotes.json";
import Date from "./Date";
import { Route } from "react-router-dom";

class Header extends React.Component {
  state = {
    quote: quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)],
  };

  render() {
    return (
      <React.Fragment>
        <header className="header">
          <div className="wrap">
            <span className="btn-icon">
              <img
                className="icon icon-plus js-modal-init"
                src="icons/icon-plus.svg"
                alt="Add New Item"
              ></img>
            </span>
            <div className="header-blockquote">
              <h1 className="header-quote">{this.state.quote.quote}</h1>
              <div className="header-cite">{this.state.quote.author}</div>
            </div>
          </div>
          <div className="header-inner">
            <div className="wrap">
              <img
                className="logo"
                src="images/vegait-logo.svg"
                alt="VegaIT"
              ></img>
              <div className="date-wrap">
                <img
                  className="icon"
                  src="icons/icon-calendar.svg"
                  alt="Calendar"
                ></img>
                <Route to="/:date" component={Date} />
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
