import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { useGetEntriesQuery, useSearchEntryQuery } from "../redux/api/entriesApiSlice";
import EntryCard from "../components/entry/EntryCard";
import AddEntry from "../components/entry/AddEntry";
import Loader from "../components/Loader";

const Entries = () => {
  const user = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const { data: getEntries, isLoading: isLoadingEntries } = useGetEntriesQuery(undefined, {
    skip: searchQuery.length > 0,
  });

  const { data: searchResult, isLoading: isLoadingSearch } = useSearchEntryQuery(searchQuery, {
    skip: searchQuery.length === 0,
  });

  if (isLoadingEntries || isLoadingSearch) {
    return (
      <div className="flex min-h-[calc(100dvh-280px)] items-center justify-center">
        <Loader />
      </div>
    );
  }

  const entries = searchQuery.length > 0 ? searchResult?.data || [] : getEntries?.data || [];

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h1 className="section-title text-3xl">Your Journal Entries</h1>
          <p className="section-subtitle mt-2">
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : "A private timeline of your writing history."}
          </p>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="solid-card p-8 text-center">
          <h2 className="text-2xl font-bold">No entries found</h2>
          <p className="section-subtitle mt-3 mx-auto max-w-2xl">
            {searchQuery
              ? "No results matched your keyword. Try another phrase or clear search and create a new entry."
              : `${user.data.firstName}, start your first journal entry and build your story over time.`}
          </p>
        </div>
      ) : (
        <div className="entry-grid">
          {entries.map((entry) => (
            <EntryCard
              key={entry._id}
              id={entry._id}
              date={entry.date}
              title={entry.title}
              mood={entry.mood}
              content={entry.content}
              updatedAt={entry.updatedAt}
              highlightText={searchQuery}
            />
          ))}
        </div>
      )}

      <div className="floating-add">
        <AddEntry />
      </div>
    </div>
  );
};

export default Entries;
