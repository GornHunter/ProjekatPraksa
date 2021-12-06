import React from "react";
import { withRouter } from "react-router-dom";

function Date({ location }) {
  localStorage.setItem("myStorage", location.pathname.split("/")[1]);

  return <time>{location.pathname.split("/")[1]}</time>;
}

export default withRouter(Date);
