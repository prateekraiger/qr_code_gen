"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  QrCode,
  Link,
  MessageSquare,
  Image as ImageIcon,
  Download,
  Copy,
  Check,
  Upload,
  X,
} from "lucide-react";
import AppFooter from "./AppFooter";
import TabNav, { Tab } from "./TabNav";
import UrlInputForm from "./UrlInputForm";
import TextInputForm from "./TextInputForm";
import ImageInputForm from "./ImageInputForm";
import QRCodeDisplay from "./QRCodeDisplay";
import Navbar from "./Navbar";

// Add types for translations
interface Translation {
  [key: string]: string;
}
interface Translations {
  [locale: string]: Translation;
}

const TRANSLATIONS: Translations = {
  "en-US": {
    appTitle: "QR Code Generator",
    appDescription: "Generate QR codes for URLs, text, and images",
    urlTab: "URL",
    textTab: "Text",
    imageTab: "Image",
    enterUrl: "Enter URL",
    enterText: "Enter Text",
    uploadImage: "Upload Image",
    websiteUrl: "Website URL",
    urlPlaceholder: "example.com or https://example.com",
    urlHelp:
      "Enter a website URL. If you don't include http://, we'll add https:// automatically.",
    textContent: "Text Content",
    textPlaceholder: "Enter any text to generate QR code...",
    imageContent: "Image Content",
    uploadImageFile: "Upload Image File",
    dragDropImage: "Drag & drop an image here, or click to select",
    supportedFormats: "Supported formats: JPG, PNG, GIF, WebP (Max 5MB)",
    imageSelected: "Image selected:",
    removeImage: "Remove Image",
    generatedQrCode: "Generated QR Code",
    scanQrCode: "Scan this QR code with your device",
    fillFormPrompt: "Fill in the form to generate your QR code",
    clearAllFields: "Clear All Fields",
    download: "Download",
    copyData: "Copy Data",
    copied: "Copied!",
    qrCodeData: "QR Code Data:",
    footerText: "Generate QR codes instantly • No data stored • Free to use",
    qrCodeAlt: "Generated QR Code",
  },
  "es-ES": {
    appTitle: "Generador de Códigos QR",
    appDescription: "Genera códigos QR para URLs, texto e imágenes",
    urlTab: "URL",
    textTab: "Texto",
    imageTab: "Imagen",
    enterUrl: "Ingresa URL",
    enterText: "Ingresa Texto",
    uploadImage: "Subir Imagen",
    websiteUrl: "URL del Sitio Web",
    urlPlaceholder: "ejemplo.com o https://ejemplo.com",
    urlHelp:
      "Ingresa una URL de sitio web. Si no incluyes http://, agregaremos https:// automáticamente.",
    textContent: "Contenido de Texto",
    textPlaceholder: "Ingresa cualquier texto para generar código QR...",
    imageContent: "Contenido de Imagen",
    uploadImageFile: "Subir Archivo de Imagen",
    dragDropImage:
      "Arrastra y suelta una imagen aquí, o haz clic para seleccionar",
    supportedFormats: "Formatos compatibles: JPG, PNG, GIF, WebP (Máx 5MB)",
    imageSelected: "Imagen seleccionada:",
    removeImage: "Quitar Imagen",
    generatedQrCode: "Código QR Generado",
    scanQrCode: "Escanea este código QR con tu dispositivo",
    fillFormPrompt: "Completa el formulario para generar tu código QR",
    clearAllFields: "Limpiar Todos los Campos",
    download: "Descargar",
    copyData: "Copiar Datos",
    copied: "¡Copiado!",
    qrCodeData: "Datos del Código QR:",
    footerText:
      "Genera códigos QR al instante • No se almacenan datos • Gratis",
    qrCodeAlt: "Código QR Generado",
  },
};

const appLocale = "{{APP_LOCALE}}";
const getBrowserLocale = () => {
  if (typeof window === "undefined") return "en-US";
  return navigator.languages?.[0] || navigator.language || "en-US";
};
const findMatchingLocale = (locale: string) => {
  if (TRANSLATIONS[locale]) return locale;
  const lang = locale.split("-")[0];
  const match = Object.keys(TRANSLATIONS).find((key) =>
    key.startsWith(lang + "-")
  );
  return match || "en-US";
};
const getLocale = () => {
  const browserLocale = getBrowserLocale();
  return appLocale !== "{{APP_LOCALE}}"
    ? findMatchingLocale(appLocale)
    : findMatchingLocale(browserLocale);
};
const t = (key: string): string =>
  TRANSLATIONS[getLocale()]?.[key] || TRANSLATIONS["en-US"][key] || key;

const QRCodeGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"url" | "text" | "image">("url");
  const [qrData, setQrData] = useState("");
  const [copied, setCopied] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);

  // Form states for different types
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // QR Code generation using QRious library via CDN
  const generateQRCode = async (text: string) => {
    if (typeof window === "undefined") return;
    if (!text.trim()) {
      if (qrContainerRef.current) {
        qrContainerRef.current.innerHTML = "";
      }
      return;
    }

    try {
      // Load QRious library dynamically
      if (!(window as any).QRious) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js";
        script.onload = () => {
          createQR(text);
        };
        document.head.appendChild(script);
      } else {
        createQR(text);
      }
    } catch (error) {
      console.error("Error loading QR library:", error);
      // Fallback to Google Charts API
      generateFallbackQR(text);
    }
  };

  const createQR = (text: string) => {
    if (!qrContainerRef.current) return;
    try {
      qrContainerRef.current.innerHTML = "";
      const canvas = document.createElement("canvas");
      qrContainerRef.current.appendChild(canvas);
      const QRious = (window as any).QRious;
      new QRious({
        element: canvas,
        value: text,
        size: 300,
        background: "white",
        foreground: "black",
        level: "M",
      });
      canvas.className = "w-full h-auto rounded-xl shadow-lg bg-white";
      canvas.style.maxWidth = "300px";
      canvas.style.height = "auto";
    } catch (error) {
      console.error("Error creating QR code:", error);
      generateFallbackQR(text);
    }
  };

  const generateFallbackQR = (text: string) => {
    if (!qrContainerRef.current) return;
    qrContainerRef.current.innerHTML = "";
    const img = document.createElement("img");
    const encodedData = encodeURIComponent(text);
    img.src = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodedData}&choe=UTF-8`;
    img.alt = t("qrCodeAlt");
    img.className = "w-full h-auto rounded-xl shadow-lg bg-white p-4";
    img.style.maxWidth = "300px";
    img.style.height = "auto";
    img.onerror = () => {
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedData}&format=png&margin=10`;
    };
    qrContainerRef.current.appendChild(img);
  };

  const formatUrl = (url: string) => {
    if (!url.trim()) return "";
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "https://" + url;
    }
    return url;
  };

  const handleImageUpload = (file: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }
    setImageFile(file);
    // Switch to image tab if not already
    setActiveTab("image");
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) setImageDataUrl(e.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImageDataUrl("");
  };

  useEffect(() => {
    let data = "";
    switch (activeTab) {
      case "url":
        data = formatUrl(urlInput);
        break;
      case "text":
        data = textInput;
        break;
      case "image":
        data = imageDataUrl;
        break;
      default:
        data = "";
    }
    setQrData(data);
    generateQRCode(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, urlInput, textInput, imageDataUrl]);

  const downloadQRCode = () => {
    if (!qrData) return;
    const canvas = qrContainerRef.current?.querySelector("canvas");
    const img = qrContainerRef.current?.querySelector("img");
    if (canvas) {
      const link = document.createElement("a");
      link.download = `qr-code-${activeTab}.png`;
      link.href = (canvas as HTMLCanvasElement).toDataURL();
      link.click();
    } else if (img) {
      const link = document.createElement("a");
      link.download = `qr-code-${activeTab}.png`;
      link.href = (img as HTMLImageElement).src;
      link.click();
    }
  };

  const copyToClipboard = async () => {
    if (qrData) {
      try {
        await navigator.clipboard.writeText(qrData);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const resetForm = () => {
    setUrlInput("");
    setTextInput("");
    setImageFile(null);
    setImageDataUrl("");
    setQrData("");
    if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = "";
    }
  };

  const tabs: Tab[] = [
    { id: "url", label: t("urlTab"), icon: Link },
    { id: "text", label: t("textTab"), icon: MessageSquare },
    { id: "image", label: t("imageTab"), icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-6xl mx-auto rounded-3xl shadow-xl bg-neutral-900 border border-neutral-800 p-10">
          <TabNav
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={(tab) => setActiveTab(tab as typeof activeTab)}
          />
          <div className="p-4 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Input Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {activeTab === "url" && t("enterUrl")}
                  {activeTab === "text" && t("enterText")}
                  {activeTab === "image" && t("uploadImage")}
                </h2>
                {activeTab === "url" && (
                  <UrlInputForm
                    urlInput={urlInput}
                    setUrlInput={setUrlInput}
                    t={t}
                  />
                )}
                {activeTab === "text" && (
                  <TextInputForm
                    textInput={textInput}
                    setTextInput={setTextInput}
                    t={t}
                  />
                )}
                {activeTab === "image" && (
                  <ImageInputForm
                    imageFile={imageFile}
                    imageDataUrl={imageDataUrl}
                    dragOver={dragOver}
                    handleImageUpload={handleImageUpload}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDrop={handleDrop}
                    removeImage={removeImage}
                    t={t}
                  />
                )}
                <button
                  onClick={resetForm}
                  className="w-full px-6 py-3 bg-neutral-800 text-slate-200 rounded-xl hover:bg-neutral-700 transition-all duration-200 font-medium"
                >
                  {t("clearAllFields")}
                </button>
              </div>
              {/* QR Code Display Section */}
              <div>
                <QRCodeDisplay
                  qrData={qrData}
                  qrContainerRef={
                    qrContainerRef as React.RefObject<HTMLDivElement>
                  }
                  downloadQRCode={downloadQRCode}
                  copyToClipboard={copyToClipboard}
                  copied={copied}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <AppFooter t={t} />
    </div>
  );
};

export default QRCodeGenerator;
