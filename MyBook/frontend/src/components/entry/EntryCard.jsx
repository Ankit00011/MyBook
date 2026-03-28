import ReadMore from "./ReadMore";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";

const EntryCard = ({ id, date, title, mood, content, updatedAt, highlightText }) => {
  const formattedDate = new Date(date).toLocaleDateString("default", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedUpdatedAt = new Date(updatedAt).toLocaleDateString("default", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const shortContent = content.length > 220 ? `${content.slice(0, 220)}...` : content;

  const highlightMatch = (text) => {
    if (!highlightText) {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlightText})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === highlightText.toLowerCase() ? (
        <span key={index} className="rounded bg-teal-500/20 px-1 text-teal-500">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <article className="solid-card flex h-full flex-col p-4 transition hover:-translate-y-0.5 hover:shadow-2xl">
      <div className="mb-3 flex items-center justify-between gap-2 text-sm text-slate-500">
        <p>{formattedDate}</p>
        <div className="flex items-center gap-2">
          <EditEntry id={id} />
          <DeleteEntry id={id} />
        </div>
      </div>

      <h2 className="mb-2 text-lg font-bold break-words">
        {mood} {highlightMatch(title)}
      </h2>

      <p className="section-subtitle mb-4 break-words">{highlightMatch(shortContent)}</p>

      <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
        <span>Edited {formattedUpdatedAt}</span>
        <ReadMore
          formattedDate={formattedDate}
          title={title}
          mood={mood}
          content={content}
          formattedUpdateAt={formattedUpdatedAt}
        />
      </div>
    </article>
  );
};

export default EntryCard;
