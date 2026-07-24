import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteEmployeeDialog({
  open,
  handleClose,
  selectedEmployee,
  employees,
  setEmployees,
}) {

  const handleDelete = () => {

    setEmployees(
      employees.filter(
        (item) => item.id !== selectedEmployee.id
      )
    );

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Employee
      </DialogTitle>

      <DialogContent>

        <DialogContentText>

          Are you sure you want to delete
          <strong> {selectedEmployee?.name}</strong> ?

          <br />
          <br />

          This action cannot be undone.

        </DialogContentText>

      </DialogContent>

      <DialogActions>

        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default DeleteEmployeeDialog;