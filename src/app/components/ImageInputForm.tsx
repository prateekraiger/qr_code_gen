import { Upload, X } from "lucide-react";

export default function ImageInputForm({
  imageFile,
  imageDataUrl,
  dragOver,
  handleImageUpload,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  removeImage,
  t,
}: {
  imageFile: File | null;
  imageDataUrl: string;
  dragOver: boolean;
  handleImageUpload: (file: File) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  removeImage: () => void;
  t: (key: string) => string;
}) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t("imageContent")}
      </label>
      {!imageFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
            dragOver
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => {
            const input = document.getElementById(
              "imageInput"
            ) as HTMLInputElement | null;
            if (input) input.click();
          }}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">{t("dragDropImage")}</p>
          <p className="text-xs text-gray-500">{t("supportedFormats")}</p>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleImageUpload(e.target.files[0])
            }
            className="hidden"
          />
        </div>
      ) : (
        <div className="border rounded-xl p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-700">
              {t("imageSelected")}
            </p>
            <button
              onClick={removeImage}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            {imageDataUrl && (
              <img
                src={imageDataUrl}
                alt="Selected"
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {imageFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(imageFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
