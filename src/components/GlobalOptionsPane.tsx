import { Button, Card, CardContent, CardHeader, Grid2 as Grid, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setMultiplier as setStoreMultiplier } from "../state/globalOptions";
import { useState } from "react";

const GlobalOptionsPane = () => {

  const dispatch = useAppDispatch();
  const saveMultiplier = useAppSelector((state) => state.options.multiplier);
  const [multiplier, setMultiplier] = useState<number>(saveMultiplier);

  const handleSave = () => {
    const updates = { value: multiplier }
    dispatch(setStoreMultiplier(updates));
  };

  const handleCancel = () => {
    setMultiplier(saveMultiplier);
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Global Options" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid><TextField label="Jersey Size" name="label" value={multiplier} onChange={(e) => setMultiplier( parseInt( e.target.value ) )} fullWidth /></Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid><Button variant="contained" color="primary" onClick={handleSave}>Save</Button></Grid>
          <Grid><Button variant="contained" onClick={handleCancel}>Cancel</Button></Grid>
        </Grid>
      </CardContent>
    </Card>

  );
}

export default GlobalOptionsPane;
