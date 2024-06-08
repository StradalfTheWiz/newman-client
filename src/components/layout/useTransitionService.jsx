import { useEffect, useState } from "react";
import { PageIDs } from "./SiteConsts";

const useTransitionService = (props, thisPageID) => {
  const [checked, setChecked] = useState();

  useEffect(() => {
    if (props.pageID == thisPageID && props.transitionOn) {
      setChecked(true);
      props.setTransitionOn(false);
    }
  }, [props.transitionOn]);

  useEffect(() => {
    if (props.pageID != thisPageID && checked) {
      setChecked(false);
    }
  }, [props.pageID]);

  return {
    checked,
  };
};

export default useTransitionService;
