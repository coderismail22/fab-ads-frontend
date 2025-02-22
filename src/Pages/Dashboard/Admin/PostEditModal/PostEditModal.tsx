/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import axiosInstance from "@/api/axiosInstance";
import Select from "react-select";
import { handleAxiosError } from "@/utils/handleAxiosError";
import "../../../../styles/swal.css"
interface CategoryOption {
  value: string;
  label: string;
}
const PostEditModal = ({ isOpen, onClose, post, onPostUpdate }: any) => {
  const [title, setTitle] = useState(post.title || "");
  const [description, setDescription] = useState(post.description || "");
  const [body, setBody] = useState(post.body || "");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(post.imgUrl || "");
  const [categoriesOptions, setCategoriesOptions] = useState<CategoryOption[]>(
    post.category || []
  );
  const [selectedCategories, setSelectedCategories] = useState<
    CategoryOption[]
  >(post.category || []);
  //child to parent state lifting
  const handleContentChange = (newContent: any) => {
    setBody(newContent); // Update the state in the parent
  };

  // const editorRef = useRef(null);

  useEffect(() => {
    setTitle(post?.title || "");
    setDescription(post?.description || "");
    setBody(post?.body || "");
    setUploadedImageUrl(post?.image || "");

    if (post.category && Array.isArray(post.category)) {
      const formattedCategories = post.category.map((cat: any) =>
        typeof cat === "string" // If it's a string, treat it as a category name
          ? { value: cat, label: cat }
          : { value: cat.value || cat.name, label: cat.label || cat.name }
      );
      setSelectedCategories(formattedCategories);
    } else {
      setSelectedCategories([]);
    }
  }, [post]);

  const handleUpdate = async () => {
    const updatedPostData = {
      title,
      description,
      category: selectedCategories.map((cat) => cat.value),
      body,
      image: uploadedImageUrl,
    };
    try {
      await axiosInstance.patch(`/services/${post._id}`, updatedPostData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Service updated successfully.",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
      onPostUpdate();
      onClose(); // Close the modal
    } catch (error: any) {
      console.log(error);
      handleAxiosError(error, "Failed to update post");
    }
  };
  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/categories");

        // Transform data to match react-select format
        const formattedCategories = data?.data?.map((category: any) => ({
          value: category.name,
          label: category.name,
        }));

        setCategoriesOptions(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle Category Change
  const handleCategoriesChange = (selectedOptions: any) => {
    setSelectedCategories(selectedOptions || []);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 ">Title</label>
          <input
            type="text"
            className="bg-white w-full border border-gray-300 rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 ">Description</label>
          <input
            type="text"
            className="bg-white w-full border border-gray-300 rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* Category Selection */}
        <div>
          <label className="block font-medium text-white">Category</label>
          <Select
            isMulti
            options={categoriesOptions}
            value={selectedCategories}
            onChange={handleCategoriesChange}
            className="basic-multi-select text-black"
            classNamePrefix="select"
            placeholder="Select Categories"
          />
          {selectedCategories.length === 0 && (
            <p className="text-red-500 text-sm">
              At least one category is required
            </p>
          )}
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
