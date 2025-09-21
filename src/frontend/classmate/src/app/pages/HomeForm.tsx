import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-gray-800 bg-[#f5f5f6]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-10 bg-[#f5f5f6]">
        <h1 className="text-8xl font-bold mb-6">
          Welcome to <span className="text-[#349495]">ClassMate</span>
        </h1>
        <p className="text-2xl max-w-xl mb-8">A modern tool for educators to manage student information efficiently and securely.</p>
        <div className="space-x-4">
          <button
            onClick={() => router.push("/auth/register")}
            className="bg-[#349495] text-white text-2xl p-3 rounded hover:bg-[#287273] transition cursor-pointer"
          >
            Get Started with ClassMate
          </button>
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-[#349495] text-white text-2xl p-3 rounded hover:bg-[#287273] transition cursor-pointer"
          >
            Login
          </button>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-6 md:px-20 py-7 bg-[#f5f5f6] text-center">
        <h2 className="text-4xl font-semibold mb-4">What is ClassMate?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          ClassMate is an all-in-one platform for educational institutions to manage educator and student data. Built with simplicity,
          security, and productivity in mind — so you can focus on what really matters: education.
        </p>
      </section>
    </main>
  );
};

export default HomePage;
