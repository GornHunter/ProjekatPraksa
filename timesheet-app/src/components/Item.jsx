import React from "react";
import { connect } from "react-redux";
import * as itemActions from "../redux/actions/itemActions";
import maximumHours from "./maximumHours.json";
import { bindActionCreators } from "redux";

class Item extends React.Component {
  state = {
    maxHours: maximumHours.maxHours,
    totalHours: 0,
    item: {
      title: "",
      hours: 1,
      date: "",
    },
  };

  handleChangeTitle = (e) => {
    const item = {
      ...this.state.item,
      title: e.target.value,
    };
    this.setState({ item });

    this.setState({
      ...this.state.item,
      date: localStorage.getItem("myStorage") || "",
    });
  };

  handleChangeHours = (e) => {
    const item = {
      ...this.state.item,
      hours: +e.target.value,
    };

    this.setState({ item });
  };

  handleEvent = (e) => {
    e.preventDefault();

    if (
      parseInt(this.state.totalHours) + parseInt(this.state.item.hours) >
      this.state.maxHours
    ) {
      alert("You have exceded maximum hours per day!");
    } else {
      //this.setState({
      //  ...this.state,
      //  totalHours:
      //    parseInt(this.state.totalHours) + parseInt(this.state.item.hours),
      //});

      this.props.actions.addItem(this.state);
    }
  };

  componentDidMount() {
    if (localStorage.getItem("myStorage") !== "")
      this.props.actions.getItems(localStorage.getItem("myStorage"));
  }

  componentDidUpdate(prevProps) {
    if (this.props.items.length > prevProps.items.length) {
      this.props.actions.getItems(localStorage.getItem("myStorage"));

      let sum = this.props.items.reduce(
        (total, currentValue) =>
          total +
          parseInt(
            currentValue["Hours"] === undefined
              ? currentValue["hours"]
              : currentValue["Hours"]
          ),
        0
      );

      this.setState({
        ...this.state,
        totalHours: parseInt(sum),
      });
    } else if (this.props.items.length === prevProps.items.length) {
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.items.map((item, i) => (
          <div key={"id_" + i} className="item-row">
            <div className="check-flag">
              <span className="small-text-label">Title</span>
              <span className="small-text-label hours">Hours</span>
              <span className="check-flag-label">{item.Title}</span>
              <span className="hours-box">{item.Hours}</span>
            </div>
          </div>
        ))}
        <div className="modal-wrap js-modal">
          <div className="modal js-modal-inner">
            <h2>Create a task:</h2>
            <form onSubmit={this.handleEvent}>
              <div className="field-wrap">
                <label className="label" htmlFor="Title">
                  Title:
                </label>
                <input
                  className="field"
                  type="text"
                  id="title"
                  placeholder="Enter title here..."
                  onChange={this.handleChangeTitle}
                  value={this.state.item.title}
                ></input>
              </div>
              <div className="field-wrap">
                <label className="label" htmlFor="Hours">
                  Hours:
                </label>
                <input
                  className="field"
                  type="text"
                  id="hours"
                  placeholder="Add hours here..."
                  onChange={this.handleChangeHours}
                  value={+this.state.item.hours}
                ></input>
              </div>
              <div className="btn-wrap align-right">
                <input
                  className="btn"
                  type="submit"
                  value="Create"
                  id="close"
                  disabled={
                    this.state.item.title === "" ||
                    this.state.item.hours === "" ||
                    this.state.item.hours === 0
                      ? true
                      : false
                  }
                ></input>
              </div>
            </form>
          </div>
        </div>
        <div className="total align-right">
          <label htmlFor="Total" className="total-label">
            Total:
          </label>
          <input
            className="total-input"
            type="text"
            value={this.state.totalHours.toString()}
            readOnly
          ></input>
        </div>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(itemActions, dispatch),
  };
}

function mapStateToProps(state) {
  //debugger;
  return {
    items: state.items,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
