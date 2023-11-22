
const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-400 to-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1  className="text-2xl font-semibold text-white"> <a href="/">Task Manager</a></h1>
        <div>
          <a href="/" className="text-white hover:text-gray-200 px-3 py-2">Tracks</a>
          <a href="#" className="text-white hover:text-gray-200 px-3 py-2">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
