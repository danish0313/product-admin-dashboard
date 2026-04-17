import React, { useState } from 'react';
import { Typography, Box, Paper, TextField, Button, Switch, FormControlLabel, Divider, Alert, Snackbar } from '@mui/material';

const Settings: React.FC = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSave = () => {
        setOpen(true);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Settings
            </Typography>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Profile Settings
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Full Name" defaultValue="Admin User" margin="normal" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Email Address" defaultValue="admin@example.com" margin="normal" />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>
                    Preferences
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel
                        control={<Switch checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />}
                        label="Email Notifications"
                    />
                    <FormControlLabel
                        control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
                        label="Dark Mode (Preview)"
                    />
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Button variant="contained" size="large" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Box>
            </Paper>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Settings saved successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

import { Grid } from '@mui/material'; // Fix missing Grid import
export default Settings;
