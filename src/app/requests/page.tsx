"use client"

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
    </div>
  )
}
