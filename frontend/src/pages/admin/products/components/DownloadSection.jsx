import { Plus, Trash2 } from "lucide-react";

import {
  Card,
  Input,
  Button,
} from "../../../../components/ui";

export default function DownloadSection({
  formData,
  setFormData,
}) {
  const addDownload = () => {
    setFormData((prev) => ({
      ...prev,
      downloads: [
        ...prev.downloads,
        {
          title: "",
          file: "",
          sortOrder: prev.downloads.length,
        },
      ],
    }));
  };

  const updateDownload = (index, field, value) => {
    setFormData((prev) => {
      const downloads = [...prev.downloads];

      downloads[index] = {
        ...downloads[index],
        [field]: value,
      };

      return {
        ...prev,
        downloads,
      };
    });
  };

  const removeDownload = (index) => {
    setFormData((prev) => ({
      ...prev,
      downloads: prev.downloads.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <Card>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#12312B]">
            Downloads
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Upload brochures, catalogues and technical sheets.
          </p>
        </div>

        <Button onClick={addDownload}>
          <Plus size={18} />
          Add Download
        </Button>
      </div>

      {!formData.downloads.length && (
        <div className="rounded-2xl border border-dashed border-[#E8E2D9] py-16 text-center text-gray-500">
          No downloads added yet.
        </div>
      )}

      <div className="space-y-6">
        {formData.downloads.map((download, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#E8E2D9] p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#12312B]">
                Download {index + 1}
              </h3>

              <Button
                variant="danger"
                onClick={() => removeDownload(index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Title"
                value={download.title}
                onChange={(e) =>
                  updateDownload(
                    index,
                    "title",
                    e.target.value
                  )
                }
                placeholder="Product Catalogue"
              />

              <Input
                type="number"
                label="Display Order"
                value={download.sortOrder}
                onChange={(e) =>
                  updateDownload(
                    index,
                    "sortOrder",
                    Number(e.target.value)
                  )
                }
              />
            </div>

            <div className="mt-6">
              <Input
                label="File URL"
                value={download.file}
                onChange={(e) =>
                  updateDownload(
                    index,
                    "file",
                    e.target.value
                  )
                }
                placeholder="https://example.com/catalogue.pdf"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}