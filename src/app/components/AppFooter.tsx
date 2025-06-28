export default function AppFooter({ t }: { t: (key: string) => string }) {
  return (
    <footer className="w-full py-6 bg-slate-900 text-slate-400 text-center text-xs mt-12 border-t border-slate-800">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>
          &copy; {new Date().getFullYear()} QR Code Generator. All rights
          reserved.
        </span>
        <span>
          Built by{" "}
          <a
            href="https://github.com/prateekraiger"
            className="underline hover:text-white transition"
          >
            Prateek Raiger
          </a>
        </span>
      </div>
    </footer>
  );
}
