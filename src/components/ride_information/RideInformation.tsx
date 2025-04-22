import {Fade, Grid} from "@mui/material";
import {RideRoute} from "./RideRoute.tsx";
import {RideDetails} from "./RideDetails.tsx";
import {PassengerCheckinResponseType, PassengerType, RideType} from "../../types/rideTypes.ts";
import {useEffect, useState} from "react";
import {Api} from "../../api.ts";
import {PassengerList} from "./PassengerList.tsx";
import {ActionButtons} from "./ActionButtons.tsx";

type Props = {
  ride: RideType;
};

const areAllPassengersCheckedIn = (passengers: PassengerType[]) => {
  if (!passengers || passengers.length === 0) return false;

  return passengers.every((passenger: PassengerType) => passenger.status !== 'pending') &&
  passengers.some((passenger: PassengerType) => passenger.status === 'checked-in');
};

export function RideInformation({ride}: Props) {
  const [areAllChecked, setAreAllChecked] = useState<boolean>(false);
  const [passengers, setPassengers] = useState<PassengerType[] | null>(null);

  const handleCheckInPassenger = async (passengerId: string, action: string) => {
    return Api.post('/check-in-passenger', {
      passengerId, action
    }).then((response) => {
      if (!response.isError) {
        const res = response.data as PassengerCheckinResponseType;
        setPassengers(res.passengers)
        setAreAllChecked(areAllPassengersCheckedIn(res.passengers));
      }

      return response;
    })
  }

  useEffect(() => {
    setAreAllChecked(areAllPassengersCheckedIn(ride.passengers));
  }, []);



  return (
    <Fade in={true} timeout={500}>
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>

          <RideRoute dropoffLocation={ride.dropoffLocation} pickupLocation={ride.pickupLocation} />

          <PassengerList passengers={passengers || ride.passengers} onCheckInAction={handleCheckInPassenger} />

          <RideDetails rideId={ride.rideId} rideEndTime={ride.rideEndTime} rideStartTime={ride.rideStartTime} />

          <ActionButtons isBtnDisabled={!areAllChecked}/>

        </Grid>
    </Fade>
  );
}
