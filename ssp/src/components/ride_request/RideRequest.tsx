import {useState, useEffect, useRef} from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Fade,
  Divider,
  Chip,
  Grid,
  List,

} from '@mui/material';

import {
  Loop as LoopIcon,
  Groups as PassengersIcon,
} from '@mui/icons-material';
import {Api} from "../../api.ts";
import {PassengerCheckinResponseType, PassengerType, RideType} from "../../types/rideTypes.ts";
import {RideDetails} from "./RideDetails.tsx";
import PassengerItem from "../PassengerItem.tsx";
import {RideRoute} from "./RideRoute.tsx";

type ErrorResponseType = {
  message: string;
  isError: true;
}


type Props = {
  onRideAssigned?: (ride: RideType) => void;
  pollingInterval?: number; // in milliseconds
}

const areAllPassengersCheckedIn = (passengers: PassengerType[]) => {
  if (!passengers || passengers.length === 0) return false;
  return passengers.every(passenger => passenger.status === 'checked-in' || passenger.status === 'rejected');
};

const RideRequest = ({

                                onRideAssigned,
                                pollingInterval = 5000
                              }: Props) => {
  const [ride, setRide] = useState<RideType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState<boolean>(true);
  const [attempts, setAttempts] = useState<number>(0);
  const [areAllChecked, setAreAllChecked] = useState<boolean>(false);

  const pollingRef = useRef<number | null>(null);

  const fetchRide = async () => {
    if (!polling) return;
    
    setAttempts(prev => prev + 1);

    await Api.get(`/ride-request`)
      .then((response) => {
        if (response.isError) {
          const err = response.data as ErrorResponseType;
          if (err.message === "No ride assigned yet") {
            setError(null);
            setRide(null);
          } else {
            setError(err.message);
          }
        } else {
          const rideData = response.data as RideType;
          setAreAllChecked(areAllPassengersCheckedIn(rideData.passengers));
          setRide(rideData);
          setPolling(false);
          setError(null);

          if (onRideAssigned) {
            onRideAssigned(rideData);
          }
        }
      }).catch(() => {
        setError('Something went wrong');
      }).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRide();
    pollingRef.current = setInterval(() => {
      if (polling) {
        fetchRide();
      }
    }, pollingInterval);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [polling, pollingInterval]);

  const togglePolling = () => {
    setPolling(prev => !prev);
  };

  const handleCheckInPassanger = (passengerId: string, action: string) => {
    return Api.post('/check-in-passenger', {
      passengerId, action
    }).then((response)=> {
      if(!response.isError) {
        const res = response.data as PassengerCheckinResponseType;
        setAreAllChecked(areAllPassengersCheckedIn(res.passengers));
      }

      return response;
    })
  }

  return (
    <Paper elevation={3} sx={{p: 3, maxWidth: 600, mx: 'auto', borderRadius: 2}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2" fontWeight="500">
          Ride Request
        </Typography>

        {!ride && (
          <Chip
            label={polling ? "Searching for ride..." : "Search stopped"}
            color={polling ? "info" : "default"}
            icon={polling ? <LoopIcon /> : undefined}
          />
        )}

        {ride && (
          <Chip
            label={ride.rideStarted ? 'In Progress' : 'Pending'}
            color={ride.rideStarted ? 'primary' : 'warning'}
          />
        )}
      </Box>

      <Divider sx={{mb: 3}} />

      {loading && attempts === 1 && (
        <Box display="flex" flexDirection="column" alignItems="center" py={4}>
          <CircularProgress size={50} thickness={4} sx={{mb: 2}} />
          <Typography variant="body1" color="text.secondary">
            Loading ride information...
          </Typography>
        </Box>
      )}

      {!loading && !ride && polling && (
        <Box textAlign="center" py={3}>
          <Box display="flex" justifyContent="center" mb={2}>
            <CircularProgress size={40} thickness={4} />
          </Box>
          <Typography variant="h6" gutterBottom>
            Waiting for ride assignment
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Attempt {attempts}: No ride assigned yet.
            The system is automatically checking for new rides.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{mt: 2}}
            onClick={togglePolling}
            startIcon={<LoopIcon />}
          >
            Stop searching
          </Button>
        </Box>
      )}

      {!loading && !ride && !polling && (
        <Box textAlign="center" py={3}>
          <Alert severity="info" sx={{mb: 2}}>
            Ride search is paused.
          </Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={togglePolling}
            startIcon={<LoopIcon />}
          >
            Resume search
          </Button>
        </Box>
      )}

      {error && error !== "No ride assigned yet" && (
        <Alert severity="error" sx={{mb: 2}}>
          {error}
          <Button
            size="small"
            sx={{ml: 2}}
            onClick={() => fetchRide()}
          >
            Retry
          </Button>
        </Alert>
      )}

      {ride && (
        <Fade in={true} timeout={500}>
          <Box>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
              <RideRoute dropoffLocation={ride.dropoffLocation} pickupLocation={ride.pickupLocation}/>
              <Grid size={{xs: 4, sm: 4, md: 6}}>
                <Paper variant="outlined" sx={{p: 2, borderRadius: 2}}>
                  <Box display="flex" justifyContent="center" mb={1}>
                    <PassengersIcon sx={{mr: 1, color: 'primary.main'}} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Passengers ({ride.passengers.length})
                    </Typography>
                  </Box>

                  <List dense>
                    {ride.passengers.map(passenger => <PassengerItem key={passenger.id} passenger={passenger} onCheckInAction={handleCheckInPassanger} />
                    )}
                  </List>
                </Paper>
              </Grid>

              <RideDetails rideId={ride.rideId} rideEndTime={ride.rideEndTime} rideStartTime={ride.rideStartTime}/>
              <Grid size={{xs: 4, sm: 8, md: 12}}>
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!areAllChecked}
                    onClick={() => {
                      console.log("Ride")
                    }}
                  >
                    Start Ride
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      )}

      {polling && !ride && !loading && (
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
      )}
    </Paper>
  );
};

export default RideRequest;
