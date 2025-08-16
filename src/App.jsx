import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Calculator, Images } from 'lucide-react'
import GalleryCarousel from './components/GalleryCarousel.jsx'
import Estimator from './components/Estimator.jsx'

function rupee(n){ return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n||0) }

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-teal-400 text-xl font-semibold">Hindustan Steel & Fabrication</span>
            <span className="text-xs px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-400">SS • MS • Fabrication</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#designs" className="hover:text-white">Designs</a>
            <a href="#gallery" className="hover:text-white">Gallery</a>
            <a href="#estimate" className="hover:text-white">Estimate</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <a href="https://wa.me/919515229436" className="text-sm px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500">WhatsApp</a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="text-4xl md:text-5xl font-semibold leading-tight">
              Premium <span className="text-teal-400">SS</span> & Steel Fabrication
            </motion.h1>
            <p className="mt-3 text-zinc-400 max-w-xl">
              Fabrication grills, staircases, SS railings & balconies. Transparent pricing with instant estimate.
            </p>
            <div className="mt-2 text-xs text-zinc-400">
              Rates: ₹1,500 / running ft (SS 202) · ₹2,200 / running ft (SS 304) · ₹1,100 / sq.ft (any grade). Gauges: 16 / 18 / 20.
            </div>
            <div className="mt-6 flex gap-3">
              <a href="#estimate" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500">
                <Calculator className="w-5 h-5"/> Get Instant Estimate
              </a>
              <a href="#gallery" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-zinc-700 hover:border-zinc-600">
                <Images className="w-5 h-5"/> Browse Gallery
              </a>
            </div>
          </div>
          <div className="rounded-3xl p-1 bg-gradient-to-tr from-zinc-800 via-zinc-700 to-zinc-900 shadow-2xl">
            <div className="bg-zinc-900/70 rounded-2xl p-6 border border-zinc-700">
              <ul className="space-y-2 text-sm text-zinc-300">
                {['On-time delivery','Skilled fabricators','Safety-first on site'].map((t,i)=>(<li key={i}>• {t}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {['Fabrication Grill','SS Railings','Balcony Work'].map((s,i)=>(
              <div key={i} className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-5">{s}
                <p className="text-sm text-zinc-400 mt-2">High-quality {s.toLowerCase()} with precision finishing.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Templates */}
      <section id="designs" className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">Design Templates</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {['Stair','Balcony','SS Gate'].map((t,i)=>(
              <div key={i} className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-5">
                <div className="font-medium">{t} Designs</div>
                <div className="text-xs text-zinc-400 mt-1">Multiple patterns & finishes</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      <section id="gallery" className="py-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Project Gallery (Auto-Scroll)</h2>
          <GalleryCarousel />
        </div>
      </section>

      {/* Estimate */}
      <section id="estimate" className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold">Instant Estimate</h2>
            <div className="text-sm text-zinc-400 mt-1">Running ft / Sq.ft options</div>
            <Estimator />
          </div>
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-5">
            <h3 className="font-medium">Contact</h3>
            <div className="mt-3 space-y-2 text-sm text-zinc-300">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-teal-400"/> +91 95152 29436</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-teal-400"/> hindustansteelfabrication@gmail.com</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-teal-400"/> Dawood Khan, Nagasandra, Bengaluru, Karnataka</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-10 border-t border-zinc-800 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} Hindustan Steel & Fabrication.
      </footer>
    </div>
  )
}
