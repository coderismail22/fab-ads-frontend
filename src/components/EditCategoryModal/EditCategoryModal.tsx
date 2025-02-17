import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: { name: string; _id: string } | null; // Only for categories
  onSave: (updatedCategory: { name: string; _id: string }) => void;
  isLoading?: boolean;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  category,
  onSave,
  isLoading = false,
}) => {
  const [name, setName] = useState(category?.name || "");

  useEffect(() => {
    if (category) {
      setName(category.name); // Pre-fill the input when the modal opens
    }
  }, [category]);

  const handleSubmit = () => {
    if (category && name.trim()) {
      onSave({ ...category, name }); // Pass the updated category
    }
  };
  // TODO: Add loading spinner here
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Category Name
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`bg-blue-50 border border-blue-300 focus:ring focus:ring-blue-300 
              rounded-lg px-4 py-2 shadow-md text-gray-700 
              placeholder-gray-400 hover:shadow-lg transition-all 
              duration-300 ease-in-out 
             
             `}
          />
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={onClose}
            className="text-white bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
