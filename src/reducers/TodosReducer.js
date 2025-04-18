import { v4 as uuidv4 } from "uuid";

function TodosReducer(currentTodos, action) {
  switch (action.type) {
    case "addTodo": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "deleteTodo": {
      const updatedTodos = currentTodos.filter((todo) => {
        return todo.id !== action.payload.id;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "updateTodo": {
      const updatedTodos = currentTodos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return todo;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "getAllTodos": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }

    case "toggledCompletedTodo": {
      const updatedTodos = currentTodos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        } else {
          return todo;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error("Unknown Action " + action.type);
    }
  }
}

export default TodosReducer;
