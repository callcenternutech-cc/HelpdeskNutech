import { useEffect, useState } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserRound, LockKeyhole, MessageCircle, Headphones, ShieldCheck } from "lucide-react";
import { updateOnlineStatus } from "../services/userService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const path = { 1: "/admin/dashboard", 2: "/staff/dashboard", 3: "/user/dashboard", 4: "/executive/dashboard", 5: "/engineer/dashboard" }[user.role_id];
    if (path) navigate(path);
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); setError("");
    try {
      const res = await API.post("/users/login", { email, password });
      const token = res.data.token; login(token); await updateOnlineStatus(true);
      const roleID = jwtDecode(token).role_id;
      const path = { 1: "/admin/dashboard", 2: "/staff/dashboard", 3: "/user/dashboard", 4: "/executive/dashboard", 5: "/engineer/dashboard" }[roleID];
      if (path) navigate(path);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal koneksi ke server.");
    }
  };

  return (
    <div className="ccit-login-shell">
      <div className="ccit-login-card">
        <div className="ccit-login-brand">
          <div className="ccit-logo-mark"><span /><span /><span /></div>
          <div><strong>NUTECH</strong><small>INTEGRATION</small></div>
        </div>
        <h1>Helpdesk Center</h1>
        <p className="ccit-login-subtitle">Masuk untuk melanjutkan</p>
        {error && <div className="ccit-login-error">{error}</div>}
        <form onSubmit={handleLogin}>
          <label className="ccit-login-field"><span>Email / Username</span><div><UserRound size={17}/><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email" required /></div></label>
          <label className="ccit-login-field"><span>Password</span><div><LockKeyhole size={17}/><input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" required /><button type="button" onClick={() => setShowPassword((v) => !v)}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label>
          <div className="ccit-login-options"><label><input type="checkbox" /> <span>Ingat saya</span></label><button type="button" onClick={() => setError("Silakan hubungi Administrator untuk reset password.")}>Lupa password?</button></div>
          <button type="submit" className="ccit-login-submit">Masuk</button>
        </form>
        <div className="ccit-login-support"><div className="ccit-support-icon"><Headphones size={22}/></div><div><b>Butuh bantuan?</b><span>Hubungi Admin CCIT melalui WhatsApp</span></div><a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/></a></div>
        <div className="ccit-login-foot"><ShieldCheck size={15}/> Sistem Helpdesk CCIT Nutech Integrasi <span>v1.0.0</span></div>
      </div>
    </div>
  );
}
