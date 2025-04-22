import {Alert} from "@mui/material";

type Props = {
  text: string
};

export function ErrorMessage({text}: Props) {
  return (
    <Alert severity="error" sx={{mb: 2}}>
      {text}
    </Alert>
  );
}
