const StickerContainer = ({
  stickerData,
  stickerRef,
  defaultSticker,
  defaultPhoto,
}) => {
  return (
    <section className="flex flex-col items-center">
      <div
        ref={stickerRef}
        className="relative w-full max-w-md overflow-hidden bg-green-700 text-center font-[Oswald] tracking-wide text-white"
        style={{ backgroundColor: "#15803d" }}
      >
        {defaultSticker && (
          <img
            src={defaultSticker}
            alt="Brazil Sticker"
            className="relative z-0 h-auto w-full object-cover"
          />
        )}

        <div
          className={
            stickerData.photo
              ? "absolute top-[7%] left-1/2 z-10 h-[70%] w-[70%] -translate-x-1/2 overflow-hidden"
              : "absolute top-[8%] left-1/2 z-10 h-[80%] w-[80%] -translate-x-1/2 overflow-hidden"
          }
        >
          <img
            src={stickerData.photo || defaultPhoto}
            alt="User Photo"
            className="absolute bottom-0 left-1/2 h-full max-w-none -translate-x-1/2"
          />
        </div>

        <span className="absolute right-[15%] bottom-[10%] left-[0%] z-10 text-[29px] font-bold uppercase">
          {stickerData.name || "NEYMAR JR"}
        </span>

        <span className="absolute right-[20%] bottom-[7%] left-[0%] z-10">
          {stickerData.birthDate || "05-02-1992"} |{" "}
          {stickerData.height || "1,75"}m | {stickerData.weight || "68"}kg
        </span>

        <span className="text-md absolute right-[30%] bottom-[2%] left-[0%] z-10 uppercase">
          {stickerData.club || "SANTOS FC (BRA)"}
        </span>
      </div>

      <span className="text-secondary py-5 text-center font-[Hanken_Grotesk]">
        Dica: Use fotos com fundo neutro para um resultado profissional!
      </span>
    </section>
  );
};

export default StickerContainer;
