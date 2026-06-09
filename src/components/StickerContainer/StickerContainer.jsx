const StickerContainer = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="relative w-full max-w-md py-10 text-center font-[Oswald] tracking-wide text-white">
        <img
          src="/src/assets/brazil_sticker.png"
          alt="Brazil Sticker"
          className="relative z-0 h-auto w-full object-cover"
        />
        <span className="absolute right-20 bottom-25 left-0 z-10 text-[29px] font-bold">
          NEYMAR JR
        </span>
        <span className="absolute right-20 bottom-20 left-0 z-10">
          05-02-1992 | 1,75m | 68kg
        </span>
        <span className="text-md absolute right-30 bottom-12 left-0 z-10">
          SANTOS FC (BRA)
        </span>
      </div>
      <span className="text-secondary pb-5 font-[Hanken_Grotesk]">
        Dica: Use fotos com fundo neutro para melhor resultado
      </span>
    </section>
  );
};

export default StickerContainer;
