import {Box, Button, Typography} from "@mui/material";
import {
  Loop as LoopIcon,
} from '@mui/icons-material';
import {Loader} from "../Loader.tsx";

type Props = {
  attempts: number;
  onClick: () => void;
  pollingInterval: number;
};

export function RideSearch({attempts, onClick, pollingInterval}: Props) {
  return (
    <Box textAlign="center" py={3}>
      <Loader text="Waiting for ride assignment" />
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Attempt {attempts}: No ride assigned yet.
        The system is automatically checking for new rides.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        sx={{mt: 2}}
        onClick={onClick}
        startIcon={<LoopIcon />}
      >
        Stop searching
      </Button>
      <Box
        position="relative"
        mt={3}
        pt={2}
        borderTop={1}
        borderColor="divider"
      >
        <Typography variant="body2" color="text.secondary" align="center">
          Next request in {Math.floor(pollingInterval / 1000)} sec
        </Typography>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height={2}
          overflow="hidden"
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: 'primary.main',
              animation: 'progress 5s linear infinite',
              '@keyframes progress': {
                '0%': {transform: 'translateX(-100%)'},
                '100%': {transform: 'translateX(0%)'}
              }
            }}
          />
        </Box>
      </Box>
    </Box>

  );
}
