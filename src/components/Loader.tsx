import {Box, CircularProgress, Typography} from "@mui/material";

type Props = {
  text?: string
};

export function Loader({
                         text = "Loading..."
                       }: Props) {
  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%" alignItems="center" justifyContent="center">
      <CircularProgress size={50} thickness={4} sx={{mb: 2}} />
      <Typography variant="body1" color="textSecondary">
        {text}
      </Typography>
    </Box>
  );
}
