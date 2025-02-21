import { Button, Card, CardContent, CardHeader, Grid2 as Grid, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectJerseyById, setEditing, updateDroppedJersey } from "../state/jerseys";
import { useState } from "react";

const JerseyDetails = () => {

  const dispatch = useAppDispatch();
  const underEdit = useAppSelector((state) => state.jerseys.underEdit);
  const jerseyUnderEdit = useAppSelector(selectJerseyById(underEdit));

  const [jersey, setJersey] = useState<string | undefined>(jerseyUnderEdit?.jersey);
  const [label, setLabel] = useState<string | undefined>(jerseyUnderEdit?.label);

  const handleSave = () => {
    if (underEdit) {
      const updates = { label: label, jersey: jersey }
      dispatch(updateDroppedJersey({ id: underEdit, updates }));
      dispatch(setEditing({ editing: false }));
    }
  };

  const handleCancel = () => {
    // Add cancel logic here
    dispatch(setEditing({ editing: false }));
  };

  return (
    <Card variant="outlined">
      <CardHeader title={jerseyUnderEdit?.jersey} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid><TextField label="Label" name="label" value={label} onChange={(e) => setLabel( e.target.value )} fullWidth /></Grid>
          <Grid><TextField label="#" name="jersey" value={jersey} onChange={(e) => setJersey( e.target.value )} fullWidth /></Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid><Button variant="contained" color="primary" onClick={handleSave}>Save</Button></Grid>
          <Grid><Button variant="contained" onClick={handleCancel}>Cancel</Button></Grid>
        </Grid>
      </CardContent>
    </Card>

  );
}

export default JerseyDetails;
