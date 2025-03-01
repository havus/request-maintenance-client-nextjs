import { makeObservable } from "mobx";

export type Urgency = "Urgent" | "Non Urgent" | "Emergency" | "Less Urgent";
export type Status = "Open" | "Resolved";

export type FormState = {
  title: string;
  description: string;
  urgency?: number | null;
  status?: number | null;
}

export type FormStateKeys = keyof FormState;

export class RequestMaintenance {
  id?: number;
  title: string;
  description: string;
  urgency: Urgency;
  resolvedAt?: Date | null;
  createdAt: Date;

  constructor(
    { id, title, description, urgency, createdAt }:
      {
        id?: number; 
        title: string; 
        description?: string | "";
        urgency: Urgency;
        createdAt: Date; 
      }
  ) {
    this.id = id;
    this.title = title;
    this.urgency = urgency;
    this.description = description || "";
    this.createdAt = createdAt;

    makeObservable(this);
  }

  resolveRequest() {
    this.resolvedAt = new Date();
    // this.status = "Resolved";
  }

  get status() {
    return this.resolvedAt ? "Resolved" : "Open";
  }
}
