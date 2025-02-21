/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Select, { MultiValue } from "react-select";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { Button } from "@/components/ui/button";

interface CategoryOption {
  value: string;
  label: string;
}
// TODO: Fetch Categories From Database
const categoriesOptions: CategoryOption[] = [
  { value: "Facebook Marketing", label: "Facebook Marketing" },
];

interface FormData {
  title: string;
}

const PublishNewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();
  const title = watch("title", "");
  const [content, setContent] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<
    MultiValue<CategoryOption>
  >([]);

  // Handle Category Change
  const handleCategoriesChange = (
    selectedOptions: MultiValue<CategoryOption>
  ) => {
    setSelectedCategories(selectedOptions || []); // Ensure it's an empty array when no categories are selected
  };

  // Handle content change
  const handleContentChange = (newContent: string) => {
    setContent(newContent); // Update the state in the parent
  };

  const onSubmit = async () => {
    const postData = {
      title: title,
      author: "Ismail",
      image: uploadedImageUrl,
      body: content,
      category: selectedCategories.map((cat) => cat?.value),
    };
    // console.log("postData", postData);

    try {
      // TODO: Replace with server url
      const res = await axios.post(
        "http://localhost:5000/api/v1/services",
        postData,
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log("Post created:", res.data);
      reset(); // Reset the form after submission
      setContent(""); // Clear the content editor
      setUploadedImageUrl(""); // Clear the uploaded image URL
      setSelectedCategories([]); // Clear the selected categories
      Swal.fire("Success!", "Posted successfully.", "success");
    } catch (err: unknown) {
      let errorMessage = "Failed to post."; // Default error message

      // Check if err is an instance of AxiosError or has a message property
      if (axios.isAxiosError(err) && err.response) {
        // If using Axios, we can extract a more detailed error message
        errorMessage = err.response.data?.message || errorMessage; // Fallback to default message
      } else if (typeof err === "object" && err !== null && "message" in err) {
        // If err is an object and has a message property
        errorMessage = (err as { message?: string }).message || errorMessage; // Fallback to default message
      }

      Swal.fire("Error!", errorMessage, "error");
      console.error("Error creating post:", errorMessage);
    }
  };

  return (
    <div className=" mx-10 my-10 ">
      <h1 className="text-2xl font-semibold mb-6 text-center text-blue-500 underline underline-offset-4">
        Add a new service
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full space-y-4  rounded-md p-5 bg-[#CBD5E1]"
      >
        {/* Title */}
        <div>
          <label className="block font-medium text-white">Title</label>
          <input
            type="text"
            placeholder="Enter a title"
            className="w-full border border-gray-300 rounded p-2 bg-white"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
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
        <div>
          <label className="block font-medium text-white">
            Upload Cover Image
          </label>
          <ImageUpload setUploadedImageUrl={setUploadedImageUrl} />
          {uploadedImageUrl === "" && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-white ">Content</label>
          <RichTextEditor
            content={content}
            onChangeContent={handleContentChange}
          />
        </div>

        {/* Make Publish Post Button Conditional */}
        <div className="flex justify-center ">
          <Button
            type="submit"
            className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
          >
            Publish Post
          </Button>
        </div>
      </form>

      {/* Preview Section */}
      {/* {content && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Preview Content
          </h2>
          <div className="border border-gray-300 p-4 md:p-8 rounded w-full max-w-full overflow-hidden">
            {uploadedImageUrl ? (
              <img
                src={uploadedImageUrl}
                alt="Uploaded Preview"
                className="w-full max-w-full h-auto object-cover mb-4 rounded"
              />
            ) : null}

            <div
              className="break-words text-white"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PublishNewPost;
