'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import usePasswordRecoverController from './usePasswordRecoverController';

export default function PasswordRecover() {
  const controller = usePasswordRecoverController();

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon color="primary" />
              <Typography variant="h6">Enter your email address</Typography>
            </Box>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={controller.email}
              onChange={(e) => controller.setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />
            <Typography variant="body2" color="text.secondary">
              We'll send a verification code to this email address.
            </Typography>
          </Stack>
        );
      
      case 1:
        return (
          <Stack spacing={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <LockIcon color="primary" />
              <Typography variant="h6">Enter verification code</Typography>
            </Box>
            <TextField
              fullWidth
              label="Verification Code"
              value={controller.verificationCode}
              onChange={(e) => controller.setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit code"
              inputProps={{ maxLength: 6 }}
              required
            />
            <Typography variant="body2" color="text.secondary">
              Check your email for the 6-digit verification code.
            </Typography>
          </Stack>
        );
      
      case 2:
        return (
          <Stack spacing={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <LockIcon color="primary" />
              <Typography variant="h6">Create new password</Typography>
            </Box>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={controller.newPassword}
              onChange={(e) => controller.setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={controller.confirmPassword}
              onChange={(e) => controller.setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
            <Typography variant="body2" color="text.secondary">
              Password must be at least 6 characters long.
            </Typography>
          </Stack>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
        p: 2
      }}
    >
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Password Recovery
          </Typography>
          
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Follow the steps below to recover your password
          </Typography>

          <Stepper activeStep={controller.activeStep} sx={{ mb: 4 }}>
            {controller.steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {controller.activeStep === controller.steps.length ? (
            <React.Fragment>
              <Box textAlign="center" py={4}>
                <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Password Reset Complete!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Your password has been successfully reset. You can now login with your new password.
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={controller.handleReset}
                  size="large"
                >
                  Start Over
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {controller.error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {controller.error}
                </Alert>
              )}
              
              {controller.success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {controller.success}
                </Alert>
              )}

              <Box sx={{ mb: 4 }}>
                {renderStepContent(controller.activeStep)}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={controller.activeStep === 0}
                  onClick={controller.handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button 
                  onClick={controller.handleNext}
                  disabled={controller.loading}
                  variant="contained"
                >
                  {controller.loading ? 'Processing...' : controller.activeStep === controller.steps.length - 1 ? 'Reset Password' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}