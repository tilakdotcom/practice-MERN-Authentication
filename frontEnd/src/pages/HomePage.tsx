export default function HomePage() {
  return (
    <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center">
      <header className="bg-green-600 w-full py-4 shadow-md">
        <h1 className="text-white text-3xl text-center">Welcome to the Home Page</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center">
        <p className="text-white text-lg mb-4">This is a sample home page using Tailwind CSS.</p>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
          Get Started
        </button>
      </main>
      <footer className="bg-green-800 w-full py-4 mt-4">
        <p className="text-white text-center">© 2023 Your Company</p>
      </footer>
    </div>
  );
}