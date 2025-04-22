import {Box, Grid, List, Paper, Typography} from "@mui/material";
import {Groups as PassengersIcon} from "@mui/icons-material";
import PassengerItem from "./PassengerItem.tsx";
import {ActionType, PassengerType} from "../../types/rideTypes.ts";
import {ApiResponseType} from "../../types/apiTypes.ts";

type Props = {
  passengers: PassengerType[],
  onCheckInAction: (passengerId: string, action: ActionType) => Promise<ApiResponseType<unknown>>;
};

export function PassengerList({passengers, onCheckInAction}: Props) {
  return (
    <Grid size={{xs: 4, sm: 4, md: 6}}>
      <Paper variant="outlined" sx={{p: 2, borderRadius: 2}}>
        <Box display="flex" justifyContent="center" mb={1}>
          < PassengersIcon sx={{mr: 1, color: 'primary.main'}} />
          <Typography variant="subtitle1" fontWeight="bold">
            Passengers ({passengers.length})
          </Typography>
        </Box>

        <List dense>
          {passengers.map(passenger =>
            <PassengerItem key={passenger.id}
                           passenger={passenger}
                           onCheckInAction={onCheckInAction}
            />
          )}
        </List>
      </Paper>
    </Grid>
  );
}
