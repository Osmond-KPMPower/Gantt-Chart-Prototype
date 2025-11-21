// src/pages/PrototypeTabs.tsx
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import GanttSvar from "../components/GanttSvar";
import GanttTimeline from "../components/GanttTimeline";
import DraggableList, { type BacklogEvent } from "../components/DraggableList";


import { tasks as initialTasks } from "../common/data";

type Task = (typeof initialTasks)[number];

const initialBacklog: BacklogEvent[] = [
  { id: "ev-1", label: "Task 1", durationHours: 1.5, color: "#cf4343" }, // red
  { id: "ev-2", label: "Task 2", durationHours: 2,   color: "#cf4343" },
  { id: "ev-3", label: "Task 3", durationHours: 4,   color: "#cf4343" },
  { id: "ev-4", label: "Task 4", durationHours: 6,   color: "#cf4343" },
];

export default function PrototypeTabs() {
  const [backlog, setBacklog] = useState<BacklogEvent[]>(initialBacklog);

  // each view has its own copy of tasks so you can compare behaviour
  const [svarTasks, setSvarTasks] = useState<Task[]>(initialTasks);
  const [timelineTasks, setTimelineTasks] = useState<Task[]>(initialTasks);

  const addTaskFromEvent = (
    eventId: string,
    target: "svar" | "timeline"
  ) => {
    const template = backlog.find((e) => e.id === eventId);
    if (!template) return;

    const makeNewTask = (existing: Task[]): Task => {
      const maxId = existing.reduce(
        (max, t) => Math.max(max, Number(t.id)),
        0
      );

      // naive “slot” logic: put new task 30 minutes after the last one ends
      const lastEndMs =
        existing.length > 0
          ? Math.max(
              ...existing.map((t) => {
                const start = new Date(t.start).getTime();
                const durMs = t.duration * 60 * 60 * 1000;
                return start + durMs;
              })
            )
          : new Date(2025, 11, 6, 8, 0).getTime(); // same base date as your sample

      const start = new Date(lastEndMs + 30 * 60 * 1000); // +30 mins

      return {
        id: maxId + 1,
        text: template.label,
        start,
        duration: template.durationHours,
        progress: 0,
      } as Task;
    };

    if (target === "svar") {
      setSvarTasks((prev) => [...prev, makeNewTask(prev)]);
    } else {
      setTimelineTasks((prev) => [...prev, makeNewTask(prev)]);
    }
  };

  const handleDropOnSvar = (eventId: string) =>
    addTaskFromEvent(eventId, "svar");

  const handleDropOnTimeline = (eventId: string) =>
    addTaskFromEvent(eventId, "timeline");

  return (
    <div className="app-shell">
      <h1 className="app-title">Gantt Comparison Prototype</h1>

      <Tabs>
        <TabList>
          <Tab>SVAR Gantt</Tab>
          <Tab>react-calendar-timeline</Tab>
        </TabList>

        {/* Tab 1: SVAR Gantt + draggable list */}
        <TabPanel>
          <div className="tab-layout">
            <div className="chart-panel">
              <GanttSvar
                tasks={svarTasks}
                onExternalEventDrop={handleDropOnSvar}
              />
            </div>
            <div className="sidebar-panel">
              <DraggableList
                events={backlog}
                onReorder={setBacklog}
              />
            </div>
          </div>
        </TabPanel>

        {/* Tab 2: Timeline + draggable list */}
        <TabPanel>
          <div className="tab-layout">
            <div className="chart-panel">
              <GanttTimeline
                tasks={timelineTasks}
                onExternalEventDrop={handleDropOnTimeline}
              />
            </div>
            <div className="sidebar-panel">
              <DraggableList
                events={backlog}
                onReorder={setBacklog}
              />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
