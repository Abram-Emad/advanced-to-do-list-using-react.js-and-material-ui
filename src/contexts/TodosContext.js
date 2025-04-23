import { useReducer, createContext, useContext } from "react";
import TodosReducer from "../reducers/TodosReducer";

export const TodosContext = createContext([]);
export const DispatchTodosContext = createContext(null);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(TodosReducer, []);
  return (
    <TodosContext.Provider value={todos}>
      <DispatchTodosContext.Provider value={dispatch}>
        {children}
      </DispatchTodosContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
export const useTodosDispatch = () => useContext(DispatchTodosContext);

export default TodosProvider;
