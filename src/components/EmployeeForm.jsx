import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material';

const EmployeeForm = ({ onSubmit, employee, countries }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      country: '',
      state: '',
      district: '',
    },
  });

  // Pre-populate form when editing
  useEffect(() => {
  if (employee && countries.length) {
    const countryName =
      countries.find((c) => c.id === employee.country)?.country || employee.country;;

    reset({
      ...employee,
      country: countryName,
    });
  }
  }, [employee, countries, reset]);

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Name */}
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

          {/* Email */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { 
                  value: /^[^\s@]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/, 
                  message: 'Invalid email' 
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

          {/* Mobile */}
            <Controller
              name="mobile"
              control={control}
              rules={{
                required: 'Mobile number is required',
                minLength: { value: 10, message: 'Must be at least 10 digits' },
                maxLength: { value: 15, message: 'Max 15 digits' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobile"
                  fullWidth
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                />
              )}
            />

          {/* Country Dropdown */}  
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{ required: 'Country is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Country"
                  fullWidth
                  error={!!errors.country}
                  helperText={errors.country?.message}       
                >
          
                  {countries.map((c) => (
                    <MenuItem key={c.id} value={c.country}>
                      {c.country}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

          {/* State */}
            <Controller
              name="state"
              control={control}
              rules={{ required: 'State is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="State"
                  fullWidth
                  error={!!errors.state}
                  helperText={errors.state?.message}
                />
              )}
            />

          {/* District */}
            <Controller
              name="district"
              control={control}
              rules={{ required: 'District is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="District"
                  fullWidth
                  error={!!errors.district}
                  helperText={errors.district?.message}
                />
              )}
            />

          {/* Submit Button */}
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary">
              {employee ? 'Update' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EmployeeForm;