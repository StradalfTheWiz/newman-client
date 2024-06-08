import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useEffect } from "react";
import useMailDetailsGet from "./useMailDetailsGet";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import useMailTableStyle from "./useMailTableStyle";
import SpinnerCenter from "../layout/SpinnerCenter";

const MailDetails = (props) => {
  const { setImportanceField, setEmailField, setEmailListField, setDatetimeField, setInWrap, setHtmlContent } = useMailTableStyle();

  if (props.result != null) {
    const { mailInfo } = props.result;

    return (
      <TableContainer>
        <Table>
          <TableBody
            sx={{
              "& th": {
                fontWeight: 700,
              },
            }}
          >
            <TableRow>
              <TableCell component="th">From</TableCell>
              <TableCell>{setEmailField(mailInfo.fromMail)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">To</TableCell>
              <TableCell>{setEmailField(mailInfo.toMail)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Subject</TableCell>
              <TableCell>{setInWrap(mailInfo.subject)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">CC</TableCell>
              <TableCell>{setEmailListField(mailInfo.ccMailList)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Importance</TableCell>
              <TableCell>{setImportanceField(mailInfo.importanceID)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Mail Content</TableCell>
              <TableCell>{setInWrap(setHtmlContent(mailInfo.mailContent))}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Sent on</TableCell>
              <TableCell>{setDatetimeField(mailInfo.datetimeCreated)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else return <SpinnerCenter />;
};

const MailDetailsDialogButton = (props) => {
  const [open, setOpen] = useState(false);
  const { getDetails, result, isError, isLoading } = useMailDetailsGet();

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      getDetails(props.mailID);
    }
  }, [open]);

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        VIEW
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Grid container p={3}>
          <Grid item xs={12}>
            <MailDetails result={result} />
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MailDetailsDialogButton;
