import { useRef, useState, useEffect } from "react";
import DetailsContainer from "./components/DetailsContainer/DetailsContainer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StickerContainer from "./components/StickerContainer/StickerContainer";
import MainContainer from "./components/MainContainer/MainContainer";
import alemanhaStickerImg from "./assets/images/alemanha_sticker.png";
import argentinaStickerImg from "./assets/images/argentina_sticker.png";
import brazilStickerImg from "./assets/images/brazil_sticker.png";
import espanhaStickerImg from "./assets/images/espanha_sticker.png";
import francaStickerImg from "./assets/images/franca_sticker.png";
import holandaStickerImg from "./assets/images/holanda_sticker.png";
import inglaterraStickerImg from "./assets/images/inglaterra_sticker.png";
import japaoStickerImg from "./assets/images/japao_sticker.png";
import portugalStickerImg from "./assets/images/portugal_sticker.png";
import uruguaiStickerImg from "./assets/images/uruguai_sticker.png";
import neymarPhotoImg from "./assets/images/neymar_photo.png";
import { getBase64FromUrl } from "./components/ImageUtils/ImageUtils";

const stickerOptions = [
  { label: "Brasil", value: "brazil", src: brazilStickerImg },
  { label: "Argentina", value: "argentina", src: argentinaStickerImg },
  { label: "Alemanha", value: "alemanha", src: alemanhaStickerImg },
  { label: "Espanha", value: "espanha", src: espanhaStickerImg },
  { label: "França", value: "franca", src: francaStickerImg },
  { label: "Holanda", value: "holanda", src: holandaStickerImg },
  { label: "Inglaterra", value: "inglaterra", src: inglaterraStickerImg },
  { label: "Japão", value: "japao", src: japaoStickerImg },
  { label: "Portugal", value: "portugal", src: portugalStickerImg },
  { label: "Uruguai", value: "uruguai", src: uruguaiStickerImg },
];

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

  const [selectedSticker, setSelectedSticker] = useState(stickerOptions[0].src);
  const [base64Neymar, setBase64Neymar] = useState("");

  useEffect(() => {
    const loadImages = async () => {
      try {
        const neymarB64 = await getBase64FromUrl(neymarPhotoImg);
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
          stickerOptions={stickerOptions}
          selectedSticker={selectedSticker}
          setSelectedSticker={setSelectedSticker}
          stickerRef={stickerRef}
        />
        <StickerContainer
          stickerData={stickerData}
          stickerRef={stickerRef}
          defaultSticker={selectedSticker}
          defaultPhoto={base64Neymar}
        />
      </MainContainer>
      <Footer />
    </>
  );
}

export default App;
