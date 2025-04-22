import {useState, useEffect, useRef} from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import {Api} from "../../api.ts";
import {RideType} from "../../types/rideTypes.ts";
import {ErrorResponseType} from "../../types/apiTypes.ts";
import {RideInformation} from "./RideInformation.tsx";
import {ErrorMessage} from "../ErrorMessage.tsx";
import {ResumeSearch} from "../ride_request/ResumeSearch.tsx";
import {Loader} from "../Loader.tsx";
import {RideSearch} from "../ride_request/RideSearch.tsx";

type Props = {
  pollingInterval?: number; // in milliseconds
}

const RideRequest = ({
                       pollingInterval = 5000
                     }: Props) => {
  const [ride, setRide] = useState<RideType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState<boolean>(true);
  const [attempts, setAttempts] = useState<number>(0);

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
          setRide(rideData);
          setPolling(false);
          setError(null);
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

  return (
    <Paper elevation={3} sx={{p: 3, maxWidth: 600, mx: 'auto', borderRadius: 2}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2" fontWeight="500">
          Ride Request
        </Typography>
      </Box>

      <Divider sx={{mb: 3}} />

      {error && error !== "No ride assigned yet" && (
        <ErrorMessage text={error} />
      )}

      {loading && (
        <Loader text="Loading ride information..." />
      )}

      {!loading && !ride && polling && (
        <RideSearch attempts={attempts} onClick={togglePolling} pollingInterval={pollingInterval} />
      )}

      {!loading && !ride && !polling && (
        <ResumeSearch onClick={togglePolling} />
      )}

      {ride && (
        <RideInformation ride={ride} />
      )}
    </Paper>
  );
};

export default RideRequest;
