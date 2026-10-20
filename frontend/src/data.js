import { Wrench, Zap, HeartPulse, GraduationCap, HandHeart, Laptop, Paintbrush, Truck } from 'lucide-react'

export const categories = [
  { name: 'Home repairs', detail: 'Plumbers, repairs & more', icon: Wrench, tone: 'bg-orange-50 text-orange-700' },
  { name: 'Electrical', detail: 'Safe, skilled electricians', icon: Zap, tone: 'bg-amber-50 text-amber-700' },
  { name: 'Health & blood', detail: 'Find voluntary support', icon: HeartPulse, tone: 'bg-rose-50 text-rose-700' },
  { name: 'Tutoring', detail: 'Learn from your community', icon: GraduationCap, tone: 'bg-violet-50 text-violet-700' },
  { name: 'Volunteering', detail: 'Lend a helping hand', icon: HandHeart, tone: 'bg-emerald-50 text-emerald-700' },
  { name: 'Tech support', detail: 'Devices, setup & guidance', icon: Laptop, tone: 'bg-sky-50 text-sky-700' },
  { name: 'Painting', detail: 'Refresh your space', icon: Paintbrush, tone: 'bg-pink-50 text-pink-700' },
  { name: 'Moving help', detail: 'Extra hands when needed', icon: Truck, tone: 'bg-teal-50 text-teal-700' },
]

export const requests = [
  { id: 1, category: 'Home repairs', title: 'Looking for help fixing a leaking kitchen tap', description: 'The tap has been dripping since yesterday. Looking for someone experienced who can help take a look.', name: 'Ayesha K.', initials: 'AK', location: 'Model Town', time: '18 min ago', urgency: 'Today', replies: 3, color: 'bg-orange-100 text-orange-700' },
  { id: 2, category: 'Tutoring', title: 'Math tutor needed for a grade 9 student', description: 'Need a patient tutor for algebra and exam preparation, preferably for two sessions each week.', name: 'Hassan R.', initials: 'HR', location: 'Johar Town', time: '42 min ago', urgency: 'This week', replies: 5, color: 'bg-violet-100 text-violet-700' },
  { id: 3, category: 'Volunteering', title: 'Volunteers needed for a neighbourhood clean-up', description: 'A few neighbours are organising a small park clean-up this weekend. Gloves and bags will be provided.', name: 'Sara M.', initials: 'SM', location: 'Garden Town', time: '1 hour ago', urgency: 'Weekend', replies: 8, color: 'bg-emerald-100 text-emerald-700' },
  { id: 4, category: 'Electrical', title: 'Need an electrician to check a ceiling fan', description: 'The fan has stopped working. Hoping to find a qualified local electrician to inspect it safely.', name: 'Bilal A.', initials: 'BA', location: 'Faisal Town', time: '2 hours ago', urgency: 'Flexible', replies: 2, color: 'bg-amber-100 text-amber-700' },
  { id: 5, category: 'Tech support', title: 'Help setting up a laptop for online classes', description: 'I need a little guidance installing a few study tools and setting up video calls.', name: 'Noor S.', initials: 'NS', location: 'Wapda Town', time: '3 hours ago', urgency: 'This week', replies: 4, color: 'bg-sky-100 text-sky-700' },
  { id: 6, category: 'Health & blood', title: 'Looking for voluntary O+ blood donors', description: 'A family is seeking information about willing donors. Please contact only if you can volunteer safely.', name: 'Community Care', initials: 'CC', location: 'Lahore', time: '4 hours ago', urgency: 'Important', replies: 6, color: 'bg-rose-100 text-rose-700' },
]
