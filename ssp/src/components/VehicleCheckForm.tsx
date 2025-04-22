import {Controller, useForm} from 'react-hook-form';
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Divider,
  CircularProgress,
  Stack
} from '@mui/material';

import {
  Check as CheckIcon,
  DirectionsCar as CarIcon,
  Badge as LicenseIcon,
  Lightbulb as LightsIcon,
  DoNotDisturb as DoNotDisturbIcon,
} from '@mui/icons-material';
import {Api} from "../api.ts";
import {useState} from 'react';
import {ApiResponseType, ErrorResponseType} from "../types/apiTypes.ts";
import {useNavigate} from "react-router";
import {ErrorMessage} from "./ErrorMessage.tsx";

type VehicleCheckForm = {
  carOk: boolean;
  licenseOk: boolean;
  lightsWorking: boolean;
  brakesWorking: boolean;
}

const VehicleCheckForm = () => {
  const {
    control,
    handleSubmit,
    formState: {isValid},
    watch
  } = useForm<VehicleCheckForm>({
    defaultValues: {
      carOk: false,
      licenseOk: false,
      lightsWorking: false,
      brakesWorking: false
    },
    mode: 'onChange'
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const formValues = watch();
  const allChecked = Object.values(formValues).every(Boolean);

  const onSubmit = async (data: VehicleCheckForm) => {
    setLoading(true);
    setError(null);

    await Api.post('/vehicle-check', data)
      .then((data) => {
        if (data.isError) {
          const errorDate = data as ApiResponseType<ErrorResponseType>
          setError(errorDate.data.message);
        } else {
          navigate('/ride-info')
        }
      }).catch(() => {
        setError("Something went wrong");
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <Paper elevation={3} sx={{p: 3, maxWidth: 500, mx: 'auto', borderRadius: 2}}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="center" mb={2}>
          <CheckIcon color="primary" sx={{mr: 1}} />
          <Typography variant="h5" component="h2" fontWeight="500">
            Vehicle inspection
          </Typography>
        </Box>

        <Divider sx={{my: 2}} />

        <Typography variant="body2" color="text.secondary" mb={2}>
          Please ensure that the vehicle is in good condition before commencing work.
        </Typography>

        <FormGroup sx={{mb: 3}}>
          <Stack spacing={1.5}>
            <Controller
              name="carOk"
              control={control}
              render={({field}) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      color="primary"
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      <CarIcon sx={{mr: 1}} />
                      <Typography>The vehicle is in good condition</Typography>
                    </Box>
                  }
                />
              )}
            />

            <Controller
              name="licenseOk"
              control={control}
              render={({field}) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      color="primary"
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      <LicenseIcon sx={{mr: 1}} />
                      <Typography>Documents in order and with you</Typography>
                    </Box>
                  }
                />
              )}
            />

            <Controller
              name="lightsWorking"
              control={control}
              render={({field}) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      color="primary"
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      <LightsIcon sx={{mr: 1}} />
                      <Typography>All lights are working</Typography>
                    </Box>
                  }
                />
              )}
            />

            <Controller
              name="brakesWorking"
              control={control}
              render={({field}) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      color="primary"
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      <DoNotDisturbIcon sx={{mr: 1}} />
                      <Typography>The braking system is in good working order</Typography>
                    </Box>
                  }
                />
              )}
            />
          </Stack>
        </FormGroup>

        {error && (
          <ErrorMessage text={error} />
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            {allChecked ? "All points checked" : "Check all boxes"}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isValid || loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? "Sending..." : "Confirm verification"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default VehicleCheckForm;
