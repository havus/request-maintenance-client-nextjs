import { formatDate } from '@utils/dateUtils';
import { RequestMaintenance, Urgency } from "@/app/_types/RequestMaintenance";

interface RequestCardProps {
  data: RequestMaintenance
}

export default function RequestCard({ data }: RequestCardProps) {
  const urgencyIcons: Record<Urgency, string> = {
    "Urgent": "⚡",
    "Non Urgent": "🙂",
    "Emergency": "🔥",
    "Less Urgent": "🔨",
  }
  const urgencyColor: Record<Urgency, string> = {
    "Urgent": "text-[#E3903F]",
    "Non Urgent": "text-[#24BF5F]",
    "Emergency": "text-[#D74B4B]",
    "Less Urgent": "text-[#157AD8]",
  }
  const urgencyClassNames = [
    "text-[14px] leading-[20px]",
    (urgencyColor[data.urgency] && urgencyColor[data.urgency]),
  ].join(' ')

  return (
    <div className="w-full flex flex-col gap-[10px] bg-white p-[16px] rounded-[12px] drop-shadow-[0_8px_32px_rgba(110,113,145,0.12)]">
      <div className="flex justify-between">
        <p className="text-[#404040] font-medium text-[14px] leading-[20px]">{data.title}</p>
        <p className="text-[#A1AFC3] text-[12px] leading-[20px]">{formatDate(data.createdAt)}</p>
      </div>

      <div className="flex justify-between">
        <p className={urgencyClassNames}>
          {urgencyIcons[data.urgency]} {data.urgency}
        </p>

          {data.resolvedAt ? (
            <div className='rounded-full bg-[#A1AFC3] py-[3px] px-[8px]'>
              <p className="text-[#FFF] text-[12px]">Resolved</p> 
            </div>
          ) : (
            <button className='rounded-full bg-[#36A388] py-[3px] px-[8px] text-[#FFF] text-[12px] hover:cursor-pointer hover:bg-[#4aac93] active:bg-[#30927A]'>
              Mark as Resolved
            </button>
          )}
      </div>
    </div>
  )
}
