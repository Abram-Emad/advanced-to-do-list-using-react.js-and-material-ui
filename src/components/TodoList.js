import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// Components
import Todo from "./Todo";
import TodoDeleteDialog from "./TodoDeleteDialog";
import TodoUpdateDialog from "./TodoUpdateDialog";

// OTHERS
import { useTodos, useTodosDispatch } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";
import { useState, useEffect, useMemo } from "react";

const TodoList = () => {
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const { showHideToast } = useToast();

  const [dialogTodo, setDialogTodo] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.isCompleted);
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((todo) => !todo.isCompleted);
  }, [todos]);

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "not-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
    dispatch({ type: "getAllTodos" });
  }, [dispatch]);

  function changeDisplayedType(event) {
    setDisplayedTodosType(event.target.value);
  }

  function handleAddClick() {
    dispatch({ type: "addTodo", payload: { newTitle: titleInput } });
    setTitleInput("");
    showHideToast("تمت إضافة المهمة بنجاح");
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    dispatch({ type: "deleteTodo", payload: dialogTodo });
    setShowDeleteDialog(false);
    showHideToast("تمت حذف المهمة بنجاح");
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    dispatch({ type: "updateTodo", payload: dialogTodo });
    setShowUpdateDialog(false);
    showHideToast("تمت تعديل المهمة بنجاح");
  }

  const todosJsx = todosToBeRendered.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });

  return (
    <>
      <TodoDeleteDialog
        handleDeleteDialogClose={handleDeleteDialogClose}
        showDeleteDialog={showDeleteDialog}
        handleDeleteConfirm={handleDeleteConfirm}
      />

      <TodoUpdateDialog
        handleUpdateClose={handleUpdateClose}
        showUpdateDialog={showUpdateDialog}
        handleUpdateConfirm={handleUpdateConfirm}
        dialogTodo={dialogTodo}
        setDialogTodo={setDialogTodo}
      />

      <Container maxWidth='sm'>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant='h2' style={{ fontWeight: "bold" }}>
              مهامي
            </Typography>
            <Divider />

            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "30px" }}
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label='text alignment'
              color='primary'>
              <ToggleButton value='not-completed'>غير المنجز</ToggleButton>
              <ToggleButton value='completed'>المنجز</ToggleButton>
              <ToggleButton value='all'>الكل</ToggleButton>
            </ToggleButtonGroup>

            <div
              style={{
                maxHeight: "40dvh",
                overflow: "scroll",
              }}>
              {todosJsx}
            </div>

            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid size={8}>
                <TextField
                  style={{ width: "100%" }}
                  id='outlined-basic'
                  label='عنوان المهمة'
                  variant='outlined'
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>

              <Grid size={4}>
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant='contained'
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput.length === 0}>
                  إضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default TodoList;
