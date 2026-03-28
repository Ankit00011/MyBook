import ModalLayout from "../ModalLayout";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useAddEntryMutation } from "../../redux/api/entriesApiSlice";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  mood: "??",
  content: "",
  date: new Date().toISOString().slice(0, 10),
};

const AddEntry = () => {
  const [open, setOpen] = useState(false);
  const [addEntry, { isLoading }] = useAddEntryMutation();
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (open) {
      setFormData(initialState);
    }
  }, [open]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addEntry(formData).unwrap();
      setOpen(false);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="premium-btn inline-flex h-14 w-14 items-center justify-center rounded-full text-xl"
        aria-label="Add new entry"
      >
        <FiPlus size={24} />
      </button>

      <ModalLayout isOpen={open} close={() => setOpen(false)}>
        <h2 className="mb-4 text-center text-2xl font-bold">Add New Entry</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="form-label">Entry title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="input-premium mt-2"
              required
              placeholder="Give your entry a title"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="input-premium mt-2"
              />
            </div>

            <div>
              <label htmlFor="mood" className="form-label">Mood</label>
              <select
                name="mood"
                id="mood"
                value={formData.mood}
                onChange={handleChange}
                className="select-premium mt-2"
              >
                <option value="??">?? Happy</option>
                <option value="??">?? Calm</option>
                <option value="??">?? Sad</option>
                <option value="??">?? Angry</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="content" className="form-label">Describe your day</label>
            <textarea
              name="content"
              id="content"
              value={formData.content}
              onChange={handleChange}
              className="textarea-premium mt-2"
              required
              placeholder="Write about your day, thoughts, or experiences"
            />
          </div>

          <button type="submit" className="premium-btn w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Entry"}
          </button>
        </form>
      </ModalLayout>
    </>
  );
};

export default AddEntry;
