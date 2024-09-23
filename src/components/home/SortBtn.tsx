export function SortBtn({ sort, setSort }) {
  return (
    <>
      <select
        onChange={(e) => setSort(e.target.value)}
        name="sort"
        id="sort"
        value={sort}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </>
  );
}
