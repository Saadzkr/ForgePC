export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-accent-gold/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative flex items-baseline gap-1">
            <span className="logo-text text-4xl sm:text-5xl text-white">Forge</span>
            <span className="logo-dot inline-block mx-0.5" />
            <span className="logo-text text-4xl sm:text-5xl text-white">PC</span>
          </div>
        </div>

        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-accent-gold/60 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-accent-gold/60 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-accent-gold/60 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
