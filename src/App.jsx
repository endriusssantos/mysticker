import { useState } from "react";
import DetailsContainer from "./components/DetailsContainer/DetailsContainer";
import Header from "./components/Header/Header";
import StickerContainer from "./components/StickerContainer/StickerContainer";
import MainContainer from "./components/MainContainer/MainContainer";

function App() {
  const [stickerData, setStickerData] = useState({
    name: "",
    birthDate: "",
    height: "",
    weight: "",
    club: "",
    photo: "",
  });

  return (
    <>
      <Header />
      <MainContainer>
        <DetailsContainer
          stickerData={stickerData}
          setStickerData={setStickerData}
        />
        <StickerContainer stickerData={stickerData} />
      </MainContainer>
    </>
  );
}

export default App;
