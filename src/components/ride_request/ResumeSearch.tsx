import {Alert, Box, Button} from "@mui/material";
import {
  Loop as LoopIcon,
} from '@mui/icons-material';

type Props = {
  onClick: () => void;
};

export function ResumeSearch({onClick}: Props) {
  return (
    <Box>
      <Alert severity="info" sx={{mb: 2}}>
        Ride search is paused.
      </Alert>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        startIcon={<LoopIcon />}
      >
        Resume search
      </Button>
    </Box>
  );
}
