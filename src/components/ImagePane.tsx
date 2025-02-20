import { Box } from "@mui/material";
import { DraggableImage } from "./DraggableImage";

const ImagePane = () => {
  return (
    <Box className="imagepane" id="imagepanediv">
      <Box className="sourceJersey">
        <DraggableImage id="image1" />
      </Box>
      <Box>
        
      </Box>
    </Box>
  );
};

export default ImagePane;
