

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/">Tracks</a></li>
          </ul>
        </div>
        <a className="flex-0 btn btn-ghost px-2" href="/">
          <div className="font-title inline-flex text-lg md:text-2xl">
            OnBoardingTool
          </div>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Tracks</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-outline btn-secondary">Login</a>
      </div>
  </div>
  );
};

export default Navbar;
