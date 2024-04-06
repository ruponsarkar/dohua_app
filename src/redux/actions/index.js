export const firstFunc = (data) => {
  return (dispatch) => {
    dispatch({
      type: "deposite",
      payload: data,
    });
  };
};
export const secondFunc = (data) => {
    return (dispatch) => {
        dispatch({
          type: "withdrow",
          payload: data,
        });
      };
};
