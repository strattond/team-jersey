import Jersey from "./Jersey";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectJerseyById, setEditing } from "../state/jerseys";
import { useDraggable } from "@dnd-kit/core";

interface DroppedJerseyProps {
  id: string;
  left: number;
  top: number;
  text?: string;
  appID: string;
}

export const DraggableJersey = ({ id, left, top, appID }: DroppedJerseyProps) => {
  const jersey = useAppSelector(selectJerseyById(appID));
  const dispatch = useAppDispatch();

  const handleSvgClick = () => { dispatch(setEditing({ editing: true, underEdit: appID } )); };
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: id, data: { id: appID } });
  // If we don't add left/top to the transform, then the SVG will be at -left,-top when we start dragging
  // But this throws a kink into the "over" detection
  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x + left}px, ${transform.y + top}px, 0)`
      : `translate3d(${left}px, ${top}px, 0)`,
    zIndex: isDragging ? 9999 : 'auto',
    position: (isDragging ? 'fixed' : 'absolute')
  };
  return (
    <div id={id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <Jersey onClick={handleSvgClick} number={jersey?.jersey} label={jersey?.label} />
    </div>
  );
};

