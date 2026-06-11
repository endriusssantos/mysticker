import { useRef, useState, useEffect } from "react";
import DetailsContainer from "./components/DetailsContainer/DetailsContainer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StickerContainer from "./components/StickerContainer/StickerContainer";
import MainContainer from "./components/MainContainer/MainContainer";
import brazilStickerImg from "./assets/images/brazil_sticker.png";
import neymarPhotoImg from "./assets/images/neymar_photo.png";
import { getBase64FromUrl } from "./components/ImageUtils/ImageUtils";

function App() {
  const stickerRef = useRef(null);
  const [stickerData, setStickerData] = useState({
    name: "",
    birthDate: "",
    height: "",
    weight: "",
    club: "",
    photo: "",
  });

  const [base64Sticker, setBase64Sticker] = useState("");
  const [base64Neymar, setBase64Neymar] = useState("");

  useEffect(() => {
    const loadImages = async () => {
      try {
        const stickerB64 = await getBase64FromUrl(brazilStickerImg);
        const neymarB64 = await getBase64FromUrl(neymarPhotoImg);
        setBase64Sticker(stickerB64);
        setBase64Neymar(neymarB64);
      } catch (err) {
        console.error("Erro ao pré-carregar imagens:", err);
      }
    };
    loadImages();
  }, []);

  return (
    <>
      <Header />
      <MainContainer>
        <DetailsContainer
          stickerData={stickerData}
          setStickerData={setStickerData}
          stickerRef={stickerRef}
        />
        <StickerContainer
          stickerData={stickerData}
          stickerRef={stickerRef}
          defaultSticker={base64Sticker}
          defaultPhoto={base64Neymar}
        />
      </MainContainer>
      <Footer />
    </>
  );
}

export default App;
