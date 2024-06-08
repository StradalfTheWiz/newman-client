import { SiteConsts } from "./SiteConsts";

const ClientErrorPage = () => {
  return (
    <div style={{ padding: "10px", fontFamily: SiteConsts.FONT_KEY_GLOBAL_1 }}>
      <h1>Ooops, something went wrong! </h1>
      <h3>Please try again later. </h3>
    </div>
  );
};

export default ClientErrorPage;
