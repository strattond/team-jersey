import ImagePane from './components/ImagePane';
import DropPane from './components/DropPane';
import { DndContext, KeyboardSensor, MouseSensor, PointerActivationConstraint, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { addDroppedJersey, selectJerseyById, updateDroppedJersey } from './state/jerseys';
import { Coordinates } from '@dnd-kit/utilities';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const App = () => {

  // If we don't put in a minimum distance, then we can't double click on what's placed as it sees
  // it as a pair of moves which steals the focus from the edit box
  const activationConstraint: PointerActivationConstraint = { distance: 15, };
  const mouseSensor = useSensor(MouseSensor, { activationConstraint, });
  const touchSensor = useSensor(TouchSensor, { activationConstraint, });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const [appID, setAppID] = useState<string|undefined>(undefined);
  const [coords, setCoords] = useState<Coordinates | undefined>(undefined);
  const jersey = useAppSelector(selectJerseyById(appID));
  const [, setIsDragging] = useState(false);
  const nextID = useAppSelector((state) => state.jerseys.nextID);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (appID && coords && jersey) {
      const newX = jersey.x + coords.x;
      const newY = jersey.y + coords.y;
      if (newX > 0 && newY > 0) {
        const updates = { x: newX, y: newY }
        dispatch(updateDroppedJersey({ id: appID, updates }));
      }
      // Reset it...
      setAppID(undefined);
      setCoords(undefined);
    }
  }, [appID, coords, dispatch, jersey])
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />    <DndContext
        autoScroll={false}
        sensors={sensors}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={({ active, over, delta }) => {
          setIsDragging(false);
          if (over) {
            const target = over.rect;
            const source = active.rect;
            if (source.current.translated) {
              const x = source.current.translated.left - target.left;
              const y = source.current.translated.top - target.top;
              if (x > 0 && x < target.width && y > 0 && y < target.height) {

                if (active.id == 'draggable') {
                  // Adding a new image to the field
                  dispatch(addDroppedJersey({ id: "" + nextID, label: "Test", x: x, y: y, jersey: "7" }));
                } else {
                  // Repositioning!
                  if (active.data.current) {
                    const appID = active.data.current.id;
                    setAppID(appID);
                    setCoords(delta);
                  }
                }
              }
            }
          }
          else {
            // Due to the + x/y wonkiness, it may not be "over"
            if (active.data.current) {
              const appID = active.data.current.id;
              setAppID(appID);
              setCoords(delta);
            }
          }

        }}
        onDragCancel={() => setIsDragging(false)}
      >
        <Box className="container">
          <ImagePane />
          <DropPane />
        </Box>
      </DndContext>
    </ThemeProvider>
  );
};

export default App;
