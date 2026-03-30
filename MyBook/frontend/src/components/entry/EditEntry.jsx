import ModalLayout from "../ModalLayout";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useGetEntryQuery, useUpdateEntryMutation } from "../../redux/api/entriesApiSlice";
import { toast } from "react-toastify";

const MOOD_OPTIONS = [
  { value: "\u{1F642}", label: "\u{1F642} Happy" },
  { value: "\u{1F60C}", label: "\u{1F60C} Calm" },
  { value: "\u{1F614}", label: "\u{1F614} Sad" },
  { value: "\u{1F621}", label: "\u{1F621} Angry" },
];

const EditEntry = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data: getEntry, isLoading: entryLoading } = useGetEntryQuery(id, { skip: !open });
  const [updateEntry, { isLoading: entryUpdating }] = useUpdateEntryMutation();

  const isLoading = entryLoading || entryUpdating;

  const [formData, setFormData] = useState({
    title: "",
    mood: "",
    content: "",
    date: "",
  });

  useEffect(() => {
    if (getEntry) {
      setFormData({
        title: getEntry.data?.title || "",
        mood: getEntry.data?.mood || MOOD_OPTIONS[0].value,
        content: getEntry.data?.content || "",
        date: new Date(getEntry.data?.date).toISOString().slice(0, 10) || "",
      });
    }
  }, [getEntry]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateEntry({ id, data: formData }).unwrap();
      setOpen(false);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md p-1 text-emerald-500 hover:bg-emerald-500/10"
        aria-label="Edit entry"
      >
        <FiEdit2 size={16} />
      </button>

      <ModalLayout isOpen={open} close={() => setOpen(false)}>
        <h2 className="mb-4 text-center text-2xl font-bold">Edit Entry</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor={`title.${id}`} className="form-label">Entry title</label>
            <input
              type="text"
              name="title"
              id={`title.${id}`}
              value={formData.title}
              onChange={handleChange}
              className="input-premium mt-2"
              required
              placeholder="Give your entry a title"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`date.${id}`} className="form-label">Date</label>
              <input
                type="date"
                name="date"
                id={`date.${id}`}
                value={formData.date}
                onChange={handleChange}
                className="input-premium mt-2"
              />
            </div>

            <div>
              <label htmlFor={`mood.${id}`} className="form-label">Mood</label>
              <select
                name="mood"
                id={`mood.${id}`}
                value={formData.mood}
                onChange={handleChange}
                className="select-premium mt-2"
              >
                {MOOD_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor={`content.${id}`} className="form-label">Describe your day</label>
            <textarea
              name="content"
              id={`content.${id}`}
              value={formData.content}
              onChange={handleChange}
              className="textarea-premium mt-2"
              required
              placeholder="Write about your day, thoughts, or experiences"
            />
          </div>

          <button type="submit" className="premium-btn w-full" disabled={isLoading}>
            {isLoading ? "Saving changes..." : "Save Changes"}
          </button>
        </form>
      </ModalLayout>
    </>
  );
};

export default EditEntry;
