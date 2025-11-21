// src/components/DraggableList.tsx
import { useEffect, useRef } from "react";
import Sortable, { type SortableEvent } from "sortablejs";

export interface BacklogEvent {
  id: string;
  label: string;
  durationHours: number;
  color: string;
}

interface DraggableListProps {
  events: BacklogEvent[];
  onReorder: (newOrder: BacklogEvent[]) => void;
}

export default function DraggableList({
  events,
  onReorder,
}: DraggableListProps) {
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;

    const sortable = Sortable.create(listRef.current, {
      animation: 150,
      ghostClass: "event-ghost",
      chosenClass: "event-chosen",
      onEnd: (evt: SortableEvent) => {
        if (evt.oldIndex == null || evt.newIndex == null) return;

        const newEvents = [...events];
        const [moved] = newEvents.splice(evt.oldIndex, 1);
        newEvents.splice(evt.newIndex, 0, moved);
        onReorder(newEvents);
      },
    });

    return () => sortable.destroy();
  }, [events, onReorder]);

  return (
    <div className="sidebar-card">
      <h3 className="sidebar-title">Event backlog</h3>
      <p className="sidebar-subtitle">
        Drag a card onto a chart to schedule it.
      </p>

      <ul ref={listRef} className="event-list">
        {events.map((event) => (
          <li
            key={event.id}
            className="event-card"
            style={{ backgroundColor: event.color }}
            draggable
            onDragStart={(e) => {
              // used by Gantt / Timeline drop handlers
              e.dataTransfer.setData("text/plain", event.id);
            }}
          >
            <div className="event-card-title">{event.label}</div>
            <div className="event-card-sub">
              {event.durationHours} hour
              {event.durationHours !== 1 ? "s" : ""}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
