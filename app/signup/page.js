import Link from "next/link";

export const metadata = {
  title: "Sign Up | Inventra ERP",
  description: "Create an Inventra ERP account to manage your enterprise operations from a modern unified platform.",
};

export default function SignupPage() {
  return (
    <main className="relative min-h-screen bg-[#f4f6fb] text-[#0a0d14] overflow-hidden px-6 py-10 md:px-10 lg:px-16">
      <div className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(79,110,247,0.14)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(14,196,168,0.10)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1180px] mx-auto min-h-[calc(100vh-5rem)] flex items-center">
        <section className="grid w-full lg:grid-cols-[1.05fr_0.95fr] gap-8 xl:gap-12 items-center">
          <div className="max-w-[560px]">
            <Link href="/" className="inline-flex items-center gap-2 font-['Syne',sans-serif] font-extrabold text-[22px] tracking-tight text-[#0a0d14] mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4f6ef7]" />
              Inventra
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#4f6ef7]/20 bg-[#4f6ef7]/10 px-3 py-1 text-xs font-semibold text-[#4f6ef7] mb-6">
              Start your team
            </div>
            <h1 className="font-['Poppins',sans-serif] text-[clamp(42px,5vw,64px)] font-bold leading-[1.05] tracking-tighter mb-6">
              Build your
              <br />
              <span className="text-[#4f6ef7]">Inventra workspace</span>
            </h1>
            <p className="text-[#6b7280] text-lg leading-relaxed max-w-[520px]">
              Create an account to bring inventory, finance, sales, and reporting together in one platform.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-10 max-w-[520px]">
              <div className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white/80 p-4 shadow-[0_10px_30px_rgba(10,13,20,0.05)]">
                <div className="font-['Syne',sans-serif] text-3xl font-extrabold text-[#0a0d14]">5K+</div>
                <div className="text-xs text-[#6b7280] mt-1">Enterprises</div>
              </div>
              <div className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white/80 p-4 shadow-[0_10px_30px_rgba(10,13,20,0.05)]">
                <div className="font-['Syne',sans-serif] text-3xl font-extrabold text-[#0a0d14]">180+</div>
                <div className="text-xs text-[#6b7280] mt-1">Integrations</div>
              </div>
              <div className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white/80 p-4 shadow-[0_10px_30px_rgba(10,13,20,0.05)]">
                <div className="font-['Syne',sans-serif] text-3xl font-extrabold text-[#0a0d14]">99.9%</div>
                <div className="text-xs text-[#6b7280] mt-1">Uptime</div>
              </div>
            </div>

            <p className="mt-8 text-xs text-[#6b7280]">Fast setup for growing teams and modern operations.</p>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-[520px]">
              <div className="bg-white/90 backdrop-blur-xl border border-[rgba(0,0,0,0.07)] rounded-[28px] shadow-[0_24px_80px_rgba(10,13,20,0.10)] p-8 md:p-10">
              <div className="mb-8">
                <div className="text-[#4f6ef7] text-xs font-bold tracking-[0.24em] uppercase mb-3">Create Account</div>
                <h2 className="font-['Poppins',sans-serif] text-[clamp(28px,3.2vw,42px)] font-bold tracking-tight text-[#0a0d14] mb-3">
                  Get started with Inventra
                </h2>
                <p className="text-[#6b7280] leading-relaxed">
                  Create your account and start managing your business in minutes.
                </p>
              </div>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm font-semibold text-[#2e3347] mb-2">First Name</span>
                    <input
                      type="text"
                      placeholder="Jane"
                      className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-[#2e3347] mb-2">Last Name</span>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="block text-sm font-semibold text-[#2e3347] mb-2">Work Email</span>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-semibold text-[#2e3347] mb-2">Company Name</span>
                  <input
                    type="text"
                    placeholder="Inventra Holdings"
                    className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
                  />
                </label>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm font-semibold text-[#2e3347] mb-2">Password</span>
                    <input
                      type="password"
                      placeholder="Create a password"
                      className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-[#2e3347] mb-2">Confirm Password</span>
                    <input
                      type="password"
                      placeholder="Repeat password"
                      className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
                    />
                  </label>
                </div>

                <label className="flex items-start gap-3 text-sm text-[#6b7280]">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-[rgba(0,0,0,0.15)] accent-[#4f6ef7]" />
                  <span>
                    I agree to the <a href="#" className="font-medium text-[#4f6ef7] hover:text-[#3d5ce6] transition-colors">Terms</a> and <a href="#" className="font-medium text-[#4f6ef7] hover:text-[#3d5ce6] transition-colors">Privacy Policy</a>.
                  </span>
                </label>

                <button className="cursor-pointer w-full rounded-2xl bg-[#4f6ef7] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/30 transition-all hover:-translate-y-0.5 hover:bg-[#3d5ce6]">
                  Create Account
                </button>
              </form>

              <div className="mt-8 flex items-center gap-3 text-sm text-[#6b7280]">
                <span className="h-px flex-1 bg-[rgba(0,0,0,0.08)]" />
                <span>Already have an account?</span>
                <span className="h-px flex-1 bg-[rgba(0,0,0,0.08)]" />
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 text-sm">
                <span className="text-[#6b7280]">Return to the sign-in page.</span>
                <Link href="/login" className="font-semibold text-[#0a0d14] hover:text-[#4f6ef7] transition-colors">
                  Sign in
                </Link>
              </div>
            </div>
              <div className="mt-6 flex justify-center">
                <Link href="/" className="text-sm text-[#6b7280] hover:text-[#4f6ef7] transition-colors">
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
