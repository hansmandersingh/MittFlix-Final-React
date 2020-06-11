import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  state = {
    textInput: "",
  };

  updateTextField = (e) => {
    this.setState({ textInput: e.target.value }, () =>
      this.props.filterMovies(this.state.textInput)
    );
  };

  render() {
    return (
      <header className="header">
        <Link to="/">
          <img
            src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
            alt="netflix-font"
            border="0"
          />
        </Link>
        <div id="navigation" className="navigation">
          <nav>
            <ul>
              <li>
                <Link to="/myList">My List</Link>
              </li>
            </ul>
          </nav>
        </div>
        <form id="search" className="search">
          <input
            type="search"
            placeholder="Search for a title..."
            value={this.state.textInput}
            onChange={this.updateTextField}
          />
          {this.state.textInput !== "" ? (
            <div className="searchResults">{`Found ${this.props.allMovies.length} movies with the query "${this.state.textInput}"`}</div>
          ) : (
            ""
          )}
        </form>
      </header>
    );
  }
}

export default Header;
