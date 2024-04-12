const initialState = {
    user: false,
    token: null,
    error: null,
  };

  const getUser = (state = initialState, action) =>{
    //   console.log("action", action);
    if(action.type == 'login'){
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token
        }
    }
    if(action.type == 'logout'){
        return {
            ...state,
            user: null,
            token: null
        }
    }
    else{
        return {
            ...state
        }
    }

  }
  
  export default getUser;

