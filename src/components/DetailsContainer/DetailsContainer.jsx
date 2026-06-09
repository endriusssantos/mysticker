import {
  BsCamera,
  BsCloudDownload,
  BsPencilSquare,
  BsShare,
} from "react-icons/bs";

const DetailsContainer = ({ stickerData, setStickerData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setStickerData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              placeholder="68"
              className="bg-surface-container text-on-surface border-b-outline-variant focus:border-b-primary-container mt-2 w-full border-b-2 px-4 py-3 text-base transition-all duration-300 ease-out outline-none focus:ring-0"
              value={stickerData.weight}
              onChange={handleChange}
              name="weight"
            />
          </div>
        </div>

        <div>
          <label className="text-secondary text-sm font-medium uppercase">
            Foto do jogador
          </label>
          <label className="group border-outline-variant bg-surface-container hover:bg-on-primary-container/10 hover:border-primary/80 mt-3 flex min-h-45 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed p-6 text-center transition">
            <BsCamera className="text-secondary group-hover:text-primary text-2xl transition-colors duration-300" />
            <span className="text-secondary group-hover:text-primary text-sm font-semibold transition-colors duration-300">
              Escolher Imagem
            </span>
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button className="bg-primary-container text-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold uppercase shadow-[0px_10px_30px_rgba(34,197,94,0.25)] transition duration-300 hover:scale-105 sm:w-auto">
          <BsCloudDownload className="text-base" />
          Baixar figurinha
        </button>
        <button className="border-primary text-primary hover:bg-surface-container flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-6 py-4 text-sm font-semibold uppercase transition duration-300 sm:w-auto">
          <BsShare className="text-base" />
          Compartilhar
        </button>
      </div>
    </section>
  );
};

export default DetailsContainer;
