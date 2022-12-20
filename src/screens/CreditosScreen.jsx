import React, { useMemo } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useDeviceDetect } from "../hooks";

import "../css/CreditsScreen.css";

const Container = styled("div")(({ theme }) => ({
  fontFamily: "ui-monospace, monospace",
  padding: "4rem",
  color: "white",
  lineHeight: "21px",
  "--webkit-user-elect": "none",
  userSelect: "none",

}));

const CreditosScreen = () => {
  const theme = useTheme();
  const { isMobile } = useDeviceDetect();

  const AppropiateContainer = useMemo(
    () =>
      ({ children }) => {
        return !isMobile ? (
          <Container>{children}</Container>
        ) : (
          <ScrollContainer
            className="scroll-container"
            style={{
              fontFamily: "ui-monospace, monospace",
              padding: "4rem",
              width: "calc(100vw - 6rem)",
              height: "calc(100vh - 2rem)",
              color: theme.palette.text.primary,
              lineHeight: "21px",
              "--webkit-user-select": "none",
              overflow: "hidden",
              userSelect: "none",
            }}
          >
            {children}
          </ScrollContainer>
        );
      },
    [isMobile]
  );

  return <div id="creditosScreen">
    <AppropiateContainer>
        <Container>
          <h1 style={{ color: "black" }}>Creditos</h1>
        </Container>
        <Container>{/* <embed src={}/> */}</Container>
      </AppropiateContainer>
  </div>;
};

export default CreditosScreen;
