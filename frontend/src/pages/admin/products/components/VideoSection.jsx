import { Plus, Trash2 } from "lucide-react";

import {
  Card,
  Input,
  Button,
} from "../../../../components/ui";

export default function VideoSection({
  formData,
  setFormData,
}) {
  const addVideo = () => {
    setFormData((prev) => ({
      ...prev,
      videos: [
        ...prev.videos,
        {
          title: "",
          url: "",
          thumbnail: "",
          sortOrder: prev.videos.length,
        },
      ],
    }));
  };

  const updateVideo = (index, field, value) => {
    setFormData((prev) => {
      const videos = [...prev.videos];

      videos[index] = {
        ...videos[index],
        [field]: value,
      };

      return {
        ...prev,
        videos,
      };
    });
  };

  const removeVideo = (index) => {
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  return (
    <Card>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#12312B]">
            Product Videos
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Add YouTube, Vimeo or hosted product videos.
          </p>
        </div>

        <Button onClick={addVideo}>
          <Plus size={18} />
          Add Video
        </Button>
      </div>

      {!formData.videos.length && (
        <div className="rounded-2xl border border-dashed border-[#E8E2D9] py-16 text-center text-gray-500">
          No videos added yet.
        </div>
      )}

      <div className="space-y-6">
        {formData.videos.map((video, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#E8E2D9] p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#12312B]">
                Video {index + 1}
              </h3>

              <Button
                variant="danger"
                onClick={() => removeVideo(index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Video Title"
                value={video.title}
                onChange={(e) =>
                  updateVideo(index, "title", e.target.value)
                }
                placeholder="Product Overview"
              />

              <Input
                label="Video URL"
                value={video.url}
                onChange={(e) =>
                  updateVideo(index, "url", e.target.value)
                }
                placeholder="https://youtube.com/..."
              />

              <Input
                label="Thumbnail URL"
                value={video.thumbnail}
                onChange={(e) =>
                  updateVideo(index, "thumbnail", e.target.value)
                }
                placeholder="https://..."
              />

              <Input
                type="number"
                label="Display Order"
                value={video.sortOrder}
                onChange={(e) =>
                  updateVideo(index, "sortOrder", Number(e.target.value))
                }
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}