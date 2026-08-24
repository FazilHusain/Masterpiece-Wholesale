import { Upload, FileText } from "lucide-react";
import { useState } from "react";

export default function QuotationCard({
  application,
  onUpload,
  loading,
}) {
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("quotation", file);

    onUpload(formData);
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-2">

        <FileText size={20} />

        <h2 className="text-lg font-semibold">
          Quotation
        </h2>

      </div>

      {application?.quotation && (
        <a
          href={application.quotation}
          target="_blank"
          rel="noreferrer"
          className="mb-5 block text-blue-600 underline"
        >
          View Uploaded Quotation
        </a>
      )}

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        className="mb-4 block w-full"
      />

      <button
        disabled={!file || loading}
        onClick={handleSubmit}
        className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2 text-white"
      >
        <Upload size={18} />

        Upload Quotation
      </button>

    </div>
  );
}