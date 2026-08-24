import { Plus, Trash2, Loader2, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  Input,
  Textarea,
  Button,
} from "../../../../components/ui";

import { uploadStoryImage } from "../../../../redux/product/productThunk";

export default function StorySection({
  formData,
  setFormData,
  mode = "create",
}) {
  const dispatch = useDispatch();

  const { storyLoading } = useSelector(
    (state) => state.product
  );

  const addStory = () => {
    setFormData((prev) => ({
      ...prev,
      storySections: [
        ...(prev.storySections || []),
        {
          title: "",
          description: "",
          image: "",
          sortOrder:
            prev.storySections?.length || 0,
        },
      ],
    }));
  };

  const updateStory = (index, field, value) => {
    setFormData((prev) => {
      const storySections = [
        ...(prev.storySections || []),
      ];

      storySections[index] = {
        ...storySections[index],
        [field]: value,
      };

      return {
        ...prev,
        storySections,
      };
    });
  };

  const removeStory = (index) => {
    setFormData((prev) => ({
      ...prev,
      storySections: (
        prev.storySections || []
      ).filter((_, i) => i !== index),
    }));
  };

  // ==========================================
  // STORY IMAGE
  // ==========================================

  const handleStoryImage = async (
    index,
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    // ==========================================
    // CREATE
    // ==========================================

    if (
      mode === "create" ||
      !formData?._id
    ) {
      updateStory(
        index,
        "image",
        file
      );

      return;
    }

    // ==========================================
    // EDIT
    // ==========================================

    try {
      const result = await dispatch(
        uploadStoryImage({
          id: formData._id,
          storyIndex: index,
          file,
        })
      ).unwrap();

      // Backend returns storySections[]
      const storySections =
        result?.data || [];

      const uploadedImage =
        storySections?.[index]?.image;

      if (uploadedImage) {
        updateStory(
          index,
          "image",
          uploadedImage
        );
      }
    } catch (error) {
      console.error(
        "Story image upload failed:",
        error
      );
    } finally {
      event.target.value = "";
    }
  };

  // ==========================================
  // IMAGE PREVIEW
  // ==========================================

  const getImagePreview = (image) => {
    if (!image) return "";

    if (image instanceof File) {
      return URL.createObjectURL(image);
    }

    return image;
  };

  return (
    <Card>
      {/* HEADER */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#12312B]">
            Story Sections
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Showcase your product story with images
            and content.
          </p>
        </div>

        <Button
          type="button"
          onClick={addStory}
        >
          <Plus size={18} />
          Add Story
        </Button>
      </div>

      {/* EMPTY */}

      {!formData.storySections?.length && (
        <div className="rounded-2xl border border-dashed border-[#E8E2D9] py-16 text-center text-gray-500">
          <p className="text-sm">
            No story sections added yet.
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Click "Add Story" to create your first
            product story section.
          </p>
        </div>
      )}

      {/* STORIES */}

      <div className="space-y-6">
        {formData.storySections?.map(
          (story, index) => {
            const preview = getImagePreview(
              story.image
            );

            return (
              <div
                key={index}
                className="rounded-2xl border border-[#E8E2D9] bg-white p-6"
              >
                {/* HEADER */}

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#12312B]">
                      Story Section {index + 1}
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      Add content and an image for
                      this story section.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="danger"
                    onClick={() =>
                      removeStory(index)
                    }
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                {/* TITLE + ORDER */}

                <div className="grid gap-6 lg:grid-cols-2">
                  <Input
                    label="Title"
                    value={
                      story.title || ""
                    }
                    onChange={(e) =>
                      updateStory(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Crafted by Skilled Artisans"
                  />

                  <Input
                    type="number"
                    label="Display Order"
                    value={
                      story.sortOrder ??
                      index
                    }
                    onChange={(e) =>
                      updateStory(
                        index,
                        "sortOrder",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />
                </div>

                {/* DESCRIPTION */}

                <div className="mt-6">
                  <Textarea
                    label="Description"
                    value={
                      story.description ||
                      ""
                    }
                    onChange={(e) =>
                      updateStory(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows={5}
                    placeholder="Write the story behind this product..."
                  />
                </div>

                {/* IMAGE */}

                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-[#12312B]">
                        Story Image
                      </h4>

                      <p className="mt-1 text-xs text-gray-400">
                        JPG, PNG or WEBP ·
                        Recommended 1200 × 800 px
                      </p>
                    </div>

                    {storyLoading && (
                      <div className="flex items-center gap-2 text-xs text-[#12312B]">
                        <Loader2
                          size={14}
                          className="animate-spin"
                        />
                        Uploading...
                      </div>
                    )}
                  </div>

                  {/* PREVIEW */}

                  {preview && (
                    <div className="mb-4 overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#FCFBF8]">
                      <img
                        src={preview}
                        alt={
                          story.title ||
                          `Story ${index + 1}`
                        }
                        className="h-64 w-full object-cover"
                        onLoad={(e) => {
                          if (
                            story.image instanceof
                            File
                          ) {
                            URL.revokeObjectURL(
                              e.currentTarget.src
                            );
                          }
                        }}
                      />
                    </div>
                  )}

                  {/* UPLOAD */}

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D8D0C4] bg-[#FCFBF8] px-6 py-10 text-center transition hover:border-[#12312B] hover:bg-white">
                    <Upload
                      size={28}
                      className="mb-3 text-[#12312B]"
                    />

                    <span className="text-sm font-medium text-[#12312B]">
                      {story.image
                        ? "Replace Story Image"
                        : "Upload Story Image"}
                    </span>

                    <span className="mt-1 text-xs text-gray-400">
                      Click to select an image
                    </span>

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) =>
                        handleStoryImage(
                          index,
                          e
                        )
                      }
                    />
                  </label>

                  {/* CREATE NOTE */}

                  {mode === "create" &&
                    story.image instanceof
                      File && (
                      <p className="mt-2 text-xs text-gray-500">
                        Image selected. It will
                        be uploaded after the
                        product is created.
                      </p>
                    )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </Card>
  );
}