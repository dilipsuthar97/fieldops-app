import {
  STATUS_LABELS,
  WorkOrder,
  type WorkOrderStatus,
} from "@/api/entities/WorkOrder";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * "2026-08-22" -> "Due 22 Aug"
 */
const formatDueDate = (value?: string | null): string | null => {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return `Due ${date.getDate()} ${MONTHS[date.getMonth()]}`;
};

/**
 * "Due 22 Aug · Priya Raman"
 */
export const getMetaLine = (order: WorkOrder): string => {
  return [formatDueDate(order.dueAt), order.assignee?.name]
    .filter(Boolean)
    .join(" · ");
};

export const getStatusLabel = (status: WorkOrderStatus): string => {
  return STATUS_LABELS[status] ?? status;
};
