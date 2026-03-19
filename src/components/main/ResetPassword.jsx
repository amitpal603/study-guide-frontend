import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loader from "./common/Loader";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  
  
  const {token} = useParams()
  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }
    
    if (!token) {
      setIsError(true);
      setMessage("Reset token is missing. Please use the link from your email.");
      return;
    }

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/auth/user/reset-password/${token}`,
        { password : newPassword }
      );
      setMessage(res.data?.message || "Password reset successfully!");
      setSubmitted(true);
    } catch (error) {
      setIsError(true);
      setMessage(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F67280] flex items-center justify-center px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;600&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body   { font-family: 'Lato', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineExpand {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes barGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .afu  { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .afu1 { animation: fadeUp 0.7s 0.12s cubic-bezier(0.22,1,0.36,1) both; }
        .afu2 { animation: fadeUp 0.7s 0.24s cubic-bezier(0.22,1,0.36,1) both; }
        .afu3 { animation: fadeUp 0.7s 0.36s cubic-bezier(0.22,1,0.36,1) both; }
        .line-expand { animation: lineExpand 0.9s 0.1s cubic-bezier(0.22,1,0.36,1) both; }
        .check-draw  { stroke-dasharray: 100; animation: checkDraw 0.6s 0.2s ease forwards; }

        .strength-bar { transform-origin: left; animation: barGrow 0.35s ease both; }
        .input-line   { transition: border-color 0.3s ease; }
        .btn-hover    { transition: background 0.25s, transform 0.15s; }
        .btn-hover:hover  { transform: translateY(-1px); }
        .btn-hover:active { transform: translateY(0); }

        .eye-btn { background: none; border: none; cursor: pointer; padding: 0; color: #a8a29e; transition: color 0.2s; }
        .eye-btn:hover { color: #d97706; }
      `}</style>

      {/* dot-grid texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #d6c9a8 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full max-w-md mt-16">

       

        
        <div className="bg-white rounded-2xl p-10 shadow-2xl">

          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-10 afu1">
                <h1 className="font-display text-4xl text-black leading-tight mb-3">
                  Create a new<br />
                  <em className="text-amber-500">password</em>
                </h1>
                
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-7 afu2">

                {/* ── New Password ── */}
                <div>
                  <label className="font-body text-xs tracking-[0.2em] uppercase text-stone-500 block mb-3">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onFocus={() => setFocusedField("new")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter new password"
                      required
                      className={`w-full bg-transparent border-b-2 pb-2 pr-8 text-stone-800 font-body font-light text-base placeholder:text-stone-300 outline-none input-line ${
                        focusedField === "new"
                          ? "border-amber-500"
                          : "border-stone-200"
                      }`}
                    />
                    {/* show / hide toggle */}
                    <button
                      type="button"
                      className="eye-btn absolute right-0 top-1"
                      onClick={() => setShowNew((p) => !p)}
                      tabIndex={-1}
                    >
                      {showNew ? (
                        /* eye-off */
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        /* eye */
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
</div>
                {/* ── Confirm Password ── */}
                <div>
                  <label className="font-body text-xs tracking-[0.2em] uppercase text-stone-500 block mb-3">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocusedField("confirm")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Re-enter your password"
                      required
                      className={`w-full bg-transparent border-b-2 pb-2 pr-8 font-body font-light text-base placeholder:text-stone-300 outline-none input-line ${
                        passwordsMismatch
                          ? "border-red-400 text-red-500"
                          : passwordsMatch
                          ? "border-green-400 text-stone-800"
                          : focusedField === "confirm"
                          ? "border-amber-500 text-stone-800"
                          : "border-stone-200 text-stone-800"
                      }`}
                    />
                    <button
                      type="button"
                      className="eye-btn absolute right-0 top-1"
                      onClick={() => setShowConfirm((p) => !p)}
                      tabIndex={-1}
                    >
                      {showConfirm ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Match / mismatch hint */}
                  {passwordsMismatch && (
                    <p className="font-body text-xs text-red-400 mt-2">
                      Passwords do not match
                    </p>
                  )}
                  {passwordsMatch && (
                    <p className="font-body text-xs text-green-500 mt-2">
                      ✓ Passwords match
                    </p>
                  )}
                </div>

               

                {/* Global error */}
                {message && isError && (
                  <p className="font-body text-red-400 text-sm text-center">
                    {message}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || passwordsMismatch}
                  className="w-full bg-amber-600 text-stone-950 font-body text-sm tracking-[0.15em] uppercase py-4 btn-hover hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? <Loader/> : "Reset Password"}
                </button>
              </form>

              {/* Back link */}
              <div className="mt-8 pt-8 border-t border-stone-100 afu3">
                <p className="font-body text-stone-400 text-sm text-center font-light">
                  Remember your password?{" "}
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
            /* ── Success state ── */
            <div className="text-center py-6 afu">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-full border-2 border-amber-500 flex items-center justify-center">
                  <svg
                    width="28" height="28" viewBox="0 0 28 28"
                    fill="none" stroke="#d97706"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="4,14 11,21 24,7" className="check-draw" />
                  </svg>
                </div>
              </div>

              <h2 className="font-display text-3xl text-stone-800 mb-4">
                Password <em className="text-amber-500">updated!</em>
              </h2>
              <p className="font-body text-stone-400 text-sm leading-relaxed font-light mb-8">
                Your password has been reset successfully.<br />
                You can now sign in with your new password.
              </p>

              {message && (
                <p className="font-body text-amber-600 text-sm mb-6">{message}</p>
              )}

              <button
                onClick={() => navigate("/login-account")}
                className="w-full bg-amber-600 text-stone-950 font-body text-sm tracking-[0.15em] uppercase py-4 btn-hover hover:bg-amber-500"
              >
                Go to Sign In
              </button>
            </div>
          )}
        </div>

        {/* bottom rule */}
        <div className="mt-6 flex items-center justify-center gap-3 afu3">
          <div className="h-px w-8 bg-stone-400 opacity-40" />
          <span className="font-body text-stone-400 text-xs tracking-widest opacity-60">✦</span>
          <div className="h-px w-8 bg-stone-400 opacity-40" />
        </div>
      </div>
    </div>
  );
}