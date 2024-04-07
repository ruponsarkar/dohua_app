export const firstFunc = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "deposite",
      payload: amount,
    });
  };
};
export const secondFunc = (amount) => {
    return (dispatch) => {
        dispatch({
          type: "withdrow",
          payload: amount,
        });
      };
};
