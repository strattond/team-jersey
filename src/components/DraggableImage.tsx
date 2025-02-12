import { useDraggable } from '@dnd-kit/core';
import Jersey from './Jersey';

interface DraggableImageProps {
  id: string;
}

export const DraggableImage = ({ id }: DraggableImageProps) => {

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable(
    {
      id: 'draggable',
      data: {
        id: 'draggable'
      }
    });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 9999 : 'auto',
    position: isDragging ? 'relative' : 'inherit'
  };

  return (
    <div
      id={id}
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'dragging' : ''}
      {...listeners}
      {...attributes}>
      <Jersey />
    </div>
  )
};