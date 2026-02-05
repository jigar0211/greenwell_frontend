import { useState } from 'react';
import { Package, Eye, EyeOff, Phone, Lock, Loader2, ShieldCheck, Monitor, History, LogOut, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLogin } from '@/hooks/useAuth';
import { useLogoutSession } from '@/hooks/useSession';
import { toast } from '@/hooks/use-toast';

interface Session {
  id: string;
  user_agent: string;
  created_at: string;
}

interface SessionErrorDetails {
  token: string;
  sessions: Session[];
}

export default function Login() {
  const { mutate: login, isPending } = useLogin();
  const { mutate: logoutSession, isPending: isLoggingOut } = useLogoutSession();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sessionError, setSessionError] = useState<SessionErrorDetails | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const mobileRegex = /^[0-9]{10,15}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number (10-15 digits)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    login(
      { mobile: formData.mobile, password: formData.password },
      {
        onError: (error: any) => {
          if (error.details?.process_code === 'user_already_logged_in') {
            setSessionError({
              token: error.details.token,
              sessions: error.details.sessions,
            });
          }
        }
      }
    );
  };

  const handleLogoutSession = (sessionId: string) => {
    if (!sessionError) return;

    logoutSession(
      { sessionId, token: sessionError.token },
      {
        onSuccess: () => {
          toast({ title: 'Session cleared', description: 'You can now log in.' });
          setSessionError(null);
          // Automatically try to login again
          login({ mobile: formData.mobile, password: formData.password });
        }
      }
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDeviceIcon = () => {
    return <Monitor className="w-5 h-5 text-slate-400" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 animate-fade-in font-sans">
      <div className="w-full max-w-[440px]">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-xl shadow-primary/20 rotate-3 hover:rotate-0 transition-transform duration-300">
            <Package className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">GreenWell</h1>
          <p className="text-slate-500 mt-2 font-medium">Precision Stock Management</p>
        </div>

        {/* Card */}
        <div className="bg-white p-1 pb-1 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden">
          <div className="p-8">
            {!sessionError ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-800">Welcome Back</h2>
                  <p className="text-sm text-slate-500 mt-1">Please enter your details to sign in</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                      Mobile Number
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className={cn(
                          "w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm font-medium",
                          errors.mobile && "border-red-200 bg-red-50/30 focus:ring-red-100 focus:border-red-400"
                        )}
                        placeholder="e.g. 9876543210"
                      />
                    </div>
                    {errors.mobile && <p className="text-xs text-red-500 mt-2 ml-1 font-medium">{errors.mobile}</p>}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2 px-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Password
                      </label>
                      <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot?</button>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={cn(
                          "w-full h-12 pl-12 pr-12 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm font-medium",
                          errors.password && "border-red-200 bg-red-50/30 focus:ring-red-100 focus:border-red-400"
                        )}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-2 ml-1 font-medium animate-in slide-in-from-top-1 fade-in duration-200">{errors.password}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 mt-4"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Sign In to Dashboard'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setSessionError(null)}
                    className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Session Limit Reached</h2>
                    <p className="text-sm text-slate-500">Logout from a device to continue</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {sessionError.sessions.map((session) => (
                    <div
                      key={session.id}
                      className="group p-4 rounded-2xl border border-slate-200/60 bg-slate-50/50 hover:bg-white hover:border-primary/30 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="mt-1 w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-400 group-hover:text-primary group-hover:border-primary/20 transition-colors">
                            {getDeviceIcon()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700 line-clamp-1 max-w-[180px]">
                              {session.user_agent.split(')')[0].split('(')[1] || 'Unknown Device'}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-slate-400">
                              <History className="w-3 h-3" />
                              <span>Last active: {formatDate(session.created_at)}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleLogoutSession(session.id)}
                          disabled={isLoggingOut}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-95 disabled:opacity-50"
                          title="Logout session"
                        >
                          <LogOut className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-xs text-amber-700 leading-relaxed font-medium">
                    For security, you can only have up to 3 active sessions. Logging out from a device will allow you to sign in here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-center mt-12 gap-3 text-slate-400">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Enterprise Secure</span>
          </div>
          <p className="text-xs font-medium">
            &copy; {new Date().getFullYear()} GreenWell. Built with care.
          </p>
        </div>
      </div>
    </div>
  );
}
