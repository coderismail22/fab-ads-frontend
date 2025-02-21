/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";

const PostEditModal = ({ isOpen, onClose, post, onPostUpdate }: any) => {
  const [title, setTitle] = useState(post.title || "");
  const [body, setBody] = useState(post.body || "");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(post.imgUrl || "");

  //child to parent state lifting
  const handleContentChange = (newContent: any) => {
    setBody(newContent); // Update the state in the parent
  };

  // const editorRef = useRef(null);

  useEffect(() => {
    setTitle(post.title || "");
    setBody(post.body || "");
    setUploadedImageUrl(post.image || "");
  }, [post]);

  const handleUpdate = async () => {
    const updatedPostData = {
      title,
      body,
      image: uploadedImageUrl,
    };
    try {
      // TODO: Add Server Url
      await axios.patch(
        `http://localhost:5000/api/v1/services/${post._id}`,
        updatedPostData
      );
      Swal.fire("Success!", "Post updated successfully.", "success");
      onPostUpdate();
      onClose(); // Close the modal
    } catch (error) {
      Swal.fire("Error!", "Failed to update post.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Image Upload Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Upload Cover Image
          </label>
          <ImageUpload setUploadedImageUrl={setUploadedImageUrl} />
          {uploadedImageUrl === "" && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        {/* Content Editor */}
        <div>
          <label className="block font-medium">Content</label>
          <RichTextEditor
            content={body}
            onChangeContent={handleContentChange}
          />
        </div>

        {/* Confirmation Button */}
        <div className="flex justify-end space-x-4">
          {/* Save Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handleUpdate()}
          >
            Save Changes
          </button>
          {/* Cancel Button */}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditModal;
