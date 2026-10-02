import { NavLink } from "react-router-dom";
import { FiHome, FiFileText, FiPlus, FiBarChart2, FiUser, FiMoreHorizontal } from "react-icons/fi";

function itemIcon(label = "") {
  const value = label.toLowerCase();
  if (value.includes("dashboard")) return FiHome;
  if (value.includes("tiket")) return FiFileText;
  if (value.includes("user")) return FiUser;
  if (value.includes("master")) return FiBarChart2;
  return FiMoreHorizontal;
}

export default function MobileBottomNav({ menu = [], onCreateTicket }) {
  const visible = menu.slice(0, 4);
  return (
    <nav className="ccit-bottom-nav lg:hidden" aria-label="Navigasi mobile">
      <div className="ccit-bottom-nav-inner">
        {visible.map((item, index) => {
          const Icon = itemIcon(item.label);
          return (
            <NavLink key={item.path || index} to={item.path} className="ccit-bottom-nav-item">
              {({ isActive }) => (
                <>
                  <span className={isActive ? "ccit-bottom-icon active" : "ccit-bottom-icon"}><Icon size={19} /></span>
                  <span>{item.label === "Data Tiket" ? "Tiket" : item.label === "Manajemen User" ? "User" : item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
        <button type="button" className="ccit-bottom-fab" onClick={onCreateTicket} aria-label="Buat tiket">
          <FiPlus size={25} />
        </button>
        <div className="ccit-bottom-nav-spacer" />
      </div>
    </nav>
  );
}
