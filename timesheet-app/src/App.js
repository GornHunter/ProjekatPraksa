import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Item from "./components/Item";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="page-wrap">
          <Header />

          <main className="main">
            <div className="wrap">
              <Item />
            </div>
          </main>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
