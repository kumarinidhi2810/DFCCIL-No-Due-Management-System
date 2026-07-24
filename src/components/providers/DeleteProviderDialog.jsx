import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteProviderDialog({
  open,
  handleClose,
  selectedProvider,
  providers,
  setProviders,
}) {

  const handleDelete = () => {

    setProviders(
      providers.filter(
        (item) => item.id !== selectedProvider.id
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
        Delete Provider
      </DialogTitle>

      <DialogContent>

        <DialogContentText>

          Are you sure you want to delete
          <strong> {selectedProvider?.name}</strong> ?

          <br /><br />

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

export default DeleteProviderDialog;