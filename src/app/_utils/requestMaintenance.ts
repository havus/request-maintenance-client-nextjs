import { Urgency, Status } from '@/app/_types/RequestMaintenance';

export function translateUrgency(key: Urgency | number): number | Urgency {
  const urgencyArray: Urgency[] = ["Urgent", "Non Urgent", "Emergency", "Less Urgent"];
  
  if (typeof key === "string") {
    return urgencyArray.indexOf(key);
  }

  return urgencyArray[key];
}

export function translateStatus(key: Status | number): number | Status {
  const statusArray: Status[] = ["Open", "Resolved"];

  if (typeof key === "string") {
    return statusArray.indexOf(key);
  }

  return statusArray[key];
}
