/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  Fade,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import useMailSearch from "./useMailSearch";
import toast from "react-hot-toast";
import MailDetailsDialogButton from "./MailDetailsDialogButton";
import SearchIcon from "@mui/icons-material/Search";
import useTransitionService from "../layout/useTransitionService";
import { PageIDs } from "../layout/SiteConsts";
import PageTitle from "../layout/PageTitle";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import useMailTableStyle from "./useMailTableStyle";
import RefreshIcon from "@mui/icons-material/Refresh";
import SpinnerCenter from "../layout/SpinnerCenter";

const MailTableForm = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Search"
          name="search"
          value={props.inputs.search}
          onChange={props.handleChange}
          disabled={props.isLoading}
          InputProps={{
            endAdornment: (
              <IconButton onClick={props.changeForm} variant="contained">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

const MailTableBody = (props) => {
  const { setEmailField, setDatetimeField, setInWrapElipse, setImportanceField } = useMailTableStyle();

  if (props.result?.mailList != null && props.result.mailList.length > 0) {
    return props.result.mailList.map((mailRow, index) => (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          {setEmailField(mailRow.fromMail)}
        </TableCell>
        <TableCell>{setEmailField(mailRow.toMail)}</TableCell>
        <TableCell>
          <Typography noWrap>{setInWrapElipse(mailRow.subject)}</Typography>
        </TableCell>
        <TableCell>{setImportanceField(mailRow.importanceID)}</TableCell>

        <TableCell>{setDatetimeField(mailRow.datetimeCreated)}</TableCell>
        <TableCell>
          <MailDetailsDialogButton mailID={mailRow.mailID} />
        </TableCell>
      </TableRow>
    ));
  } else
    return (
      <TableRow scope="row">
        <TableCell p={2} colspan="6" sx={{ textAlign: "center" }}>
          No mails of times past
        </TableCell>
      </TableRow>
    );
};

const MailTable = (props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                fontWeight: 700,
              },
            }}
          >
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>
              <TableSortLabel
                active={props.result?.activeColumn == "Importance"}
                direction={props.result?.ascending ? "asc" : "desc"}
                onClick={() => props.changeSorting("Importance")}
              >
                Importance
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={props.result?.activeColumn == "DatetimeCreated"}
                direction={props.result?.ascending ? "asc" : "desc"}
                onClick={() => props.changeSorting("DatetimeCreated")}
              >
                Sent on
              </TableSortLabel>
            </TableCell>

            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <MailTableBody result={props.result} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MailHistoryList = (props) => {
  const { checked } = useTransitionService(props, PageIDs.HISTORY);
  const { changePage, handleChange, setFormSubmit, result, isError, inputs, isLoading, reset, setIsError, changeSorting, changeForm, close } =
    useMailSearch(props);

  useEffect(() => {
    if (checked) {
      changeForm();
    }
  }, [checked]);

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching mailing history.");
      setIsError(false);
    }
  }, [isError]);

  const handleClose = () => {
    setTimeout(() => {
      close();
    }, "1000");
    props.setPageID(PageIDs.MAIN);
  };

  return (
    <Fade in={checked} timeout={500} unmountOnExit onExited={() => props.setTransitionOn(true)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PageTitle title={"Mail History"} />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <IconButton size="large" onClick={handleClose}>
                <KeyboardArrowLeftIcon color="primary" sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>

            <Button variant="outlined" onClick={reset} startIcon={<RefreshIcon />}>
              Reset
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {isLoading && <SpinnerCenter />}

          {!isLoading && (
            <Fade in={!isLoading}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <MailTableForm handleChange={handleChange} changeForm={changeForm} inputs={inputs} isLoading={isLoading} />
                </Grid>
                <Grid item xs={12}>
                  <MailTable changeSorting={changeSorting} isError={isError} result={result} />
                </Grid>
              </Grid>
            </Fade>
          )}
        </Grid>
        <Grid item xs={12} sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          {result != null && (
            <Pagination
              count={result.pageNumTotal}
              page={result.currentPage}
              onChange={changePage}
              defaultPage={1}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              shape="rounded"
            />
          )}
        </Grid>
      </Grid>
    </Fade>
  );
};

export default MailHistoryList;
