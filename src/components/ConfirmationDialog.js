//Importing the react library 
import React from 'react';
//specific components from the Material-UI library. 
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
//functional component called ConfirmationDialog
//It accepts four props: open, onClose, onConfirm, and task.
// These props will be passed to the component when it is used.

const ConfirmationDialog = ({ open, onClose, onConfirm, task }) => {
  const handleCancel = () => {
    // This line declares a function called handleCancel that is 
    // executed when the "Cancel" button is clicked. 
    // It calls the onClose function, which is passed as a prop,
    // to close the dialog box.
    onClose();
  };

  const handleConfirm = () => {//declares a function called handleConfirm
    onConfirm();
    //This is executed when the "Delete" button is clicked. 
    //It first calls the onConfirm function, which is passed as a prop,
    // to perform the delete operation. 
    //Then it calls the onClose function to close the dialog box.
    onClose();
  };
// This line starts the return statement, 
//which specifies the JSX code that will be rendered by this component.
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Are you Sure Want to Delete Important Task</DialogTitle>
      <DialogContent>{/* Add additional content or message here if needed */}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
