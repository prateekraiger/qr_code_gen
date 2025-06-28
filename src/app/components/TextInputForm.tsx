export default function TextInputForm({
  textInput,
  setTextInput,
  t,
}: {
  textInput: string;
  setTextInput: (v: string) => void;
  t: (key: string) => string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t("textContent")}
      </label>
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder={t("textPlaceholder")}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
      />
    </div>
  );
}
