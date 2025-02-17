/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "sonner";

const ImageUpload = ({ setUploadedImageUrl }: any) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const MAX_SIZE_MB = 2;

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      // Ensure the file is an image
      const fileSizeMB = file.size / 1024 / 1024; // Convert file size to MB

      if (fileSizeMB > MAX_SIZE_MB) {
        toast.info(`Image size should be less than ${MAX_SIZE_MB}MB.`);

        setSelectedFile(null); // Clear the file
        setPreviewUrl(null); // Clear the preview
      } else {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setUploadSuccess(false); // Reset success state when a new file is selected
      }
    } else {
      toast.info("Invalid File. Please select an image file.");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true); // Start loading state
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "ejobsit"); // Add your preset name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dywbfmjkf/image/upload",
        formData
      );

      if (response.data.secure_url) {
        setUploadSuccess(true);
        setUploadedImageUrl(response.data.secure_url); // Pass URL to parent
        toast.success("Image has been uploaded.");
      }
    } catch (error) {
      console.error("upload error", error);
      toast.error("Failed to upload the image. Please try again.");
      setUploadSuccess(false);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewUrl && (
        <div>
          <img src={previewUrl} alt="Preview" style={{ width: "200px" }} />
        </div>
      )}
      {selectedFile && !uploadSuccess && (
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 mt-5"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#99f8e5"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Upload Image"
          )}
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
