import { Autocomplete, Box, Button, Chip, Fade, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useSubmit from "./useSubmit";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import CancelMailConfirmButton from "./CancelMailConfirmButton";
import toast from "react-hot-toast";
import { PageIDs, SiteConsts } from "../layout/SiteConsts";
import PageTitle from "../layout/PageTitle";
import useTransitionService from "../layout/useTransitionService";
import { ImportanceTypes } from "../shared/MailConsts";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  HtmlButton,
  Separator,
  Toolbar,
  Editor,
  EditorProvider,
} from "react-simple-wysiwyg";

const MailSubmitForm = (props) => {
  const initialValues = {
    fromMail: "",
    toMail: "",
    subject: "",
    mailContent: "",
    ccMailList: [],
    importance: "",
    errors: {},
  };

  const { checked } = useTransitionService(props, PageIDs.SEND_MAIL);
  const { submitMail, handleChange, result, isError, inputs, isLoading, cancelForm, setIsError } = useSubmit(props, initialValues);

  useEffect(() => {
    if (result) {
      if (result.isSuccess) {
        if (!result.isTrialOver) {
          toast.success("Mail sent successfully.");
          cancelForm();
          // back to main page
          props.setPageID(PageIDs.MAIN);
        } else {
          toast.error("Uh-huh. You have reached a limit for sending mail. To continue, please purchase Premium version.");
          cancelForm();
          // back to main page
          props.setPageID(PageIDs.MAIN);
        }
      } else {
        toast.error("Error in mail submission. Please try again later.");
      }
    }
  }, [result]);

  useEffect(() => {
    if (isError) {
      toast.error("Error in mail submission. Please try again later.");
      setIsError(false);
    }
  }, [isError]);

  return (
    <>
      <Fade in={checked} timeout={500} unmountOnExit onExited={() => props.setTransitionOn(true)}>
        <Box sx={{ mt: 1 }} display="flex" justifyContent="center" alignItems="center">
          <Grid container spacing={2} sx={{ maxWidth: { sm: "100%", md: "50%" } }}>
            <Grid item xs={12}>
              <PageTitle title={"Send Mail"} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="From"
                name="fromMail"
                value={inputs.fromMail}
                onChange={handleChange}
                error={inputs.errors.fromMail != null}
                helperText={inputs.errors.fromMail}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="To"
                name="toMail"
                value={inputs.toMail}
                onChange={handleChange}
                error={inputs.errors.toMail != null}
                helperText={inputs.errors.toMail}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={inputs.subject}
                onChange={handleChange}
                error={inputs.errors.subject != null}
                helperText={inputs.errors.subject}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                defaultValue={[]}
                value={inputs.ccMailList}
                onChange={(event, newValue) => {
                  handleChange(event, "ccMailList", newValue);
                }}
                onKeyDown={(e) => {
                  if (e.code === "Comma" && e.target.value) {
                    e.key = "Enter"; // will actually call 'onChange'
                  }
                }}
                autoSelect={true} // will actually call 'onChange' when losing focus
                disabled={isLoading}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <>
                        <Chip
                          variant="outlined"
                          label={option}
                          key={key}
                          color={inputs.errors.ccMailList?.elements && inputs.errors.ccMailList.elements.includes(index) ? "error" : "primary"}
                          {...tagProps}
                        />
                      </>
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="CC"
                    name="ccMailList"
                    error={inputs.errors.ccMailList != null}
                    helperText={inputs.errors.ccMailList?.msg}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={inputs.errors.importance != null} disabled={isLoading}>
                <InputLabel>Importance</InputLabel>
                <Select value={inputs.importance} name="importance" label="Importance" onChange={(ev) => handleChange(ev)}>
                  <MenuItem value={ImportanceTypes.LOW.id}>{ImportanceTypes.LOW.name}</MenuItem>
                  <MenuItem value={ImportanceTypes.NORMAL.id}>{ImportanceTypes.NORMAL.name}</MenuItem>
                  <MenuItem value={ImportanceTypes.HIGH.id}>{ImportanceTypes.HIGH.name}</MenuItem>
                </Select>
                {inputs.errors.importance && <FormHelperText>{inputs.errors.importance}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                fullWidth
                multiline
                rows={4}
                label="Content"
                name="mailContent"
                value={inputs.mailContent}
                onChange={handleChange}
                error={inputs.errors.mailContent != null}
                helperText={inputs.errors.mailContent}
                disabled={isLoading}
              /> */}
              <EditorProvider>
                <Editor
                  value={inputs.mailContent}
                  name="mailContent"
                  onChange={handleChange}
                  containerProps={{ style: { fontFamily: SiteConsts.FONT_KEY_GLOBAL_1, resize: "vertical", minHeight: "200px" } }}
                >
                  <Toolbar>
                    <BtnUndo />
                    <BtnRedo />
                    <Separator />
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />
                    <BtnClearFormatting />
                    <HtmlButton />
                    <Separator />
                    <BtnStyles />
                  </Toolbar>
                </Editor>
              </EditorProvider>
              {inputs.errors.mailContent && <FormHelperText error>{inputs.errors.mailContent}</FormHelperText>}
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                onClick={submitMail}
                startIcon={<SendIcon />}
                loading={isLoading}
                loadingPosition="start"
                fullWidth
                variant="contained"
                sx={{ borderRadius: "0px" }}
              >
                Send
              </LoadingButton>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <CancelMailConfirmButton cancelForm={cancelForm} setPageID={props.setPageID} />
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </>
  );
};

export default MailSubmitForm;
