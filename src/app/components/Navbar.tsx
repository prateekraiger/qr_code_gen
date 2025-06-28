import { QrCode } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-30 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <QrCode className="w-7 h-7 text-purple-400" />
          <span className="text-lg font-bold text-white tracking-tight">
            QR Code Generator
          </span>
        </div>
        <a
          href="https://github.com/prateekraiger"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-white transition text-sm font-medium"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}
