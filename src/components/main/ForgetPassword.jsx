import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
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
      <div className="mt-20 absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #d6c9a8 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="relative w-full max-w-md">

        {/* Decorative top line */}
        <div className="mb-10 flex items-center gap-4 animate-fade-up">
          <div className="h-px bg-amber-600 line-expand flex-1" />
          <span className="font-body text-amber-600 text-xs tracking-[0.25em] uppercase">Account Recovery</span>
          <div className="h-px bg-amber-600 line-expand flex-1" />
        </div>

        <div className="bg-[#ffff] rounded-2xl p-10 shadow-2xl">

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
              <div className="space-y-8 animate-fade-up-delay2">
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
                    className={`w-full bg-transparent border-b-2 pb-2 text-stone-100 font-body font-light text-base placeholder:text-stone-700 outline-none input-underline ${focused ? "border-amber-500" : "border-stone-700"}`}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-amber-600 text-stone-950 font-body font-400 text-sm tracking-[0.15em] uppercase py-4 btn-hover hover:bg-amber-500"
                >
                  Send Reset Link
                </button>
              </div>

              {/* Back to login */}
              <div className="mt-8 pt-8 border-t border-stone-800 animate-fade-up-delay3">
                <p className="font-body text-stone-500 text-sm text-center font-light">
                  Remembered it?{" "}
                  <a href="/login-account" className="text-amber-500 hover:text-amber-400 transition-colors underline underline-offset-4">
                    Back to sign in
                  </a>
                </p>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-6 animate-fade-up">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-full border-2 border-amber-500 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4,14 11,21 24,7" className="check-draw" />
                  </svg>
                </div>
              </div>
              <h2 className="font-display text-3xl text-stone-100 mb-4">
                Check your <em className="text-amber-500">inbox</em>
              </h2>
              <p className="font-body text-stone-400 text-sm leading-relaxed font-light mb-8">
                We've sent a password reset link to<br />
                <span className="text-stone-200 mt-1 block">{email}</span>
              </p>
              <p className="font-body text-stone-600 text-xs leading-relaxed">
                Didn't receive it? Check your spam folder or{" "}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-amber-600 hover:text-amber-500 transition-colors underline underline-offset-2"
                >
                  try again
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-6 flex items-center justify-center gap-3 animate-fade-up-delay3">
          <div className="h-px w-8 bg-stone-700" />
          <span className="font-body text-stone-700 text-xs tracking-widest">✦</span>
          <div className="h-px w-8 bg-stone-700" />
        </div>

      </div>
    </div>
  );
}