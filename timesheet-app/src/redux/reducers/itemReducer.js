export default function itemReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_ITEM":
      //debugger;
      return [
        ...state,
        {
          title: action.title,
          hours: action.hours,
          date: action.date,
        },
      ];
    case "LOAD_ITEM":
      //promenjeno bilo action.items.data
      return [...action.items.data];
    default:
      return state;
  }
}
