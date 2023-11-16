import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box className="flex items-center justify-center ">
      <CircularProgress />
    </Box>
  );
};

export default Loader;
