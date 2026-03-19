import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  // ✅ FIX 1: Added loading state
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;  // ✅ FIX 2: Guard against empty email

    setLoading(true);  // ✅ FIX 3: Start loading
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/forget-password",
        { email }
      );
      
      setMessage(res.data?.message || "Reset link sent!");
      setSubmitted(true);  // ✅ FIX 4: This was MISSING — success state never showed
    } catch (error) {
      // ✅ FIX 5: Show backend error message if available, else fallback
      setMessage(error?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);  // ✅ FIX 6: Always stop loading
    }
  };

  return (
    <div className="min-h-screen bg-[#F67280] flex items-center justify-center px-4 font-serif">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'Lato', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineExpand {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .animate-fade-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .animate-fade-up-delay { animation: fadeUp 0.7s 0.15s cubic-bezier(0.22,1,0.36,1) both; }
        .animate-fade-up-delay2 { animation: fadeUp 0.7s 0.28s cubic-bezier(0.22,1,0.36,1) both; }
        .animate-fade-up-delay3 { animation: fadeUp 0.7s 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        .line-expand { animation: lineExpand 0.9s 0.1s cubic-bezier(0.22,1,0.36,1) both; }
        .check-draw { stroke-dasharray: 100; animation: checkDraw 0.6s 0.2s ease forwards; }
        .input-underline { transition: border-color 0.3s ease; }
        .btn-hover { transition: background 0.25s ease, color 0.25s ease, transform 0.15s ease; }
        .btn-hover:hover { transform: translateY(-1px); }
        .btn-hover:active { transform: translateY(0px); }
      `}</style>

      {/* Background texture */}
      <div
        className="mt-20 absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #d6c9a8 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full max-w-md">

        {/* Decorative top line */}
        <div className="mb-10 flex items-center gap-4 animate-fade-up">
          <div className="h-px bg-amber-600 line-expand flex-1" />
          <span className="font-body text-amber-600 text-xs tracking-[0.25em] uppercase">Account Recovery</span>
          <div className="h-px bg-amber-600 line-expand flex-1" />
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-2xl">

          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-10 animate-fade-up-delay">
                <h1 className="font-display text-4xl text-black leading-tight mb-3">
                  Forgot your<br /><em className="text-amber-500">password?</em>
                </h1>
                <p className="font-body text-stone-400 text-sm leading-relaxed font-light">
                  No need to worry. Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-8 animate-fade-up-delay2">
                <div>
                  <label className="font-body text-xs tracking-[0.2em] uppercase text-stone-500 block mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="you@example.com"
                    required  // ✅ FIX 7: Added HTML required attribute
                    className={`w-full bg-transparent border-b-2 pb-2 text-stone-800 font-body font-light text-base placeholder:text-stone-400 outline-none input-underline ${
                      focused ? "border-amber-500" : "border-stone-300"
                    }`}
                  />
                </div>

                {/* ✅ FIX 8: Show error message on the form (not just on success screen) */}
                {message && !submitted && (
                  <p className="font-body text-red-500 text-sm text-center">{message}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}  // ✅ FIX 9: Disable button while loading
                  className="w-full bg-amber-600 text-stone-950 font-body text-sm tracking-[0.15em] uppercase py-4 btn-hover hover:bg-amber-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? "Sending..." : "Send Reset Link"}  {/* ✅ FIX 10: Loading feedback */}
                </button>
              </form>

              {/* Back to login */}
              <div className="mt-8 pt-8 border-t border-stone-200 animate-fade-up-delay3">
                <p className="font-body text-stone-500 text-sm text-center font-light">
                  Remembered it?{" "}
                  <a
                    href="/login-account"
                    className="text-amber-500 hover:text-amber-400 transition-colors underline underline-offset-4"
                  >
                    Back to sign in
                  </a>
                </p>
              </div>
            </>
          ) : (
            navigate("/reset-password/:token")
          )}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-6 flex items-center justify-center gap-3 animate-fade-up-delay3">
          <div className="h-px w-8 bg-stone-400" />
          <span className="font-body text-stone-400 text-xs tracking-widest">✦</span>
          <div className="h-px w-8 bg-stone-400" />
        </div>

      </div>
    </div>
  );
}