import React from "react";

// DIALOG IMPORTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TodoUpdateDialog = ({
  handleUpdateClose,
  showUpdateDialog,
  handleUpdateConfirm,
  dialogTodo,
  setDialogTodo,
}) => {
  return (
    <Dialog
      style={{ direction: "rtl" }}
      onClose={handleUpdateClose}
      open={showUpdateDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>تعديل مهمة</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='عنوان المهمة'
          fullWidth
          variant='standard'
          value={dialogTodo?.title}
          onChange={(e) => {
            setDialogTodo({
              ...dialogTodo,
              title: e.target.value,
            });
          }}
        />

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='التفاصيل'
          fullWidth
          variant='standard'
          value={dialogTodo?.details}
          onChange={(e) => {
            setDialogTodo({
              ...dialogTodo,
              details: e.target.value,
            });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdateClose}>إغلاق</Button>
        <Button autoFocus onClick={handleUpdateConfirm}>
          تأكيد
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoUpdateDialog;
