import DashboardLayout from "../components/layout/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import { useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { dashboardConfig } from "../constants/dashboard";
import { getParts, getTickets } from "../services/ticketService";
import {
  getDashboardSummary,
  getStatusDistribution,
  getPriorityDistribution,
  getVolumePerProject,
  getDashboardProjects,
} from "../services/dashboardService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const EMPTY_FILTERS = { project_id: "", part_id: "", start_date: "", end_date: "" };
const COLORS = ["#ef4444", "#f59e0b", "#22c55e", "#64748b", "#3b82f6"];

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const currentUser = useMemo(() => {
    if (!token) return null;
    try { return jwtDecode(token); } catch { return null; }
  }, [token]);
  const role = currentUser?.role;
  const config = dashboardConfig[role];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({});
  const [statusData, setStatusData] = useState({});
  const [priorityData, setPriorityData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [parts, setParts] = useState([]);
  const [latestTickets, setLatestTickets] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);
  const [animateBar, setAnimateBar] = useState(false);

  const pieData = useMemo(() => [
    { name: "Open", value: statusData.open || 0 },
    { name: "In Progress", value: statusData.in_progress || 0 },
    { name: "Resolved", value: statusData.resolved || 0 },
    { name: "Closed", value: statusData.closed || 0 },
    { name: "On Hold", value: statusData.onhold || 0 },
  ], [statusData]);

  const mergedVolumeData = useMemo(() => {
    if (appliedFilters.project_id) return volumeData;
    return projects.map((project) => {
      const found = volumeData.find((item) => item.project === project.name);
      return { project: project.name, total: found ? found.total : 0 };
    });
  }, [projects, volumeData, appliedFilters.project_id]);

  useEffect(() => {
    if (role) fetchDashboard();
  }, [appliedFilters, role]);

  async function fetchDashboard() {
    try {
      setLoading(true); setError(null);
      const [summaryRes, statusRes, priorityRes, volumeRes, projectsRes, ticketsRes] = await Promise.all([
        getDashboardSummary(appliedFilters),
        getStatusDistribution(appliedFilters),
        getPriorityDistribution(appliedFilters),
        getVolumePerProject(appliedFilters),
        getDashboardProjects(),
        getTickets({ page: 1, limit: 3 }),
      ]);
      setSummary(summaryRes || {});
      setStatusData(statusRes || {});
      setPriorityData(priorityRes || []);
      setVolumeData(volumeRes || []);
      setProjects(projectsRes || []);
      setLatestTickets((ticketsRes?.data || []).slice(0, 3));
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(err.message || "Gagal memuat dashboard");
    } finally { setLoading(false); }
  }

  useEffect(() => {
    if (!filters.project_id) { setParts([]); return; }
    getParts(filters.project_id).then((res) => setParts(res.data || [])).catch(() => setParts([]));
  }, [filters.project_id]);

  useEffect(() => {
    setAnimateBar(false);
    const t = setTimeout(() => setAnimateBar(true), 80);
    return () => clearTimeout(t);
  }, [priorityData]);

  const formatHoursToHM = (hours) => {
    if (!hours) return "0j 0m";
    const totalMinutes = Math.floor(hours * 60);
    return `${Math.floor(totalMinutes / 60)}j ${totalMinutes % 60}m`;
  };

  const summaryConfig = {
    ADMINISTRATOR: [
      { title: "Total Tiket", value: summary.total_ticket || 0, subtitle: "Semua tiket", color: "text-blue-600", icon: "ticket" },
      { title: "SLA Breach (Open)", value: summary.sla_breach || 0, subtitle: "Melewati batas waktu", color: "text-red-600", icon: "alert" },
      { title: "Tiket Selesai", value: summary.ticket_selesai || 0, subtitle: "Resolved + Closed", color: "text-green-600", icon: "check" },
      { title: "Rata-rata Solusi", value: formatHoursToHM(summary.avg_resolution_time), subtitle: "Waktu penanganan", color: "text-purple-600", icon: "clock" },
    ],
    STAFF: [
      { title: "Assigned Ticket", value: summary.total_ticket || 0, color: "text-blue-600", icon: "ticket" },
      { title: "Open", value: statusData.open || 0, color: "text-red-600", icon: "alert" },
      { title: "In Progress", value: statusData.in_progress || 0, color: "text-yellow-600", icon: "clock" },
      { title: "Resolved", value: (statusData.resolved || 0) + (statusData.closed || 0), color: "text-green-600", icon: "check" },
    ],
    USER: [
      { title: "Assigned Ticket", value: summary.total_ticket || 0, color: "text-blue-600", icon: "ticket" },
      { title: "Open", value: statusData.open || 0, color: "text-red-600", icon: "alert" },
      { title: "In Progress", value: statusData.in_progress || 0, color: "text-yellow-600", icon: "clock" },
      { title: "Resolved", value: (statusData.resolved || 0) + (statusData.closed || 0), color: "text-green-600", icon: "check" },
    ],
    EXECUTIVE: [
      { title: "Total Tiket", value: summary.total_ticket || 0, subtitle: "Tiket pada project Anda", color: "text-blue-600", icon: "ticket" },
      { title: "SLA Breach", value: summary.sla_breach || 0, subtitle: "Melewati batas waktu", color: "text-red-600", icon: "alert" },
      { title: "Tiket Selesai", value: (statusData.resolved || 0) + (statusData.closed || 0), subtitle: "Resolved + Closed", color: "text-green-600", icon: "check" },
      { title: "Rata-rata Solusi", value: formatHoursToHM(summary.avg_resolution_time), subtitle: "Waktu penanganan", color: "text-purple-600", icon: "clock" },
    ],
    ENGINEER: [
      { title: "Total Tiket", value: summary.total_ticket || 0, subtitle: "Tiket pada project Anda", color: "text-blue-600", icon: "ticket" },
      { title: "SLA Breach", value: summary.sla_breach || 0, subtitle: "Melewati batas waktu", color: "text-red-600", icon: "alert" },
      { title: "Tiket Selesai", value: (statusData.resolved || 0) + (statusData.closed || 0), subtitle: "Resolved + Closed", color: "text-green-600", icon: "check" },
      { title: "Rata-rata Solusi", value: formatHoursToHM(summary.avg_resolution_time), subtitle: "Waktu penanganan", color: "text-purple-600", icon: "clock" },
    ],
  };

  if (!config) return <div className="p-6 text-red-600">Role user tidak dikenali.</div>;

  const quickTicketStatus = (status) => String(status || "").replace("_", " ");

  return (
    <DashboardLayout title={config.title} menu={config.menu}>
      {error && <div className="ccit-inline-error">{error}</div>}
      <div className="ccit-dashboard-page">
        <section className="ccit-dashboard-filter">
          <div className="ccit-filter-grid">
            <label className="ccit-filter-field"><span>Project</span>
              <select value={filters.project_id} onChange={(e) => setFilters({ ...filters, project_id: e.target.value, part_id: "" })}>
                <option value="">Semua Project</option>
                {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
              </select>
            </label>
            <label className="ccit-filter-field"><span>Tanggal Awal</span>
              <input type="date" value={filters.start_date} onChange={(e) => setFilters({ ...filters, start_date: e.target.value })} />
            </label>
            <label className="ccit-filter-field"><span>Part</span>
              <select value={filters.part_id} onChange={(e) => setFilters({ ...filters, part_id: e.target.value })}>
                <option value="">Semua Part</option>
                {parts.map((part) => <option key={part.id} value={part.id}>{part.name}</option>)}
              </select>
            </label>
            <label className="ccit-filter-field"><span>Tanggal Akhir</span>
              <input type="date" value={filters.end_date} onChange={(e) => setFilters({ ...filters, end_date: e.target.value })} />
            </label>
          </div>
          <div className="ccit-dashboard-filter-actions">
            <button type="button" className="ccit-primary-action" onClick={() => setAppliedFilters({ ...filters })}>Filter</button>
            <button type="button" className="ccit-secondary-action" onClick={() => { setFilters(EMPTY_FILTERS); setAppliedFilters(EMPTY_FILTERS); }}>Reset</button>
          </div>
        </section>

        {loading ? (
          <div className="ccit-loading-card">Memuat dashboard...</div>
        ) : (
          <>
            <section className="ccit-summary-grid">
              {summaryConfig[role]?.map((item) => <SummaryCard key={item.title} {...item} />)}
            </section>

            <section className="ccit-analytics-grid">
              <div className="ccit-panel">
                <div className="ccit-panel-title"><div><h3>Status Distribusi</h3><p>Ringkasan status tiket saat ini</p></div></div>
                <div className="ccit-chart-row">
                  <PieChart width={190} height={190}>
                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={76} paddingAngle={2}>
                      {pieData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                  <div className="ccit-legend-list">
                    {pieData.map((item, index) => <div className="ccit-legend-row" key={item.name}><span style={{ backgroundColor: COLORS[index % COLORS.length] }} /> <b>{item.name}</b><strong>{item.value}</strong></div>)}
                  </div>
                </div>
              </div>
              <div className="ccit-panel">
                <div className="ccit-panel-title"><div><h3>Tiket per Project</h3><p>Volume berdasarkan project</p></div></div>
                <div className="ccit-bar-wrap">
                  <BarChart width={300} height={210} data={mergedVolumeData} margin={{ top: 8, right: 8, bottom: 18, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="project" tick={{ fontSize: 9 }} interval={0} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="total" fill="#2563eb" radius={[7,7,0,0]} />
                  </BarChart>
                </div>
              </div>
            </section>

            <section className="ccit-panel ccit-priority-panel">
              <div className="ccit-panel-title"><div><h3>Prioritas Tiket</h3><p>Distribusi tiket berdasarkan prioritas</p></div></div>
              <div className="ccit-priority-list">
                {priorityData.map((item) => {
                  const max = Math.max(...priorityData.map((x) => Number(x.total) || 0), 1);
                  return <div key={item.priority} className="ccit-priority-row"><div><b>{item.priority}</b><strong>{item.total}</strong></div><div className="ccit-progress"><i style={{ width: animateBar ? `${(item.total / max) * 100}%` : "0%", background: item.priority === "URGENT" ? "#ef4444" : item.priority === "HIGH" ? "#f97316" : item.priority === "MEDIUM" ? "#3b82f6" : "#22c55e" }} /></div></div>;
                })}
              </div>
            </section>

            <section className="ccit-panel ccit-latest-panel">
              <div className="ccit-panel-title"><div><h3>Tiket Terbaru</h3><p>Tiket terbaru yang masuk ke sistem</p></div><button type="button" onClick={() => window.location.assign(config.menu.find((m) => m.label === "Data Tiket")?.path || config.menu.find((m) => m.label === "Data Tiket")?.path || "/admin/tickets")}>Lihat Semua ›</button></div>
              <div className="ccit-latest-list">
                {latestTickets.length === 0 ? <div className="ccit-empty-state">Belum ada tiket terbaru.</div> : latestTickets.map((ticket) => <div className="ccit-latest-item" key={ticket.id}>
                  <div className="ccit-latest-icon">▣</div>
                  <div className="ccit-latest-main"><b>{ticket.ticket_code || `#${ticket.id}`}</b><span>{ticket.description || "Tidak ada deskripsi"}</span></div>
                  <div className="ccit-latest-meta"><span className={`ccit-status-badge ${String(ticket.status || "").toLowerCase()}`}>{quickTicketStatus(ticket.status || "-")}</span><small>{ticket.created_at ? new Date(ticket.created_at).toLocaleDateString("id-ID") : "-"}</small></div>
                </div>)}
              </div>
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
