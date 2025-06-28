export default function UrlInputForm({
  urlInput,
  setUrlInput,
  t,
}: {
  urlInput: string;
  setUrlInput: (v: string) => void;
  t: (key: string) => string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t("websiteUrl")}
      </label>
      <input
        type="url"
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
        placeholder={t("urlPlaceholder")}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
      />
      <p className="text-xs text-gray-500 mt-1">{t("urlHelp")}</p>
    </div>
  );
}
