export const initialState = [];

export const studentReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_STUDENTS':
      return action.payload;
    case 'ADD_STUDENT':
      return [...state, action.payload];
    case 'UPDATE_STUDENT':
      return state.map(student => 
        student.id === action.payload.id ? action.payload : student
      );
    case 'DELETE_STUDENT':
      return state.filter(student => student.id !== action.payload);
    default:
      return state;
  }
};
