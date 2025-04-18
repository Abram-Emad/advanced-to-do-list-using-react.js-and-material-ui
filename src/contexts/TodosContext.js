import { useReducer, createContext, useContext } from "react";
import TodosReducer from "../reducers/TodosReducer";

export const TodosContex = createContext([]);
export const DispatchTodosContext = createContext(null);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(TodosReducer, []);
  return (
    <TodosContex.Provider value={todos}>
      <DispatchTodosContext.Provider value={dispatch}>
        {children}
      </DispatchTodosContext.Provider>
    </TodosContex.Provider>
  );
};

export const useTodos = () => useContext(TodosContex);
export const useTodosDispatch = () => useContext(DispatchTodosContext);

export default TodosProvider;
