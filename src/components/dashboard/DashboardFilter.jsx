export default function DashboardFilter({
  filters,
  projects,
  parts,
  onChange,
  onFilter,
  onReset,
}) {
  const field = `
    w-full
    h-11
    min-w-0
    border
    border-gray-200
    rounded-xl
    px-3
    text-sm
    text-gray-700
    bg-white
    focus:outline-none
    focus:ring-2
    focus:ring-blue-100
    focus:border-blue-400
  `;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <div className="min-w-0">
          <label className="block mb-1 text-[11px] font-semibold text-gray-500">
            Project
          </label>
          <select
            value={filters.project_id}
            onChange={(e) =>
              onChange({ project_id: e.target.value, part_id: "" })
            }
            className={field}
          >
            <option value="">Semua Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label className="block mb-1 text-[11px] font-semibold text-gray-500">
            Tanggal Awal
          </label>
          <input
            type="date"
            value={filters.start_date}
            onChange={(e) => onChange({ start_date: e.target.value })}
            className={field}
          />
        </div>

        <div className="min-w-0">
          <label className="block mb-1 text-[11px] font-semibold text-gray-500">
            Part
          </label>
          <select
            value={filters.part_id}
            onChange={(e) => onChange({ part_id: e.target.value })}
            disabled={!filters.project_id}
            className={`${field} disabled:bg-gray-50 disabled:text-gray-400`}
          >
            <option value="">Semua Part</option>
            {parts.map((part) => (
              <option key={part.id} value={part.id}>
                {part.name}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label className="block mb-1 text-[11px] font-semibold text-gray-500">
            Tanggal Akhir
          </label>
          <input
            type="date"
            value={filters.end_date}
            onChange={(e) => onChange({ end_date: e.target.value })}
            className={field}
          />
        </div>

        <button
          type="button"
          onClick={onFilter}
          className="col-span-2 w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          Filter
        </button>

        <button
          type="button"
          onClick={onReset}
          className="col-span-2 w-full h-11 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
