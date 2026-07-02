import { useState } from "react";
import {
  BsCamera,
  BsCloudDownload,
  BsPencilSquare,
  BsShare,
} from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { toPng } from "html-to-image";
import oswaldFont from "../../assets/fonts/Oswald.ttf";
import CropModal from "../CropModal/CropModal";
import { cropImage } from "../ImageUtils/cropImage";

const DetailsContainer = ({
  stickerData,
  setStickerData,
  stickerOptions,
  selectedSticker,
  setSelectedSticker,
  stickerRef,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [processingError, setProcessingError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStickerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStickerSelection = (e) => {
    setSelectedSticker(e.target.value);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingImage(true);
    setProcessingError("");

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 45000);

    try {
      const formData = new FormData();
      formData.append("image_file", file);

      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorMessage = "Não foi possível remover o fundo da imagem.";

        try {
          const errorPayload = await response.json();
          errorMessage =
            errorPayload?.error || errorPayload?.details || errorMessage;
        } catch {
          errorMessage = `Falha na remoção do fundo (${response.status}).`;
        }

        throw new Error(errorMessage);
      }

      const imageBlob = await response.blob();
      const imageDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(imageBlob);
      });

      setSelectedImage(imageDataUrl);
      setStickerData((prev) => ({
        ...prev,
        photo: imageDataUrl,
      }));
      setCroppedAreaPixels(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setIsCropModalOpen(true);
    } catch (error) {
      console.error("Erro ao remover o fundo da imagem:", error);

      if (error instanceof Error && error.name === "AbortError") {
        setProcessingError("O processamento demorou demais. Tente novamente.");
      } else {
        setProcessingError(
          error instanceof Error
            ? error.message
            : "Erro inesperado ao processar a imagem.",
        );
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsProcessingImage(false);
      e.target.value = "";
    }
  };

  const handleCropComplete = (_, croppedAreaPixelsValue) => {
    setCroppedAreaPixels(croppedAreaPixelsValue);
  };

  const handleApplyCrop = async () => {
    if (!selectedImage) {
      setIsCropModalOpen(false);
      return;
    }

    try {
      const croppedPhoto = croppedAreaPixels
        ? await cropImage(selectedImage, croppedAreaPixels)
        : selectedImage;

      setStickerData((prev) => ({
        ...prev,
        photo: croppedPhoto,
      }));
    } catch (error) {
      console.error("Erro ao aplicar recorte:", error);
    } finally {
      setIsCropModalOpen(false);
      setSelectedImage("");
      setCroppedAreaPixels(null);
    }
  };

  const handleCancelCrop = () => {
    setIsCropModalOpen(false);
    setSelectedImage("");
    setCroppedAreaPixels(null);
  };

  const handleDownload = async () => {
    if (!stickerRef.current) return;

    try {
      const fontResponse = await fetch(oswaldFont);
      const fontBlob = await fontResponse.blob();

      const fontBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(fontBlob);
        reader.onloadend = () => resolve(reader.result);
      });

      const fontEmbedRules = `
      @font-face {
        font-family: 'Oswald';
        src: url('${fontBase64}') format('truetype');
        font-weight: bold;
        font-style: normal;
      }
    `;

      const width = stickerRef.current.offsetWidth;
      const height = stickerRef.current.offsetHeight;

      setTimeout(async () => {
        const dataUrl = await toPng(stickerRef.current, {
          width: width,
          height: height,
          pixelRatio: 3,
          cacheBust: true,
          fontEmbedCSS: fontEmbedRules,
          style: {
            transform: "scale(1)",
            transformOrigin: "top left",
            width: `${width}px`,
            height: `${height}px`,
            fontFamily: "'Oswald', sans-serif",
          },
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${stickerData.name || "figurinha"}.png`;
        link.click();
      }, 300);
    } catch (error) {
      console.error("Erro ao gerar o download com fontes:", error);
    }
  };

  const handleShare = async () => {
    if (!stickerRef.current) return;

    try {
      const fontResponse = await fetch(oswaldFont);
      const fontBlob = await fontResponse.blob();

      const fontBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(fontBlob);
        reader.onloadend = () => resolve(reader.result);
      });

      const fontEmbedRules = `
      @font-face {
        font-family: 'Oswald';
        src: url('${fontBase64}') format('truetype');
        font-weight: bold;
        font-style: normal;
      }
    `;

      const width = stickerRef.current.offsetWidth;
      const height = stickerRef.current.offsetHeight;

      setTimeout(async () => {
        const dataUrl = await toPng(stickerRef.current, {
          width: width,
          height: height,
          pixelRatio: 2,
          cacheBust: true,
          fontEmbedCSS: fontEmbedRules,
          style: {
            transform: "scale(1)",
            transformOrigin: "top left",
            width: `${width}px`,
            height: `${height}px`,
            fontFamily: "'Oswald', sans-serif",
          },
        });

        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File(
          [blob],
          `${stickerData.name || "figurinha"}.png`,
          { type: "image/png" },
        );

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Minha Figurinha do Álbum! ⚽",
            text: `Olha a figurinha do craque ${stickerData.name || "NEYMAR JR"} que eu criei! Ficou braba demais. 🔥\n\nQuer fazer a sua também com a sua foto e dados personalizados? É de graça! Clique no link abaixo e monte o seu sticker agora:`,
            url: window.location.origin,
          });
        } else {
          alert(
            "Seu navegador não aceita compartilhar imagens direto. Baixe a foto e envie para os amigos! 😉",
          );
        }
      }, 300);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Erro ao compartilhar:", error);
      }
    }
  };

  return (
    <section className="bg-background mx-4 my-8 max-w-3xl rounded-[28px] p-7 shadow-[0px_10px_30px_rgba(15,23,42,0.05)]">
      <div className="mb-8 flex items-center gap-4">
        <BsPencilSquare className="text-primary text-2xl" />
        <h2 className="text-2xl uppercase">Criar minha figurinha</h2>
      </div>

      <div className="grid gap-4">
        <div>
          <label
            htmlFor="name"
            className="text-secondary text-sm font-medium uppercase"
          >
            Nome do craque
          </label>
          <input
            id="name"
            type="text"
            maxLength="20"
            placeholder="NEYMAR JR"
            className="bg-surface-container text-on-surface border-b-outline-variant focus:border-b-primary-container mt-2 w-full border-b-2 px-4 py-3 text-base transition-all duration-300 ease-out outline-none focus:ring-0"
            value={stickerData.name}
            onChange={handleChange}
            name="name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="year"
              className="text-secondary text-sm font-medium uppercase"
            >
              Ano nasc.
            </label>
            <input
              id="year"
              type="text"
              maxLength="10"
              placeholder="05-02-1992"
              className="bg-surface-container text-on-surface border-b-outline-variant focus:border-b-primary-container mt-2 w-full border-b-2 px-4 py-3 text-base transition-all duration-300 ease-out outline-none focus:ring-0"
              value={stickerData.birthDate}
              onChange={handleChange}
              name="birthDate"
            />
          </div>
          <div>
            <label
              htmlFor="team"
              className="text-secondary text-sm font-medium uppercase"
            >
              Time
            </label>
            <input
              id="team"
              type="text"
              maxLength="20"
              placeholder="SANTOS FC (BRA)"
              className="bg-surface-container text-on-surface border-b-outline-variant focus:border-b-primary-container mt-2 w-full border-b-2 px-4 py-3 text-base transition-all duration-300 ease-out outline-none focus:ring-0"
              value={stickerData.club}
              onChange={handleChange}
              name="club"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="height"
              className="text-secondary text-sm font-medium uppercase"
            >
              Altura (cm)
            </label>
            <input
              id="height"
              type="text"
              maxLength="4"
              placeholder="1,75"
              className="bg-surface-container text-on-surface border-b-outline-variant focus:border-b-primary-container mt-2 w-full border-b-2 px-4 py-3 text-base transition-all duration-300 ease-out outline-none focus:ring-0"
              value={stickerData.height}
              onChange={handleChange}
              name="height"
            />
          </div>
          <div>
            <label
              htmlFor="weight"
              className="text-secondary text-sm font-medium uppercase"
            >
              Peso (kg)
            </label>
            <input
              id="weight"
              type="text"
              maxLength="3"
              placeholder="68"
              className="bg-surface-container text-on-surface border-b-outline-variant focus:border-b-primary-container mt-2 w-full border-b-2 px-4 py-3 text-base transition-all duration-300 ease-out outline-none focus:ring-0"
              value={stickerData.weight}
              onChange={handleChange}
              name="weight"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="stickerSelection"
            className="text-secondary text-sm font-medium uppercase"
          >
            Seleção do sticker
          </label>
          <select
            id="stickerSelection"
            value={selectedSticker}
            onChange={handleStickerSelection}
            className="bg-surface-container text-on-surface border-b-outline-variant focus:border-b-primary-container mt-2 w-full border-b-2 px-2 py-3 text-base transition-all duration-300 ease-out outline-none focus:ring-0"
          >
            {stickerOptions.map((option) => (
              <option key={option.value} value={option.src}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-secondary text-sm font-medium uppercase">
            {" "}
            Foto do jogador{" "}
          </label>
          <label className="group border-outline-variant bg-surface-container hover:bg-on-primary-container/10 hover:border-primary/80 mt-3 flex min-h-45 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed p-6 text-center transition">
            <BsCamera className="text-secondary group-hover:text-primary text-2xl transition-colors duration-300" />
            <span className="text-secondary group-hover:text-primary text-sm font-semibold transition-colors duration-300">
              {" "}
              Escolher Imagem{" "}
            </span>
            {isProcessingImage ? (
              <div className="text-primary mt-2 flex items-center gap-2 text-sm font-semibold">
                <FaSpinner className="animate-spin" />
                Removendo fundo da imagem...
              </div>
            ) : null}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {processingError ? (
            <p className="mt-3 text-sm font-medium text-red-600">
              {processingError}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 lg:flex-row">
        <button
          onClick={handleDownload}
          className="bg-primary-container text-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold uppercase shadow-[0px_10px_30px_rgba(34,197,94,0.25)] transition duration-300 hover:scale-105 lg:flex-1"
        >
          <BsCloudDownload className="text-base" /> Baixar figurinha
        </button>
        <button
          onClick={handleShare}
          className="border-primary text-primary hover:bg-surface-container flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-6 py-4 text-sm font-semibold uppercase transition duration-300 lg:flex-1"
        >
          <BsShare className="text-base" /> Compartilhar
        </button>
      </div>

      <CropModal
        isOpen={isCropModalOpen}
        imageSrc={selectedImage}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
        onCancel={handleCancelCrop}
        onApply={handleApplyCrop}
      />
    </section>
  );
};

export default DetailsContainer;
