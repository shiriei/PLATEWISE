export function Header() {
  return (
    <header className="border-b-4 border-brand-text py-4 px-6 md:px-12 flex justify-between items-center bg-white sticky top-0 z-50">
      <div className="font-montserrat font-black text-2xl tracking-tighter">
        PLATEWISE
      </div>
      <nav className="hidden md:flex gap-8 font-inter font-bold text-sm tracking-wide">
        <a href="#how-it-works" className="hover:text-brand-red transition-colors uppercase">How it works</a>
        <a href="#my-plan" className="hover:text-brand-red transition-colors uppercase">My Plan</a>
      </nav>
      {/* Mobile Menu Icon */}
      <div className="md:hidden font-bold text-xl cursor-pointer">
        ☰
      </div>
    </header>
  );
}
