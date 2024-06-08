/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PageIDs } from "../layout/SiteConsts";

const CancelMailConfirmButton = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    // close dialog
    setOpen(false);
    // clear inputs (no validation)
    props.cancelForm();
    // back to main page (fade out form and switch)
    props.setPageID(PageIDs.MAIN);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} fullWidth>
        Cancel
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Cancel email submission?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>All changes will be lost.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CancelMailConfirmButton;
