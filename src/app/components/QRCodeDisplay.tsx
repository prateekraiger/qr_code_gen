import { QrCode, Download, Copy, Check } from "lucide-react";
import React from "react";

export default function QRCodeDisplay({
  qrData,
  qrContainerRef,
  downloadQRCode,
  copyToClipboard,
  copied,
  t,
}: {
  qrData: string;
  qrContainerRef: React.RefObject<HTMLDivElement>;
  downloadQRCode: () => void;
  copyToClipboard: () => void;
  copied: boolean;
  t: (key: string) => string;
}) {
  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <h2 className="text-2xl font-semibold text-slate-200">
        {t("generatedQrCode")}
      </h2>
      <div className="bg-neutral-900 rounded-2xl p-4 sm:p-8 w-full max-w-xs mx-auto shadow-lg border border-neutral-800 overflow-x-auto">
        {qrData ? (
          <div className="text-center">
            <div ref={qrContainerRef} className="flex justify-center w-full">
              {/* QR code will be dynamically inserted here */}
            </div>
            <p className="text-sm text-slate-400 mt-4">{t("scanQrCode")}</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <QrCode className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500">{t("fillFormPrompt")}</p>
          </div>
        )}
      </div>
      {qrData && (
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mx-auto">
          <button
            onClick={downloadQRCode}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg"
          >
            <Download className="w-4 h-4" />
            {t("download")}
          </button>
          <button
            onClick={copyToClipboard}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 rounded-xl hover:bg-slate-700 transition-all duration-200 font-medium"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                {t("copied")}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {t("copyData")}
              </>
            )}
          </button>
        </div>
      )}
      {qrData && (
        <div className="w-full max-w-xs mx-auto">
          <h3 className="text-sm font-medium text-slate-300 mb-2">
            {t("qrCodeData")}
          </h3>
          <div className="bg-neutral-800 rounded-lg p-3 text-xs text-slate-400 max-h-32 overflow-y-auto">
            <pre className="whitespace-pre-wrap break-words">{qrData}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
