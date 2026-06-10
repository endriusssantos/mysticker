import brazilSticker from "../../assets/brazil_sticker.png";
import neymarPhoto from "../../assets/neymar_photo.png";

const StickerContainer = ({ stickerData }) => {
  return (
    <section className="flex flex-col items-center">
      <div className="relative w-full max-w-md py-10 text-center font-[Oswald] tracking-wide text-white">
        <img
          src={brazilSticker}
          alt="Brazil Sticker"
          className="relative z-0 h-auto w-full object-cover"
        />
        <div className={stickerData.photo ? "absolute top-[7%] left-1/2 z-10 h-[70%] w-[70%] translate-x-[-65%] overflow-hidden" : "absolute top-[8%] left-1/2 z-10 h-[80%] w-[80%] translate-x-[-52%] overflow-hidden"}>
          <img
            src={stickerData.photo || neymarPhoto}
            alt="User Photo"
            className={"h-full w-full object-cover"}
          />
        </div>
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
