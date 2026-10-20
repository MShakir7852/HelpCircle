export default function CategoryCard({ category, onSelect }) {
  const Icon = category.icon
  return <button onClick={() => onSelect?.(category.name)} className="group surface focus-ring flex min-h-[154px] flex-col items-start rounded-2xl p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-[#b7e6ce] hover:shadow-lg">
    <span className={`grid h-11 w-11 place-items-center rounded-2xl ${category.tone} transition group-hover:scale-105`}><Icon size={21} strokeWidth={1.8}/></span>
    <span className="mt-4 font-display text-[15px] font-bold text-[#17342f]">{category.name}</span><span className="mt-1 text-xs leading-5 text-slate-500">{category.detail}</span>
  </button>
}
