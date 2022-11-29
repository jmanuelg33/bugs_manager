/* eslint-disable react-hooks/exhaustive-deps */
import {
    Alert, Button, CircularProgress, FormControl, FormHelperText, Grid,
    InputLabel, MenuItem, Select, Snackbar, TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GetAllUsers, Register } from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flex: '1',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '50px'
    }
}));

function RegisterBug() {
    const style = useStyles();


    const location = useLocation();
    const navigate = useNavigate();

    const [project] = useState({ ...location.state });
    const [users, setUsers] = useState([]);

    const [form, setForm] = useState({
        description: '',
        user_id: '',
        project_id: project.project_id
    });

    const [errorInputs, setErrorInputs] = useState({
        project_id: '',
        description: '',
        user_id: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (name, value) => {
        let formCopy = { ...form };
        formCopy[name] = value;
        setForm(formCopy);
    };

    const FetchUsers = async () => {
        try {
            setLoading(true);
            clearErrorMessages();
            let response = await GetAllUsers();
            let { status, data, errors } = response.data;

            if (status === 'success') {
                setUsers(data);
            }
            else if (!!errors) {
                setError(Object.values(errors)[0]);
            }

            setTimeout(() => {
                setLoading(false);
                setError(!!data.message ? data.message : '');
            }, 1000);

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const RegisterActionBug = async () => {
        try {
            clearErrorMessages();

            if (ValidateInputs()) {
                setLoading(true);

                let response = await Register(form);
                let { status, data, errors } = response.data;

                if (status === 'success') {
                    setMessage('Registered incident for the project');
                    setOpenMessage(true);
                } else if (!!errors) {
                    setError(Object.values(errors)[0]);
                }

                setTimeout(() => {
                    setLoading(false);
                    setError(!!data.message ? data.message : '');
                }, 1000);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const ValidateInputs = () => {
        if (!!!form.user_id) {
            setErrorMessage('user_id', 'Required');

            return false;
        }

        if (!!!form.project_id) {
            setErrorMessage('project_id', 'Required');
            return false;
        }

        if (!!!form.description) {
            setErrorMessage('description', 'Required');
            return false;
        }

        return true;
    }

    const clearErrorMessages = () => {
        setError('');
        setErrorInputs({
            project_id: '',
            user_id: '',
            description: ''
        });
    }

    const setErrorMessage = (key, message) => {
        let tmp = { ...errorInputs };
        tmp[key] = message
        setErrorInputs(tmp);
    }

    useEffect(() => {
        const method = async () => {
            await FetchUsers();
        };

        method();
    }, []);

    return (
        <div className={style.root}>
            <Grid
                container
                item
                spacing={1}
                xs={8}
                md={5}
                lg={5}
            >
                <Grid item xs={12}>
                    <h2 style={{ textAlign: 'center' }}>New Bug</h2>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel id="project-label">Project</InputLabel>
                        <Select
                            labelId='project-label'
                            value={project.project_id}
                            error={!!errorInputs.project_id}
                        >
                            <MenuItem key={project.id} value={project.project_id}>{project.name}</MenuItem>
                        </Select>

                        {errorInputs.location_id && (
                            <FormHelperText htmlFor="form-selector"
                                error={!!errorInputs.project_id}>
                                {errorInputs.project_id}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>


                <Grid item xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel id="user-label">User</InputLabel>
                        <Select
                            labelId='user-label'
                            value={form.user_id}
                            onChange={(v) => handleChange('user_id', v.target.value)}
                            error={!!errorInputs.user_id}
                        >
                            {
                                users.map((item) => (
                                    <MenuItem key={item.user_id + item.fullname} value={`${item.id}`}>
                                        {item.fullname}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                        {errorInputs.user_id && (
                            <FormHelperText htmlFor="form-selector"
                                error={!!errorInputs.user_id}>
                                {errorInputs.user_id}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        multiline
                        fullWidth
                        id="standard-basic"
                        label="Description"
                        placeholder="Description go here"
                        maxRows={3}
                        onChange={(v) => handleChange('description', v.target.value)}
                        error={!!errorInputs.description}
                        helperText={errorInputs.description}
                    />
                </Grid>

                <div className={style.root} style={{ alignItems: 'center', marginTop: '20px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        className='app-flex'
                        size='large'
                        style={{ marginLeft: '8px', marginRight: '20px', flex: 1 }}
                        onClick={() => RegisterActionBug()}
                    >
                        Acept
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        className='app-flex'
                        size='large'
                        style={{ flex: 1 }}
                        onClick={() => navigate('/summary')}
                    >
                        Cancel
                    </Button>
                </div>

                <Grid item xs={12} style={{ marginTop: 10 }}>
                    {/* critical error */}
                    {!!error && <Alert severity="error" variant='outlined'>{error}</Alert>}

                    {/* loading */}
                    {loading &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CircularProgress size={24} />
                        </Box>
                    }

                    {/* messages */}
                    <Snackbar
                        open={openMessage}
                        transitionDuration={1000}
                    >
                        <Alert severity="success">{message}</Alert>
                    </Snackbar>
                </Grid>
            </Grid>
        </div>
    )
}

export default RegisterBug