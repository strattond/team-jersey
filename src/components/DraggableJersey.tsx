import { useState } from "react";
import Jersey from "./Jersey";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectJerseyById, updateDroppedImage } from "../state/images";
import { useDraggable } from "@dnd-kit/core";

interface DroppedImageProps {
  id: string;
  left: number;
  top: number;
  text?: string;
  appID: string;
}

export const DraggableJersey = ({ id, left, top, appID }: DroppedImageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const jersey = useAppSelector(selectJerseyById(appID));
  const dispatch = useAppDispatch();

  const handleBlur = () => { setIsEditing(false); };
  const handleSvgClick = () => { setIsEditing(true); };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updates = { jersey: event.target.value }
    dispatch(updateDroppedImage({ id: appID, updates }));
  };


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
      <Jersey onClick={handleSvgClick} number={jersey?.jersey} />
      {isEditing ? (
        <input
          type="text"
          value={jersey?.jersey || ''}
          className="overlay-text"
          onChange={handleInputChange}
          onBlur={handleBlur}
          readOnly={false}
          autoFocus
        />
      ) : (<></>)
      }
    </div>
  );
};

