import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BiDotsVertical } from "react-icons/bi";
import { FaRegEdit, FaTrash } from "react-icons/fa";
// You can use a Zod schema here if you want.
export type TCategory = {
  name: string;
  _id: string;
};

export const categoryColumns = (
  handleUpdateClick: (category: TCategory) => void,
  handleDelete: (categoryId: string) => void
): ColumnDef<TCategory>[] => [
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
    id: "actions", // Custom ID for the Actions column.
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original; // Access the full row data.
      return (
        <div className="w-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-5 w-5">
                <BiDotsVertical className="h-10 w-10" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-[12px]">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUpdateClick(category)}>
                <FaRegEdit className="text-green-700" />
                <p className="text-[12px]">Edit</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(category._id)}>
                <FaTrash className="text-red-500" />
                <p className="text-[12px]">Delete</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
