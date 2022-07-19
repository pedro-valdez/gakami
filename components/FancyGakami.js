export default function FancyGakami() {
  return (
    <span className={`relative 
    before:bg-red-500 before:w-full before:h-full before:absolute
    before:z-[-10] before:-skew-x-3 before:-skew-y-3
    before:-translate-y-2
    after:bg-white after:w-full after:h-full after:absolute after:left-0
    after:z-[-20] after:-skew-x-6 after:-skew-y-6
    after:-translate-y-2
      `}>
      <span className="px-4 font-black tracking-tighter">
        gakami
      </span>
    </span>
  )
}
