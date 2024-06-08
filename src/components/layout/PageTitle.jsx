import { Box, Typography } from "@mui/material";

const PageTitle = (props) => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" p={3}>
        <Typography variant="h3">{props.title}</Typography>
      </Box>
    </>
  );
};

export default PageTitle;
