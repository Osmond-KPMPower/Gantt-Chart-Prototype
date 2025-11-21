// src/components/GanttTimeline.tsx
import React from "react";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import "react-calendar-timeline/dist/style.css";

import { tasks as sampleTasks } from "../common/data";

type Task = (typeof sampleTasks)[number];

interface GanttTimelineProps {
  tasks: Task[];
  onExternalEventDrop: (eventId: string) => void;
}

export default function GanttTimeline({
  tasks,
  onExternalEventDrop,
}: GanttTimelineProps) {
  const groups = tasks.map((t) => ({
    id: t.id,
    title: t.text,
  }));

  const items = tasks.map((t) => ({
    id: t.id,
    group: t.id,
    title: t.text,
    start_time: moment(t.start).valueOf(),
    end_time: moment(t.start).add(t.duration, "hours").valueOf(),
  }));

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData("text/plain");
    if (eventId) {
      onExternalEventDrop(eventId);
    }
  };

  return (
    <div
      className="chart-card"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="chart-title">react-calendar-timeline</h2>

      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment("2025-12-06 07:00").valueOf()}
        defaultTimeEnd={moment("2025-12-06 18:00").valueOf()}
      />
    </div>
  );
}
