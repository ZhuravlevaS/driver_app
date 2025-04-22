import {useState} from 'react';
import {
  ListItem,
  ListItemText,
  Button,
  Box,
  CircularProgress,
  Typography,
  Tooltip,
  ButtonGroup
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Block as RejectIcon
} from '@mui/icons-material';
import {ActionType, PassengerType} from "../../types/rideTypes.ts";
import {ApiResponseType} from "../../types/apiTypes.ts";

type Props = {
  passenger: PassengerType;
  onCheckInAction: (passengerId: string, action: ActionType) => Promise<ApiResponseType<unknown>>;
}

const PassengerItem = ({passenger, onCheckInAction}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (action: ActionType) => {
    if (passenger.status !== 'pending' || loading) return;

    setLoading(true);
    setError(null);

    await onCheckInAction(passenger.id, action).then((result)=> {
      if (result.isError) {
        setError(`Failed to ${action === 'check-in' ? 'check in' : 'reject'} passenger`);
      }
    }).catch((err: Error) => {
      setError('An error occurred');
      console.error('Action error:', err);
    }).finally(()=> setLoading(false));

  };

  const getStatusContent = () => {
    if (passenger.status === 'checked-in') {
      return {
        label: 'Checked In',
        icon: <CheckIcon />,
        color: 'success' as const,
        buttonVariant: 'contained' as const
      };
    }

    if (passenger.status === 'rejected') {
      return {
        label: 'Rejected',
        icon: <RejectIcon />,
        color: 'error' as const,
        buttonVariant: 'contained' as const
      };
    }
    return null;
  };

  const statusContent = getStatusContent();

  return (
    <ListItem
      sx={{
        px: 1,
        py: 1.5,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 1,
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        }
      }}
    >
      <Box>
        <ListItemText
          primary={
            <Typography align='center' variant="body1" fontWeight={500}>
              {passenger.name}
            </Typography>
          }
          secondary={error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )}
        />

        {loading ? (
          <Box display="flex" alignItems="center" ml={1}>
            <CircularProgress size={20} sx={{mr: 1}} />
            <Typography variant="body2" color="text.secondary">
              Processing...
            </Typography>
          </Box>
        ) : passenger.status === 'pending' ? (
          <ButtonGroup size="small" variant="outlined">
            <Tooltip title="Check in this passenger">
              <Button
                color="success"
                onClick={() => handleAction('check-in')}
                startIcon={<CheckIcon />}
              >
                Check in
              </Button>
            </Tooltip>
            <Tooltip title="Reject this passenger">
              <Button
                color="error"
                onClick={() => handleAction('reject')}
                startIcon={<CloseIcon />}
              >
                Reject
              </Button>
            </Tooltip>
          </ButtonGroup>
        ) : (
          <Button
            size="small"
            variant={statusContent?.buttonVariant}
            color={statusContent?.color}
            startIcon={statusContent?.icon}
            disabled
            sx={{ml: 1}}
          >
            {statusContent?.label}
          </Button>
        )} </Box>
    </ListItem>
  );
};

export default PassengerItem;
