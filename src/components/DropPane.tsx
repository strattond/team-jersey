import { DraggableJersey } from './DraggableJersey';
import { useDroppable } from '@dnd-kit/core';
import { useAppSelector } from '../state/hooks';
import { Box } from '@mui/material';

const DropPane = () => {
  const images = useAppSelector((state) => state.jerseys.jerseys);
  const { isOver, setNodeRef } = useDroppable({ id: 'droppable' });
  const style = { color: isOver ? 'green' : undefined, };

  return (
    <Box className="droppane" ref={setNodeRef} style={style} id="droppanetarget">
      {images.map((image) => (<DraggableJersey key={image.id} id={"dropped-" + image.id} left={image.x} top={image.y} appID={image.id} />))}
    </Box>
  );
};

export default DropPane;
