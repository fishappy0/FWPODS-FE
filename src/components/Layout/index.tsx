import React from "react";
import Content from "../Content";
import SideNav from "../SideNav";
import Player from "../Player";

import { Container, MainContent } from "./styles";

const Layout: React.FC = () => {
  document.title = "Spotify Clone";

  return (
    <Container>
      <MainContent>
        <SideNav />
        <Content />
      </MainContent>
      <Player />
    </Container>
  );
};

export default Layout;
