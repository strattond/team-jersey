import { Box } from "@mui/material";
import { DraggableImage } from "./DraggableImage";
import { useAppSelector } from "../state/hooks";
import JerseyDetails from "./JerseyDetails";

const ImagePane = () => {
  const isEditing = useAppSelector((state) => state.jerseys.editing);
  return (
    <Box className="imagepane" id="imagepanediv">
      <Box className="sourceJersey">
        <DraggableImage id="image1" />
      </Box>
      {isEditing ? <JerseyDetails /> : <></>}
    </Box >
  );
};

export default ImagePane;
