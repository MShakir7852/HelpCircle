import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HeartHandshake, Menu, X, ArrowUpRight } from 'lucide-react'

const links = [{ to: '/', label: 'Home' }, { to: '/explore', label: 'Explore help' }]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navClass = ({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-[#e5f6ec] text-[#126b58]' : 'text-slate-600 hover:bg-slate-100 hover:text-[#0b2825]'}`
  return <header className="sticky top-0 z-50 border-b border-[#e8ece7] bg-[#f7f8f4]/90 backdrop-blur-xl">
    <div className="container-shell flex h-[76px] items-center justify-between gap-5">
      <Link to="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0b2825] text-[#c9f7df]"><HeartHandshake size={22} strokeWidth={2.1} /></span>
        <span className="font-display text-[21px] font-extrabold tracking-tight text-[#0b2825]">help<span className="text-[#16836e]">circle</span><span className="ml-0.5 text-[#16836e]">.</span></span>
      </Link>
      <nav className="hidden items-center gap-1 md:flex">{links.map(link => <NavLink key={link.to} to={link.to} className={navClass}>{link.label}</NavLink>)}</nav>
      <div className="hidden items-center gap-2 md:flex">
        <Link to="/login" className="rounded-full px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-white">Log in</Link>
        <Link to="/create-request" className="inline-flex items-center gap-2 rounded-full bg-[#0b2825] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#16463d]">Ask for help <ArrowUpRight size={16} /></Link>
      </div>
      <button aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white md:hidden">{open ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    {open && <nav className="container-shell flex flex-col gap-2 border-t border-slate-200 py-4 md:hidden">{links.map(link => <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={navClass}>{link.label}</NavLink>)}<Link to="/login" onClick={() => setOpen(false)} className="rounded-full px-4 py-3 text-sm font-semibold">Log in</Link><Link to="/create-request" onClick={() => setOpen(false)} className="rounded-full bg-[#0b2825] px-4 py-3 text-center text-sm font-bold text-white">Ask for help</Link></nav>}
  </header>
}
