import { useState } from "react";
import ModalLayout from "../ModalLayout";

const ReadMore = ({ formattedDate, title, mood, content, formattedUpdateAt }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="premium-btn-outline px-3 py-1 text-sm" onClick={() => setOpen(true)}>
        Read More
      </button>

      <ModalLayout isOpen={open} close={() => setOpen(false)}>
        <h3 className="mb-1 text-center text-2xl font-bold break-words">{mood} {title}</h3>
        <p className="mb-4 text-center text-sm text-slate-500">Date: {formattedDate}</p>

        <article className="solid-card p-4">
          <p className="whitespace-pre-wrap break-words leading-relaxed">{content}</p>
        </article>

        <p className="mt-4 text-right text-sm text-slate-500">Last edited: {formattedUpdateAt}</p>
      </ModalLayout>
    </>
  );
};

export default ReadMore;
