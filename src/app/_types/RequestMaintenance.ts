import { makeObservable } from "mobx";

export type Urgency = "Urgent" | "Non Urgent" | "Emergency" | "Less Urgent";
export type Status = "Open" | "Resolved";

export type FormState = {
  id?: string | null;
  title?: string | null;
  description?: string | null;
  status?: number | null;
  urgency?: number | null;
  resolvedAt?: string | null;
}

export type FormStateKeys = keyof FormState;

export type RequestMaintenanceResponse = {
  id: number;
  title: string;
  description: string;
  urgency: Urgency;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export class RequestMaintenance {
  id?: number;
  title: string;
  description: string;
  urgency: Urgency;
  resolvedAt?: Date | null;
  createdAt: Date;

  constructor(
    { id, title, description, urgency, resolvedAt, createdAt }:
      {
        id?: number; 
        title: string; 
        description?: string | "";
        urgency: Urgency;
        resolvedAt?: Date | null;
        createdAt: Date; 
        updatedAt: Date;
      }
  ) {
    this.id = id;
    this.title = title;
    this.urgency = urgency;
    this.description = description || "";
    this.resolvedAt = resolvedAt;
    this.createdAt = createdAt;

    makeObservable(this);
  }

  get status(): Status {
    return this.resolvedAt ? "Resolved" : "Open";
  }
}
