import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';

// ICONS
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import IconButton from "@mui/material/IconButton";
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';

import { useTodosDispatch } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";

const Todo = ({ todo, showDelete, showUpdate }) => {
  const dispatch = useTodosDispatch();
  const { showHideToast } = useToast();

  function handleCheckClick() {
    dispatch({ type: "toggledCompletedTodo", payload: todo });
    showHideToast("تم التعديل بنجاح");
  }

  function handleDeleteClick() {
    showDelete(todo);
  }

  function handleUpdateClick() {
    showUpdate(todo);
  }

  return (
    <>
      <Card
        className='todoCard'
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant='h5'
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}>
                {todo.title}
              </Typography>

              <Typography variant='h6' sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>

            <Grid
              size={4}
              display='flex'
              justifyContent='space-around'
              alignItems='center'>
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className='iconButton'
                aria-label='delete'
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}>
                <FactCheckTwoToneIcon />
              </IconButton>
              <IconButton
                onClick={handleUpdateClick}
                className='iconButton'
                aria-label='delete'
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}>
                <EditNoteTwoToneIcon />
              </IconButton>
              <IconButton
                className='iconButton'
                aria-label='delete'
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleDeleteClick}>
                <DeleteSweepTwoToneIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
