import { Box, Chip, Stack, Typography } from "@mui/material";
import { ImportanceTypes } from "../shared/MailConsts";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import parse from "html-react-parser";

const useMailTableStyle = () => {
  useEffect(() => dayjs.extend(utc), []);

  const setImportanceField = (importanceID) => {
    switch (importanceID) {
      case ImportanceTypes.LOW.id:
        return <Chip label={ImportanceTypes.LOW.name} color="success" />;
      case ImportanceTypes.NORMAL.id:
        return <Chip label={ImportanceTypes.NORMAL.name} color="warning" />;
      case ImportanceTypes.HIGH.id:
        return <Chip label={ImportanceTypes.HIGH.name} color="error" />;
      default:
        return <Chip label={ImportanceTypes.UNKNOWN.name} />;
    }
  };

  const setEmailField = (emailAddress) => {
    return <Chip label={emailAddress} variant="outlined" />;
  };

  const setEmailListField = (emailAddressList) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        {emailAddressList.map((emailAddress, index) => {
          return <Chip key={index} label={emailAddress} variant="outlined" sx={{ mb: 1 }} />;
        })}
      </Box>
    );
  };

  const setDatetimeField = (datetime) => {
    return dayjs.utc(datetime).local().format("MM/DD/YYYY HH:mm");
  };

  const setInWrap = (content) => {
    return <Typography sx={{ wordBreak: "break-word" }}>{content}</Typography>;
  };

  const setInWrapElipse = (content) => {
    return (
      <Box sx={{ width: "11rem" }}>
        <Typography noWrap>{content}</Typography>
      </Box>
    );
  };

  const setHtmlContent = (content) => {
    return parse(content);
  };

  return {
    setImportanceField,
    setEmailField,
    setEmailListField,
    setDatetimeField,
    setInWrap,
    setInWrapElipse,
    setHtmlContent,
  };
};

export default useMailTableStyle;
