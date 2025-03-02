"use client"

import { useEffect } from "react";
import { RxPlus } from "react-icons/rx";
import MetricCard from "@comp/MetricCard";
import RequestCard from "@comp/RequestCard";
import { useRequestMaintenanceStore } from "@/app/_stores/RequestMaintenanceStore";
import { useRouter } from 'next/navigation'
import { observer } from "mobx-react";
import { useLazyQuery, useSubscription } from '@apollo/client';
import { GET_TASKS } from "@/app/_graphql/queries";
import { RequestMaintenance, RequestMaintenanceResponse } from "@/app/_types/RequestMaintenance";
import { TASK_CREATED, TASK_UPDATED } from "@/app/_graphql/subscription";

function Request() {
  const router = useRouter();
  
  const {
    requests,
    replaceAllRequests,
    openRequestsCount,
    urgentRequestsCount,
    averageTimeToResolve,
  } = useRequestMaintenanceStore();

  const [getRequestData] = useLazyQuery(
    GET_TASKS,
    {
      variables: { offset: 0, limit: 100, filterBy: {} },
      fetchPolicy: 'no-cache',
    }
  );

  const { data: taskCreatedSubs } = useSubscription(TASK_CREATED);
  const { data: tasUpdatedSubs } = useSubscription(TASK_UPDATED);

  async function getAllRequests() {
    let response : { data: { tasks: RequestMaintenanceResponse[] } } = await getRequestData();

    replaceAllRequests(
      response.data.tasks.map((task: RequestMaintenanceResponse) => {
        return new RequestMaintenance({
          id: task.id,
          title: task.title,
          description: task.description,
          urgency: task.urgency,
          resolvedAt: task.resolvedAt ? new Date(task.resolvedAt) : null,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        });
      })
    );
  }

  useEffect(() => {
    getAllRequests();
  }, []);

  useEffect(() => {
    if (taskCreatedSubs || tasUpdatedSubs) {
      getAllRequests();
    }
  }, [taskCreatedSubs, tasUpdatedSubs]);


  return (
    <div className="relative w-[343px] md:w-[697px]">
      <div className="flex gap-[20px] justify-center">
        <MetricCard name="Open Requests" value={openRequestsCount}/>
        <MetricCard name="Urgent Requests" value={urgentRequestsCount}/>
        <MetricCard name="Average time (days) to resolve" value={averageTimeToResolve}/>
      </div>

      <div className="mt-[-5px] pt-[20px] md:pt-[24px] flex flex-col gap-[20px]">
        {requests.map((req, i) => (
          <RequestCard data={req} key={`request-${i}`} />
        ))}
      </div>

      <button
        className="rounded-full p-[11px] absolute bottom-[-67px] md:bottom-[-78px] right-0 hover:cursor-pointer bg-[#36A388] hover:bg-[#4aac93] active:bg-[#30927A]"
        onClick={() => router.push('/requests/create')}
      >
        <RxPlus className="w-[26px] h-[26px] text-white" />
      </button>
    </div>
  )
}

export default observer(Request);
