import { useState } from "react";
import DetailsContainer from "./components/DetailsContainer/DetailsContainer";
import Header from "./components/Header/Header";
import StickerContainer from "./components/StickerContainer/StickerContainer";

function App() {
  const [stickerData, setStickerData] = useState({
    name: "",
    birthDate: "",
    height: "",
    weight: "",
    club: "",
  });

  return (
    <>
      <Header />
      <DetailsContainer
        stickerData={stickerData}
        setStickerData={setStickerData}
      />
      <StickerContainer stickerData={stickerData} />
    </>
  );
}

export default App;
