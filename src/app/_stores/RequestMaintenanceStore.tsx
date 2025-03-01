"use client"

import { makeAutoObservable } from "mobx";
import { RequestMaintenance } from "@/app/_types/RequestMaintenance";
import { ReactNode, createContext, useContext, useRef } from "react";

export class RequestMaintenanceStore {
  requests: RequestMaintenance[] = [] as RequestMaintenance[];

  constructor() {
    this.fetchAllRequests();
    makeAutoObservable(this);
  }

  addRequest = (request: RequestMaintenance) => {
    this.requests.push(request);
  }

  fetchAllRequests = () => {
    this.requests = [
      new RequestMaintenance({ id: 1, title: "Front Door Lock broken", urgency: "Urgent", createdAt: new Date() }),
      new RequestMaintenance({ id: 2, title: "Tile Cracked", urgency: "Non Urgent", createdAt: new Date() }),
      new RequestMaintenance({ id: 3, title: "Water Pipe Leaking", urgency: "Emergency", createdAt: new Date() }),
    ]
  }

  get openRequestsCount() {
    return this.requests.filter((request) => request.status === "Open").length;
  }

  get urgentRequestsCount() {
    return this.requests.filter((request) => request.urgency === "Urgent").length;
  }

  get averageTimeToResolve() {
    const resolvedRequests = this.requests.filter((request) => request.resolvedAt);
    if (resolvedRequests.length === 0) return 0;
  
    const totalResolveTime = resolvedRequests.reduce((acc, request) => {
      if (request.resolvedAt) {
        return acc + (request.resolvedAt.getTime() - request.createdAt.getTime());
      }
      return acc;
    }, 0);
  
    return totalResolveTime / resolvedRequests.length / (1000 * 60 * 60 * 24);
  }  
}

const RequestMaintenanceContext = createContext<RequestMaintenanceStore>(
  null as unknown as RequestMaintenanceStore
);

export const useRequestMaintenanceStore = () => {
  const context = useContext(RequestMaintenanceContext);
  if (!context) {
    throw new Error("useRequestMaintenanceStore must be used within a RequestMaintenanceProvider");
  }
  return context;
};

type Props = {
  children: ReactNode;
};

export const RequestMaintenanceProvider = ({ children }: Props) => {
  const store = useRef(new RequestMaintenanceStore());

  return (
    <RequestMaintenanceContext.Provider value={store.current}>
      {children}
    </RequestMaintenanceContext.Provider>
  );
};
