import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BiDotsVertical } from "react-icons/bi";
import { FaRegEdit, FaTrash } from "react-icons/fa";

export type TCourse = {
  name: string;
  // TODO: Populate and show the category name
  category: string;
  language: string;
  coursePrice: number;
  courseLength: string;
  skillLevel: string;
  courseType: string;
  _id: string;
};

export const courseColumns = (
  handleEdit: (courseId: string) => void,
  handleDelete: (courseId: string) => void
): ColumnDef<TCourse>[] => [
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
    accessorKey: "courseType",
    header: "Type",
  },
  {
    accessorKey: "courseLength",
    header: "Duration",
  },
  {
    accessorKey: "coursePrice",
    header: "Price",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-5 w-5">
              <BiDotsVertical className="h-10 w-10" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleEdit(course._id)}>
              <FaRegEdit className="text-green-700" />
              <p className="text-[12px]">Edit</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(course._id)}>
              <FaTrash className="text-red-500" />
              <p className="text-[12px]">Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
