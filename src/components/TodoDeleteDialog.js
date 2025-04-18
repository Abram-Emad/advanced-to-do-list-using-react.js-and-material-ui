import React from "react";

// DIALOG IMPORTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const TodoDeleteDialog = ({
  handleDeleteDialogClose,
  showDeleteDialog,
  handleDeleteConfirm,
}) => {
  return (
    <Dialog
      style={{ direction: "rtl" }}
      onClose={handleDeleteDialogClose}
      open={showDeleteDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>
        هل أنت متأكد من رغبتك في حذف المهمة؟
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          لا يمكنك التراجع عن الحذف بعد إتمامه
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
        <Button autoFocus onClick={handleDeleteConfirm}>
          نعم، قم بالحذف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoDeleteDialog;
