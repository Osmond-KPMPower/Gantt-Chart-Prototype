import type { IColumnConfig } from "@svar-ui/react-gantt";

export function getData() {
  return {
    tasks,
    links,
    scales,
    columns
  };
}

export const tasks = [
  {
    id: 1,
    open: true,
    start: new Date(2025, 11, 6, 8, 0), // Dec 6, 2023, 08:00
    duration: 4, // hours
    text: "React Gantt Widget",
    progress: 60,
    type: "summary"
  },
  {
    id: 2,
    parent: 1,
    start: new Date(2025, 11, 6, 8, 0), // 08:00
    duration: 2,
    text: "Lib-Gantt",
    progress: 80
  },
  {
    id: 3,
    parent: 1,
    start: new Date(2025, 11, 6, 10, 0), // 10:00
    duration: 2,
    text: "UI Layer",
    progress: 30
  },
  {
    id: 4,
    start: new Date(2025, 11, 6, 12, 0), // 12:00
    duration: 4,
    text: "Documentation",
    progress: 10,
    type: "summary"
  },
  {
    id: 5,
    parent: 4,
    start: new Date(2025, 11, 6, 12, 0), // 12:00
    duration: 1,
    text: "Overview",
    progress: 30
  },
  {
    id: 6,
    parent: 4,
    start: new Date(2025, 11, 6, 13, 0), // 13:00
    duration: 3,
    text: "API reference",
    progress: 0
  }
];

export const columns: IColumnConfig[] = [
  { id: "text", header: "Task name", flexgrow: 2 },
  {
    id: "start",
    header: "Start date",
    flexgrow: 1,
    align: "center",
  },
  {
    id: "duration",
    header: "Duration",
    align: "center",
    flexgrow: 1,
  },
  {
    id: "add-task",
    header: "",
    width: 50,
    align: "center",
  },
];

export const links = [
  { id: 1, source: 3, target: 4, type: "e2s" },
  { id: 2, source: 1, target: 2, type: "e2s" },
  { id: 21, source: 8, target: 1, type: "s2s" },
  { id: 22, source: 1, target: 6, type: "s2s" },
];

export const scales = [
  { unit: "day",  step: 1, format: "d MMM" },
  { unit: "hour", step: 1, format: "HH:mm" }

];