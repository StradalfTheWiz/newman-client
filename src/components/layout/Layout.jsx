import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import MailSubmitForm from "../mailSubmit/MailSubmitForm";
import { Toaster } from "react-hot-toast";
import { Box, Button, Fade, Grow, Stack } from "@mui/material";
import imageExample1 from "../../assets/newman_logo_final.jpg";
import MailHistoryList from "../mailList/MailHistoryList";
import { PageIDs } from "./SiteConsts";
import EmailIcon from "@mui/icons-material/Email";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OutboxIcon from "@mui/icons-material/Outbox";

const Logo = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" textAlign="center">
      <Box
        component="img"
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
        src={imageExample1}
      />
    </Box>
  );
};

const MenuButton = (props) => {
  const { icon: Icon } = props;
  return (
    <Button
      variant="outlined"
      sx={{
        border: "7px solid",
        fontSize: 50,
        color: "black",
        ":hover": {
          border: "7px solid",
          backgroundColor: "#dedede",
        },
      }}
      onClick={() => {
        if (props.link) {
          window.open(props.link);
        } else {
          props.setPageID(props.pageID);
        }
      }}
      startIcon={<Icon />}
    >
      {props.text}
    </Button>
  );
};

const Menu = (props) => {
  const bs = { width: 50, height: 50 };

  return (
    <Fade in={true} timeout={1000}>
      <Box display="flex" justifyContent="center" alignItems="center" textAlign="center">
        <Stack direction={{ sm: "column", md: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          <MenuButton
            text={"MAIL"}
            pageID={PageIDs.SEND_MAIL}
            setPageID={props.setPageID}
            icon={() => {
              return <EmailIcon sx={bs} />;
            }}
          />
          <MenuButton
            text={"HISTORY"}
            pageID={PageIDs.HISTORY}
            setPageID={props.setPageID}
            icon={() => {
              return <OutboxIcon sx={bs} />;
            }}
          />
          <MenuButton
            text={"PREMIUM"}
            link={"https://www.youtube.com/watch?v=YMBsDWUW1Lw"}
            setPageID={props.setPageID}
            icon={() => {
              return <ShoppingCartIcon sx={bs} />;
            }}
          />
        </Stack>
      </Box>
    </Fade>
  );
};

const MainPage = (props) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (props.pageID == PageIDs.MAIN && props.transitionOn) {
      setChecked(true);
      props.setTransitionOn(false);
    }
  }, [props.transitionOn]);

  useEffect(() => {
    if (props.pageID != PageIDs.MAIN && checked) {
      setChecked(false);
    }
  }, [props.pageID]);

  return (
    <>
      <Fade in={checked} timeout={500} unmountOnExit onExited={() => props.setTransitionOn(true)}>
        <div>
          <Logo />
          <Menu setPageID={props.setPageID} />
        </div>
      </Fade>
    </>
  );
};

const PageSwitch = (props) => {
  return (
    <>
      <MainPage pageID={props.pageID} setPageID={props.setPageID} transitionOn={props.transitionOn} setTransitionOn={props.setTransitionOn} />
      <MailSubmitForm pageID={props.pageID} setPageID={props.setPageID} transitionOn={props.transitionOn} setTransitionOn={props.setTransitionOn} />
      <MailHistoryList pageID={props.pageID} setPageID={props.setPageID} transitionOn={props.transitionOn} setTransitionOn={props.setTransitionOn} />
    </>
  );
};

const Layout = () => {
  const [pageID, setPageID] = useState(PageIDs.MAIN);
  const [transitionOn, setTransitionOn] = useState(true);

  return (
    <>
      <Container maxWidth="lg">
        <PageSwitch pageID={pageID} setPageID={setPageID} transitionOn={transitionOn} setTransitionOn={setTransitionOn} />
        <Toaster />
      </Container>
    </>
  );
};

export default Layout;
