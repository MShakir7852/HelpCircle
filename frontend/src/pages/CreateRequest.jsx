import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, HeartHandshake, Info, MapPin, LocateFixed, LoaderCircle, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { categories } from '../data'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const initialForm = { title: '', category: '', serviceType: '', description: '', area: '', urgency: 'Today' }
const field = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#17342f] outline-none transition placeholder:text-slate-400 focus:border-[#16836e] focus:ring-4 focus:ring-[#16836e]/10'

export default function CreateRequest() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [location, setLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('idle')
  const [submitting, setSubmitting] = useState(false)

  const update = e => setForm(current => ({ ...current, [e.target.name]: e.target.value }))

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Your browser does not support location services.')
      setLocationStatus('error')
      return
    }
    setLocationStatus('loading')
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          type: 'Point',
          coordinates: [position.coords.longitude, position.coords.latitude],
          accuracy: Math.round(position.coords.accuracy),
        })
        setLocationStatus('success')
        toast.success('Current location captured successfully.')
      },
      error => {
        setLocationStatus('error')
        const message = error.code === 1
          ? 'Location permission denied. Allow location access in your browser and try again.'
          : error.code === 2
            ? 'Your location could not be determined. Try again or check your device location settings.'
            : 'Location request timed out. Please try again.'
        toast.error(message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 },
    )
  }

  const submit = async e => {
    e.preventDefault()
    if (!location) {
      toast.error('Please share your current location so we can find nearby service providers.')
      getLocation()
      return
    }
    setSubmitting(true)
    try {
      const response = await axios.post(`${API_URL}/requests`, {
        ...form,
        location: { type: 'Point', coordinates: location.coordinates },
      })
      const matches = response.data?.matches?.length
      toast.success(matches ? `Request created. ${matches} nearby provider(s) matched.` : 'Request created successfully. We will notify matching providers.')
      navigate('/explore')
    } catch (error) {
      const message = error.response?.data?.message || 'Could not submit the request. Make sure the HelpCircle backend and MongoDB are running.'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return <section className="container-shell py-10 sm:py-14">
    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0b2825]"><ArrowLeft size={16}/> Back</button>
    <div className="mx-auto mt-6 grid max-w-5xl gap-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-12">
      <aside className="h-fit rounded-3xl bg-[#0b2825] p-7 text-white sm:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c9f7df] text-[#0b2825]"><HeartHandshake size={24}/></span>
        <p className="mt-7 text-xs font-extrabold uppercase tracking-[.16em] text-[#baf1d1]">Help starts nearby</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-[-.045em]">The right help, closer to home.</h1>
        <p className="mt-4 text-sm leading-7 text-white/65">Share what you need and your current location. HelpCircle can match your request with nearby service providers who offer that service.</p>
        <div className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm text-white/75">
          <p className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold">1</span>Describe the service you need.</p>
          <p className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold">2</span>Allow access to your current location.</p>
          <p className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold">3</span>Nearby matching providers can respond.</p>
        </div>
        <div className="mt-7 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-5 text-white/70"><ShieldCheck size={18} className="shrink-0 text-[#baf1d1]"/><p>Your precise location is shared for service matching. Only submit requests you are comfortable sharing.</p></div>
      </aside>

      <div className="surface rounded-3xl p-6 sm:p-9">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#12312b]">Create a help request</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">We'll use your location to look for relevant nearby helpers.</p>
        <form onSubmit={submit} className="mt-7 space-y-5">
          <label className="block text-sm font-bold text-slate-700">Request title *<input required minLength={8} maxLength={100} name="title" value={form.title} onChange={update} placeholder="e.g. Need an AC technician to repair my AC" className={field}/></label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold text-slate-700">Category *<select required name="category" value={form.category} onChange={e => setForm(current => ({ ...current, category: e.target.value, serviceType: '' }))} className={field}><option value="">Choose category</option>{categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}</select></label>
            <label className="block text-sm font-bold text-slate-700">Specific service *<select required name="serviceType" value={form.serviceType} onChange={update} className={field}><option value="">Choose service</option>{(form.category === 'Home repairs' ? ['AC repair', 'Plumbing', 'Appliance repair', 'Carpentry', 'General handyman'] : form.category === 'Electrical' ? ['Electrician', 'Wiring repair', 'Fan repair', 'Electrical safety check'] : form.category === 'Tutoring' ? ['Math tutor', 'Science tutor', 'English tutor', 'Exam preparation'] : form.category === 'Tech support' ? ['Computer repair', 'Phone support', 'Wi-Fi / network setup'] : form.category === 'Health & blood' ? ['Voluntary blood donor', 'Community health support'] : form.category === 'Painting' ? ['Home painting', 'Wall repair'] : form.category === 'Moving help' ? ['Furniture moving', 'Packing help'] : form.category === 'Volunteering' ? ['Community volunteering', 'Errands / groceries'] : []).map(service => <option key={service} value={service}>{service}</option>)}</select></label>
          </div>
          <label className="block text-sm font-bold text-slate-700">Describe what you need *<textarea required minLength={20} maxLength={1200} rows={4} name="description" value={form.description} onChange={update} placeholder="For example: My AC is not cooling. I need a technician to inspect it..." className={`${field} resize-y`}/><span className="mt-1 block text-right text-xs font-normal text-slate-400">{form.description.length}/1200</span></label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold text-slate-700">Area / neighbourhood *<input required name="area" value={form.area} onChange={update} placeholder="e.g. Model Town" className={field}/></label>
            <label className="block text-sm font-bold text-slate-700">Urgency<select name="urgency" value={form.urgency} onChange={update} className={field}>{['Urgent', 'Today', 'This week', 'Weekend', 'Flexible'].map(x => <option key={x}>{x}</option>)}</select></label>
          </div>

          <div className="rounded-2xl border border-[#cde9dc] bg-[#f2faf5] p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#16836e]"><MapPin size={21}/></span>
              <div className="min-w-0 flex-1"><p className="font-bold text-[#17342f]">Your current location *</p><p className="mt-1 text-xs leading-5 text-[#55746a]">Allow browser location access so the backend can find service providers near you. Location access works on localhost or a secure HTTPS website.</p>
                {locationStatus === 'success' && <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-emerald-700"><CheckCircle2 size={15}/> Location captured (accuracy about {location.accuracy} m)</p>}
                {locationStatus === 'error' && <p className="mt-2 text-xs font-semibold text-red-600">Location not available. Check your browser permission and try again.</p>}
                <button type="button" onClick={getLocation} disabled={locationStatus === 'loading'} className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-[#b8dccb] bg-white px-4 py-2.5 text-xs font-bold text-[#146b56] transition hover:bg-[#e4f5eb] disabled:opacity-60">{locationStatus === 'loading' ? <><LoaderCircle size={15} className="animate-spin"/> Getting location...</> : <><LocateFixed size={15}/>{location ? 'Refresh current location' : 'Use my current location'}</>}</button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-xs leading-5 text-slate-500"><Info size={18} className="mt-0.5 shrink-0"/><p>Submitting sends your service category, request details and coordinates to the HelpCircle API for nearby matching. Don't include passwords or other sensitive information in your description.</p></div>
          <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b2825] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#16463d] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? <><LoaderCircle size={16} className="animate-spin"/> Sending request...</> : <>Find nearby helpers <ArrowRight size={16}/></>}</button>
          <p className="text-center text-xs text-slate-500">Already have an account? <Link to="/login" className="font-bold text-[#16765f]">Log in</Link></p>
        </form>
      </div>
    </div>
  </section>
}
