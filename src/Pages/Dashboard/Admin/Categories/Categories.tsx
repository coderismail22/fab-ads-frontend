import { useEffect, useState } from "react";
import { TCategory, categoryColumns } from "./categoryColumns";
import CategoryTable from "./CategoryTable";
import EditCategoryModal from "@/components/EditCategoryModal/EditCategoryModal";
import Swal from "sweetalert2";
import CreateCategoryModal from "@/components/CreateCategoryModal/CreateCategoryModal";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader/Loader";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "sonner";

export default function Categories() {
  // Fetching states
  const [img, setImg] = useState<string>("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Add Loading State Edit, Delete
  // Create Category
  const handleCreate = async (categoryName: string, img: string) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/categories/create-category", {
        name: categoryName,
        img,
      });
      setCategories((prev) => [...prev, response.data.data]); // Add the new category
      toast.success("The category has been created.");
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating category:", err);
      toast.error("Failed to create category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Category
  const handleUpdateClick = (category: TCategory) => {
    setSelectedCategory(category); // Pass the selected category to the modal
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedCategory: TCategory) => {
    setIsSubmitting(true);
    try {
      await axiosInstance.patch(
        `/categories/update-category/${updatedCategory._id}`,
        {
          name: updatedCategory?.name,
          img: updatedCategory?.img,
        }
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === updatedCategory._id ? updatedCategory : cat
        )
      );
      toast.success("The category has been updated.");
      setIsEditModalOpen(false); // Close the modal
    } catch (err) {
      console.error("Error updating category:", err);
      toast.error("Failed to update category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Category
  const handleDelete = async (categoryId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/categories/${categoryId}`);
          setCategories((prev) =>
            prev.filter((category) => category._id !== categoryId)
          );
          toast.success("The category has been deleted.");
        } catch (err) {
          console.error("Error deleting category:", err);
          toast.error("Failed to delete category.");
        }
      }
    });
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/categories");
        const allCategories = response.data.data;
        setCategories(allCategories);
      } catch (err) {
        console.error("API Request Error:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="container mx-auto py-2">
      <div className="my-4 flex justify-end">
        <Button
          className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Category
        </Button>
      </div>
      {/* TODO: Add Pagination */}
      {categories && (
        <CategoryTable
          columns={categoryColumns(handleUpdateClick, handleDelete)}
          data={categories}
        />
      )}

      {/* Create Modal */}
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
        isLoading={isSubmitting}
      />
      {/* Edit Modal */}
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
        onSave={handleSave}
        isLoading={isSubmitting}
      />
    </div>
  );
}
