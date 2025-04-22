import {Box, Button, Dialog, DialogContent, Grid, Typography} from "@mui/material";
import {useState} from "react";

type Props = {
  isBtnDisabled: boolean;
};

export function ActionButtons({isBtnDisabled}: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid size={{xs: 4, sm: 8, md: 12}}>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          disabled={isBtnDisabled}
          onClick={handleOpen}
        >
          Start Ride
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="xs"
          fullWidth
        >
          <DialogContent sx={{pt: 4, pb: 2, textAlign: 'center'}}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Good Trip!
            </Typography>

            <Typography variant="body1" sx={{my: 2}}>
              Have a safe and pleasant journey! Thank you for your service.
            </Typography>
          </DialogContent>
        </Dialog>
      </Box>
    </Grid>
  );
}
