export function Footer() {
  return (
    <footer className="border-t-4 border-brand-text bg-white py-12 px-6 md:px-12 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-montserrat font-black text-3xl tracking-tighter">
          PLATEWISE
        </div>
        <p className="font-inter font-bold text-brand-text text-sm uppercase tracking-wide">
          "Personalized meal planning, made simple."
        </p>
      </div>
    </footer>
  );
}
