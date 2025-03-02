"use client"

import { makeAutoObservable } from "mobx";
import { ReactNode, createContext, useContext, useRef } from "react";
import { RequestMaintenance } from "@/app/_types/RequestMaintenance";

export class RequestMaintenanceStore {
  requests: RequestMaintenance[] = [] as RequestMaintenance[];

  constructor() {
    makeAutoObservable(this);
  }

  addRequest = (request: RequestMaintenance) => {
    this.requests.push(request);
  }
  replaceAllRequests = (requests: RequestMaintenance[]) => {
    this.requests = requests;
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

    return Math.round(totalResolveTime / resolvedRequests.length / (1000 * 60 * 60 * 24));
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
