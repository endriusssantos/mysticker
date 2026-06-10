const StickerContainer = ({ stickerData }) => {
  const brazilSticker = "src/assets/brazil_sticker.png";
  return (
    <section className="flex flex-col items-center">
      <div className="relative w-full max-w-md py-10 text-center font-[Oswald] tracking-wide text-white">
        <img
          src={brazilSticker}
          alt="Brazil Sticker"
          className="relative z-0 h-auto w-full object-cover"
        />
        <span className="absolute right-20 bottom-25 left-0 z-10 text-2xl font-bold uppercase md:text-[29px]">
          {stickerData.name || "NEYMAR JR"}
        </span>
        <span className="absolute right-20 bottom-20 left-0 z-10">
          {stickerData.birthDate || "05-02-1992"} |{" "}
          {stickerData.height || "1,75"}m | {stickerData.weight || "68"}kg
        </span>
        <span className="text-md absolute right-30 bottom-12 left-0 z-10 uppercase">
          {stickerData.club || "SANTOS FC (BRA)"}
        </span>
      </div>
      <span className="text-secondary pb-5 text-center font-[Hanken_Grotesk]">
        Dica: Use fotos com fundo neutro para um resultado profissional!
      </span>
    </section>
  );
};

export default StickerContainer;
