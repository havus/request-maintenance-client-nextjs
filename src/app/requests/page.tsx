"use client"

import { RxPlus } from "react-icons/rx";
import MetricCard from "@comp/MetricCard";
import RequestCard from "@comp/RequestCard";
import { useRequestMaintenanceStore } from "@/app/_stores/RequestMaintenanceStore";
import { useRouter } from 'next/navigation'

export default function Request() {
  const router = useRouter();
  
  const {
    requests,
    openRequestsCount,
    urgentRequestsCount,
    averageTimeToResolve,
  } = useRequestMaintenanceStore();

  return (
    <div className="relative">
      <div className="flex w-[343px] gap-[20px] justify-center">
        <MetricCard name="Open Requests" value={openRequestsCount}/>
        <MetricCard name="Urgent Requests" value={urgentRequestsCount}/>
        <MetricCard name="Average time (days) to resolve" value={averageTimeToResolve}/>
      </div>

      <div className="w-[343px] mt-[-5px] pt-[20px] flex flex-col gap-[20px]">
        {requests.map((req, i) => (
          <RequestCard data={req} key={`request-${i}`} />
        ))}
      </div>

      <button
        className="rounded-full p-[11px] absolute bottom-[-67px] right-0 hover:cursor-pointer bg-[#36A388] hover:bg-[#4aac93] active:bg-[#30927A]"
        onClick={() => router.push('/requests/create')}
      >
        <RxPlus className="w-[26px] h-[26px] text-white" />
      </button>
    </div>
  )
}
