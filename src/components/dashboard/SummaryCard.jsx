import { FiFileText, FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";

const iconMap = { ticket: FiFileText, alert: FiAlertCircle, check: FiCheckCircle, clock: FiClock };
const bgMap = { ticket: "ccit-icon-blue", alert: "ccit-icon-red", check: "ccit-icon-green", clock: "ccit-icon-purple" };

export default function SummaryCard({ title, value, subtitle, color, icon = "ticket" }) {
  const Icon = iconMap[icon] || FiFileText;
  return (
    <article className="ccit-summary-card">
      <div className={`ccit-summary-icon ${bgMap[icon] || bgMap.ticket}`}><Icon size={18} /></div>
      <div className="ccit-summary-content">
        <p>{title}</p>
        <strong className={color}>{value}</strong>
        {subtitle ? <span>{subtitle}</span> : null}
      </div>
    </article>
  );
}
