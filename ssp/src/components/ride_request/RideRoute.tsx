import {Box, Grid, Paper, Typography} from "@mui/material";
import {ArrowForward as ArrowIcon, LocationOn as LocationIcon} from "@mui/icons-material";
import {formatTime} from "../../utills.ts";
import {DropoffLocationType, PickupLocationType} from "../../types/rideTypes.ts";

type Props = {
  pickupLocation: PickupLocationType,
  dropoffLocation: DropoffLocationType
};

export function RideRoute({
                            pickupLocation,
                            dropoffLocation
                          }
                          : Props) {
  return (
    <Grid size={{xs: 4, sm: 8, md: 12}}>
      <Paper variant="outlined" sx={{p: 2, borderRadius: 2}}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Ride Route
        </Typography>
        <Box display="flex" alignItems="center" mb={2} justifyContent="center">
          <LocationIcon color="primary" sx={{mt: -0.5 , mr: 1.5}} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Pickup Location
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {pickupLocation.address}
            </Typography>
            {pickupLocation.time && (
              <Typography variant="body2" color="text.secondary">
                {formatTime(pickupLocation.time)}
              </Typography>
            )}
          </Box>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" my={1}>
          <ArrowIcon sx={{color: 'text.secondary'}} />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center">
          <LocationIcon color="error" sx={{mt: 1.5, mr: 1.5}} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Destination
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {dropoffLocation.address}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
