import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedImageMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const allowedVideoMimeTypes = [
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];

  const allowedMimeTypes = [
    ...allowedImageMimeTypes,
    ...allowedVideoMimeTypes,
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG, WEBP, MP4, WEBM and MOV files are allowed.",
      ),
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    // Images + videos
    fileSize: 50 * 1024 * 1024,
  },
});

export default upload;