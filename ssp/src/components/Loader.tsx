import {CircularProgress, Paper, styled, Typography} from "@mui/material";

type Props = {
  text?: string
};

const LoaderContainer = styled(Paper)(({theme}) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  minHeight: '200px',
  borderRadius: '8px'
}));

export function Loader({
                         text = "Loading..."
                       }: Props) {
  return (
    <div>
      <LoaderContainer elevation={2}>
        <CircularProgress size={50} thickness={4} sx={{mb: 2}} />
        <Typography variant="body1" color="textSecondary">
          {text}
        </Typography>
      </LoaderContainer>
    </div>
  );
}
