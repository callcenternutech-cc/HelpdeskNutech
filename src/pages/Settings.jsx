import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, BellOff, Lock, Moon, Palette, Sun, User, Globe2 } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { navigationMenu } from "../constants/navigation";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const roleMenu = (role) => {
  if (role === 1) return navigationMenu.administrator;
  if (role === 2) return navigationMenu.staff;
  if (role === 3) return navigationMenu.user;
  if (role === 4) return navigationMenu.executive;
  if (role === 5) return navigationMenu.engineer;
  return [];
};

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`ccit-settings-switch ${checked ? "is-on" : ""}`}
    >
      <span />
    </button>
  );
}

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    try {
      setPushEnabled(localStorage.getItem("ccit-push") !== "0");
      setSoundEnabled(localStorage.getItem("ccit-sound") !== "0");
    } catch (_) {}
  }, []);

  const persist = (key, value) => {
    try { localStorage.setItem(key, value ? "1" : "0"); } catch (_) {}
  };

  return (
    <DashboardLayout title="Pengaturan" menu={roleMenu(user?.role_id)}>
      <div className="ccit-settings-page">
        <section className="ccit-settings-hero">
          <div className="ccit-settings-hero-icon"><Palette size={22} /></div>
          <div>
            <h2>Pengaturan Aplikasi</h2>
            <p>Atur tampilan dan preferensi Helpdesk CCIT.</p>
          </div>
        </section>

        <section className="ccit-settings-card">
          <div className="ccit-settings-section-title">
            <Palette size={19} />
            <div><h3>Tampilan</h3><p>Pilih mode tampilan aplikasi.</p></div>
          </div>

          <div className="ccit-theme-choice-grid">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`ccit-theme-choice ${theme === "light" ? "selected" : ""}`}
            >
              <span className="ccit-theme-choice-icon"><Sun size={20} /></span>
              <span><strong>Mode Normal</strong><small>Latar terang dan bersih</small></span>
              <span className="ccit-choice-radio" />
            </button>

            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`ccit-theme-choice ${theme === "dark" ? "selected" : ""}`}
            >
              <span className="ccit-theme-choice-icon"><Moon size={20} /></span>
              <span><strong>Mode Gelap</strong><small>Nyaman untuk kondisi redup</small></span>
              <span className="ccit-choice-radio" />
            </button>
          </div>
        </section>

        <section className="ccit-settings-card">
          <div className="ccit-settings-section-title">
            <Bell size={19} />
            <div><h3>Notifikasi</h3><p>Atur pemberitahuan aplikasi.</p></div>
          </div>
          <div className="ccit-settings-row">
            <span className="ccit-row-icon"><Bell size={18} /></span>
            <div><strong>Notifikasi Push</strong><small>Tampilkan notifikasi tiket baru dan pembaruan tiket.</small></div>
            <Switch checked={pushEnabled} onChange={(v) => { setPushEnabled(v); persist("ccit-push", v); }} label="Notifikasi push" />
          </div>
          <div className="ccit-settings-row">
            <span className="ccit-row-icon"><BellOff size={18} /></span>
            <div><strong>Suara Notifikasi</strong><small>Mainkan suara saat notifikasi baru diterima.</small></div>
            <Switch checked={soundEnabled} onChange={(v) => { setSoundEnabled(v); persist("ccit-sound", v); }} label="Suara notifikasi" />
          </div>
        </section>

        <section className="ccit-settings-card">
          <div className="ccit-settings-section-title">
            <User size={19} />
            <div><h3>Akun</h3><p>Pengaturan akun yang sering digunakan.</p></div>
          </div>
          <div className="ccit-settings-link-row" onClick={() => navigate("/profile")} role="button" tabIndex={0}>
            <span className="ccit-row-icon"><User size={18} /></span>
            <div><strong>Profil Saya</strong><small>{user?.name || "Pengguna"}</small></div>
          </div>
          <div className="ccit-settings-link-row" onClick={() => navigate("/profile")} role="button" tabIndex={0}>
            <span className="ccit-row-icon"><Lock size={18} /></span>
            <div><strong>Ubah Password</strong><small>Kelola password akun Anda di halaman profil.</small></div>
          </div>
          <div className="ccit-settings-link-row">
            <span className="ccit-row-icon"><Globe2 size={18} /></span>
            <div><strong>Bahasa</strong><small>Indonesia</small></div>
          </div>
        </section>

        <p className="ccit-settings-note">Preferensi mode tampilan disimpan di perangkat ini dan akan digunakan saat aplikasi dibuka kembali.</p>
      </div>
    </DashboardLayout>
  );
}
