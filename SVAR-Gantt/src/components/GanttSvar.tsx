// src/components/GanttSvar.tsx
import React from "react";
import { Gantt, Willow } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";

import { tasks as sampleTasks, links, scales, columns } from "../common/data";

type Task = (typeof sampleTasks)[number];

interface GanttSvarProps {
  tasks: Task[];
  onExternalEventDrop: (eventId: string) => void;
}

export default function GanttSvar({
  tasks,
  onExternalEventDrop,
}: GanttSvarProps) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // required so drop will fire
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData("text/plain");
    if (eventId) {
      onExternalEventDrop(eventId);
    }
  };

  return (
    <Willow>
      <div
        className="chart-card"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h2 className="chart-title">SVAR Gantt</h2>

        <Gantt
          tasks={tasks}
          links={links}
          scales={scales}
          columns={columns}
          durationUnit="hour"
          lengthUnit="hour"
        />
      </div>
    </Willow>
  );
}

