export interface MetricCardProps {
  name: string;
  value: number;
}

export default function MetricCard({ name, value }: MetricCardProps) {
  return (
    <div className="w-[90px] h-[90px] flex flex-col items-center bg-white py-[15px] px-[6px] rounded-[10px] drop-shadow-[0_0px_14px_rgba(0,0,0,0.06)]">
      <p className="font-medium text-[36px] leading-none text-center text-[#36A388]">
        {value}
      </p>

      <p className="grow text-[9px] grow place-content-center leading-3 text-center tracking-[0.14px]">
        {name}
      </p>
    </div>
  )
}
