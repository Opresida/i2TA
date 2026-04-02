import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] font-sans text-[#8A94A6]">
      <Navbar />

      <div className="flex items-center justify-center relative overflow-hidden px-4 py-24 selection:bg-[#00E0FF] selection:text-[#0A0F1C]">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-50"
          style={{
            backgroundSize: '50px 50px',
            backgroundImage:
              'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[#7B3FE4]/30 rounded-full blur-[140px] z-0 pointer-events-none opacity-40"></div>

        <div className="w-full max-w-[360px] mx-auto bg-[#05080f]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-[#7B3FE4]/40 transition-colors duration-500 z-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B3FE4] to-[#00E0FF]"></div>

          <div className="flex justify-center mb-6 md:mb-8 pt-2">
            <img
              src="https://raw.githubusercontent.com/Opresida/2ita-manualdemarca/refs/heads/main/logo.svg"
              alt="i2TA Logo"
              className="h-8 md:h-10 drop-shadow-[0_0_8px_rgba(123,63,228,0.5)] object-contain"
            />
          </div>

          <h3 className="text-[#F5F7FA] font-display font-bold text-lg md:text-xl text-center mb-6">
            Acesso ao Portal
          </h3>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="group/input">
              <label className="text-[9px] md:text-[10px] text-gray-400 mb-1.5 block uppercase tracking-widest font-mono">
                E-mail Corporativo
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within/input:text-[#00E0FF] transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0F1C] border border-white/10 rounded-lg pl-10 pr-4 py-2 md:py-2.5 text-xs md:text-sm text-[#F5F7FA] focus:border-[#7B3FE4] focus:ring-1 focus:ring-[#7B3FE4] outline-none transition-all placeholder-gray-700 font-mono"
                  placeholder="sys@i2ta.org.br"
                  required
                />
              </div>
            </div>

            <div className="group/input2">
              <label className="text-[9px] md:text-[10px] text-gray-400 mb-1.5 block uppercase tracking-widest font-mono">
                Auth Token (Senha)
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within/input2:text-[#7B3FE4] transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0A0F1C] border border-white/10 rounded-lg pl-10 pr-4 py-2 md:py-2.5 text-xs md:text-sm text-[#F5F7FA] focus:border-[#7B3FE4] focus:ring-1 focus:ring-[#7B3FE4] outline-none transition-all placeholder-gray-700 font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 mb-6">
              <label className="flex items-center gap-2 cursor-pointer group/chk">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-600 bg-transparent text-[#7B3FE4] focus:ring-[#7B3FE4] focus:ring-offset-[#0A0F1C]"
                />
                <span className="text-[10px] md:text-xs text-gray-400 font-mono group-hover/chk:text-[#F5F7FA] transition-colors">
                  Lembrar-me
                </span>
              </label>
              <a
                href="#"
                className="text-[10px] md:text-xs text-[#00E0FF] hover:text-[#F5F7FA] transition-colors font-mono"
              >
                Recuperar acesso
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center text-xs md:text-sm py-2.5 md:py-3 bg-gradient-to-r from-[#7B3FE4] to-[#00E0FF] text-white font-display font-semibold rounded-lg shadow-[0_0_15px_rgba(123,63,228,0.3)] hover:shadow-[0_0_25px_rgba(0,224,255,0.4)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Autenticar Conexão
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
