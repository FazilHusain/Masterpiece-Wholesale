import { Plus, Trash2, Upload, Video } from "lucide-react";

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
          file: null,
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

  const handleVideoFile = (index, file) => {
    if (!file) return;

    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    if (!allowedTypes.includes(file.type)) {
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      return;
    }

    updateVideo(index, "file", file);

    // If title is empty, use file name
    setFormData((prev) => {
      const videos = [...prev.videos];

      if (!videos[index].title) {
        videos[index] = {
          ...videos[index],
          title: file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]/g, " "),
        };
      }

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
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#12312B]">
            Product Videos
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Upload a product video or add YouTube, Vimeo or hosted
            video URLs.
          </p>
        </div>

        <Button onClick={addVideo}>
          <Plus size={18} />
          Add Video
        </Button>
      </div>

      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {!formData.videos.length && (
        <div className="rounded-2xl border border-dashed border-[#E8E2D9] py-16 text-center text-gray-500">
          No videos added yet.
        </div>
      )}

      {/* ==========================================
          VIDEOS
      ========================================== */}

      <div className="space-y-6">
        {formData.videos.map((video, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#E8E2D9] p-6"
          >
            {/* ======================================
                VIDEO HEADER
            ====================================== */}

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

            {/* ======================================
                VIDEO UPLOAD
            ====================================== */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-[#12312B]">
                Upload Product Video
              </label>

              <div
                className="
                  rounded-2xl
                  border
                  border-dashed
                  border-[#D8D0C4]
                  bg-[#FCFAF7]
                  p-6
                "
              >
                <label
                  htmlFor={`product-video-${index}`}
                  className="
                    flex
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#E8E2D9]
                    bg-white
                    px-5
                    py-8
                    text-center
                    transition
                    hover:border-[#B68C2F]
                  "
                >
                  <div
                    className="
                      mb-3
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-[#12312B]
                      text-white
                    "
                  >
                    <Video size={21} />
                  </div>

                  <span className="text-sm font-medium text-[#12312B]">
                    {video.file
                      ? video.file.name
                      : "Choose Product Video"}
                  </span>

                  <span className="mt-1 text-xs text-gray-500">
                    MP4, WEBM or MOV · Maximum 50 MB
                  </span>

                  <span
                    className="
                      mt-4
                      inline-flex
                      items-center
                      gap-2
                      border
                      border-[#12312B]
                      px-4
                      py-2
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-[#12312B]
                    "
                  >
                    <Upload size={14} />
                    Browse Video
                  </span>
                </label>

                <input
                  id={`product-video-${index}`}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  className="hidden"
                  onChange={(e) =>
                    handleVideoFile(
                      index,
                      e.target.files?.[0],
                    )
                  }
                />

                {video.file && (
                  <div className="mt-4 flex items-center justify-between rounded-lg bg-[#F4F0E9] px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Video
                        size={17}
                        className="shrink-0 text-[#B68C2F]"
                      />

                      <span className="truncate text-xs text-[#555]">
                        {video.file.name}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        updateVideo(index, "file", null)
                      }
                      className="ml-3 text-xs font-medium text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ======================================
                OR URL
            ====================================== */}

            <div className="mb-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E8E2D9]" />

              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-[#E8E2D9]" />
            </div>

            {/* ======================================
                VIDEO DETAILS
            ====================================== */}

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Video Title"
                value={video.title}
                onChange={(e) =>
                  updateVideo(
                    index,
                    "title",
                    e.target.value,
                  )
                }
                placeholder="Product Overview"
              />

              <Input
                label="Video URL"
                value={video.url}
                onChange={(e) =>
                  updateVideo(
                    index,
                    "url",
                    e.target.value,
                  )
                }
                placeholder="https://youtube.com/..."
              />

              <Input
                label="Thumbnail URL"
                value={video.thumbnail}
                onChange={(e) =>
                  updateVideo(
                    index,
                    "thumbnail",
                    e.target.value,
                  )
                }
                placeholder="https://..."
              />

              <Input
                type="number"
                label="Display Order"
                value={video.sortOrder}
                onChange={(e) =>
                  updateVideo(
                    index,
                    "sortOrder",
                    Number(e.target.value),
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}