import React,{useState} from "react"
import {Menu, X} from 'lucide-react'
export default function Navbar (){
     const [menuOpen, setMenuOpen] = useState(false);
    return(
        <div className="font-sans">
     <header className="absolute top-0 left-0 w-full text-white px-6 py-4 flex justify-between items-center z-50">

        <h1 className="text-2xl font-bold">crowdfund</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 px-15">
          {["About", "Discover", "Get Started"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-teal-500 transition duration-200 text-sm"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>



        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-white text-black flex flex-col items-center py-4 space-y-4 md:hidden shadow-md">
            {["About", "Discover", "Get Started",].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-teal-500 text-lg transition duration-200"
              >
                {item}
              </a>
            ))}
          </nav>
        )}

      </header>
 <section className="relative h-[60vh] flex items-center justify-center text-white text-center overflow-hidden">
  {/* Desktop Image */}
  <img
    src="/images/image-hero-desktop.jpg"
    alt="Hero Desktop"
    className="hidden md:block absolute inset-0 w-full h-full object-cover -z-10"
  />
  {/* Mobile Image */}
  <img
    src="/images/image-hero-mobile.jpg"
    alt="Hero Mobile"
    className="block md:hidden absolute inset-0 w-full h-full object-cover  -z-10"
  />

  
</section>

   </div>

    )
}