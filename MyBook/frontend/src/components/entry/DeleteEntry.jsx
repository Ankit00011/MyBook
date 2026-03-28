import ModalLayout from "../ModalLayout";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDeleteEntryMutation } from "../../redux/api/entriesApiSlice";
import { toast } from "react-toastify";

const DeleteEntry = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [deleteEntry, { isLoading }] = useDeleteEntryMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteEntry(id).unwrap();
      toast.success(response.message);
      setOpen(false);
    } catch {
      toast.error("Failed to delete the entry.");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md p-1 text-red-500 hover:bg-red-500/10"
        aria-label="Delete entry"
      >
        <FiTrash2 size={16} />
      </button>

      <ModalLayout isOpen={open} close={() => setOpen(false)}>
        <h3 className="mb-2 text-xl font-bold">Delete this entry?</h3>
        <p className="section-subtitle mb-6">
          This action is permanent and cannot be undone.
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <button onClick={() => setOpen(false)} className="premium-btn-outline" type="button">
            Cancel
          </button>
          <button onClick={handleDelete} className="premium-btn-danger" disabled={isLoading} type="button">
            {isLoading ? "Deleting..." : "Delete Entry"}
          </button>
        </div>
      </ModalLayout>
    </>
  );
};

export default DeleteEntry;
