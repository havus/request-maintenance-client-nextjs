import { makeObservable } from "mobx";

export type Urgency = "Urgent" | "Non Urgent" | "Emergency" | "Less Urgent";
type Status = "Open" | "Resolved";

export class RequestMaintenance {
  id: number;
  title: string;
  urgency: Urgency;
  resolvedAt?: Date | null;
  createdAt: Date;
  status: Status;

  constructor(id: number, title: string, urgency: Urgency, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.urgency = urgency;
    this.createdAt = createdAt;
    this.status = "Open";

    makeObservable(this);
  }

  resolveRequest() {
    this.resolvedAt = new Date();
    this.status = "Resolved";
  }
}
