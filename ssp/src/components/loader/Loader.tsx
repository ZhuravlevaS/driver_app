import {CircularProgress, Typography} from "@mui/material";
import styles from './loader.module.css'

type Props = {
  text?: string
};

export function Loader({
                         text = "Loading..."
                       }: Props) {
  return (
    <div className={styles.wrap}>
      <div>
        <CircularProgress size={50} thickness={4} sx={{mb: 2}} />
        <Typography variant="body1" color="textSecondary">
          {text}
        </Typography>
      </div>
    </div>
  );
}
