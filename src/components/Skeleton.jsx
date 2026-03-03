export default function Skeleton() {
  return (
    <div className="min-h-full pb-28">
      <div className="px-5 pt-6">
        {/* Header skeleton */}
        <div className="h-4 w-24 animate-pulse rounded bg-[#2A2A2A]" />
        <div className="mt-3 h-7 w-48 animate-pulse rounded bg-[#2A2A2A]" />
        <div className="mt-2 h-4 w-36 animate-pulse rounded bg-[#2A2A2A]" />
      </div>

      <div className="mt-6 flex flex-col gap-4 px-5">
        {/* Card skeletons */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-[#1E1E1E] p-5">
            <div className="h-4 w-32 animate-pulse rounded bg-[#2A2A2A]" />
            <div className="mt-3 h-3 w-full animate-pulse rounded bg-[#2A2A2A]" />
            <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-[#2A2A2A]" />
            <div className="mt-4 h-8 w-24 animate-pulse rounded-lg bg-[#2A2A2A]" />
          </div>
        ))}
      </div>
    </div>
  )
}
