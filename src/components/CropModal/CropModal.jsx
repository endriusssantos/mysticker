import Cropper from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";

const CropModal = ({
  isOpen,
  imageSrc,
  crop,
  zoom,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onCancel,
  onApply,
}) => {
  if (!isOpen || !imageSrc) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div className="w-full max-w-3xl rounded-[28px] bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 uppercase">
              Ajustar foto
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Mova a imagem e ajuste o zoom para encaixar na figurinha.
            </p>
          </div>
        </div>

        <div className="relative h-105 overflow-hidden rounded-2xl bg-slate-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
            objectFit="contain"
            showGrid
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-semibold text-slate-700 uppercase">
            Zoom
          </label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(event) => onZoomChange(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-600"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 uppercase transition hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onApply}
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white uppercase shadow-[0px_10px_30px_rgba(34,197,94,0.25)] transition hover:bg-emerald-700"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
