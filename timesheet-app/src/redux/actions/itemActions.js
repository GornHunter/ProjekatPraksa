import axios from "axios";

export function createItem(item) {
  //debugger;
  return {
    type: "CREATE_ITEM",
    title: item.item.title,
    hours: item.item.hours,
    date: item.date,
  };
}

export function loadItems(items) {
  return { type: "LOAD_ITEM", items: items };
}

export function addItem(item) {
  return (dispatch) => {
    axios
      .post("http://localhost:35216/api/Item/PostItem", {
        title: item.item.title,
        hours: item.item.hours,
        date: item.date,
      })
      .then((response) => {
        dispatch(createItem(item));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getItems(date) {
  return (dispatch) => {
    axios
      .get(`http://localhost:35216/api/Item/GetItem/${date}`)
      .then((items) => {
        dispatch(loadItems(items));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
