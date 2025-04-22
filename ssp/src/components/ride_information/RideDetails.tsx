import {Grid, Paper, Typography} from "@mui/material";
import {formatTime} from "../../utills.ts";
import {AccessTime as ClockIcon} from '@mui/icons-material';

type Props = {
  rideId: string;
  rideStartTime: string;
  rideEndTime: string;
};

export function RideDetails({rideId, rideStartTime, rideEndTime}: Props) {
  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const durationMs = end - start;
    return Math.floor(durationMs / (1000 * 60));
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours} h ${remainingMinutes > 0 ? `${remainingMinutes} min` : ''}`;
  };

  return (
    <Grid size={{xs: 4, sm: 4, md: 6}}>
      <Paper variant="outlined" sx={{p: 2, borderRadius: 2}}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Ride Details
        </Typography>

        <Grid container spacing={{xs: 1, sm: 2}} columns={{xs: 4, sm: 4}}>
          <Grid size={{xs: 2, sm: 2}}>
            <ClockIcon color="primary" />
            <Typography variant="body2" color="text.secondary">
              Start Time
            </Typography>
            <Typography variant="body1">
              {formatTime(rideStartTime)}
            </Typography>
          </Grid>

          <Grid size={{xs: 2, sm: 2}}>
            <ClockIcon color="primary" />
            <Typography variant="body2" color="text.secondary">
              End Time
            </Typography>
            <Typography variant="body1">
              {formatTime(rideEndTime)}
            </Typography>
          </Grid>

          <Grid size={{xs: 2, sm: 2}}>
            <ClockIcon color="primary" />
            <Typography variant="body2" color="text.secondary">
              Estimated Duration
            </Typography>
            <Typography variant="body1">
              {formatDuration(calculateDuration(rideStartTime, rideEndTime))}
            </Typography>
          </Grid>

          <Grid size={{xs: 2, sm: 2}}>
            <Typography variant="body2" color="text.secondary">
              Ride ID
            </Typography>
            <Typography variant="body1" sx={{fontSize: '0.9rem'}}>
              {rideId}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
