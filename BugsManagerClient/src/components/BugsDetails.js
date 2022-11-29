import {
    Alert, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, FormControl,
    TextField, InputLabel, Select, MenuItem, Button
} from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { GetAllBugs, GetAllProjects, GetAllUsers } from '../api';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '50px',
        color: 'black'
    }
}));

function BugsDetails() {
    const style = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        user_id: '',
        project_id: '',
        start_date: null,
        end_date: null
    });

    const handleChange = (name, value) => {
        let formCopy = { ...form };
        formCopy[name] = value;
        setForm(formCopy);
    };

    const handleChangePage = async (event, newPage) => {
        await setPage(newPage);
    };

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const FetchSelectors = async (name) => {
        try {
            setError('');
            setLoading(true);
            let response = name === 'projects' ? await GetAllProjects() : await GetAllUsers();
            let { status, data, errors } = response.data;

            if (status === 'success') {
                if (name === 'projects') {
                    await setProjects(data);
                } else {
                    await setUsers(data);
                }

            } else if (!!errors) {
                setError(Object.values(errors)[0]);
            }

            setLoading(false);
            setError(!!data.message ? data.message : '');
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const FetchBugs = async () => {
        try {
            setError('');
            setRows([]);
            setTotalItems(0);
            setLoading(true);

            let params = { ...SanitizeParams() };
            let query_url = '?' + new URLSearchParams(params).toString();

            let response = await GetAllBugs(query_url);
            let { status, data, errors } = response.data;

            if (status === 'success') {
                await setRows(data);
                await setTotalItems(data.length);

            } else if (!!errors) {
                setError(Object.values(errors)[0]);
            }

            setLoading(false);
            setError(!!data.message ? data.message : '');
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const SanitizeParams = () => {
        let tmp = { ...form };
        Object.keys(tmp).forEach(key => {
            if (tmp[key] === null) {
                delete tmp[key];
            }
        });

        return tmp;
    }

    const clearAction = () => {
        setForm({
            user_id: '',
            project_id: '',
            start_date: null,
            end_date: null
        });
    }

    useEffect(() => {
        const method = async () => {
            await FetchSelectors('projects');
            await FetchSelectors('users');
        }

        method();
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className={style.root}>
                <Grid
                    container
                    item
                    xs={8}
                    md={8}
                    lg={8}
                >
                    <Grid item xs={12} style={{ marginBottom: 10 }}>
                        {/* critical error */}
                        {!!error && <Alert severity="error" variant='outlined'>{error}</Alert>}

                        {/* loading */}
                        {loading &&
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <CircularProgress size={24} />
                            </Box>
                        }
                    </Grid>

                    <Grid item xs={12}>
                        <div className='app-flex-row'>
                            <FormControl fullWidth style={{ margin: 2 }}>
                                <InputLabel id="user-label">User</InputLabel>
                                <Select
                                    labelId='user-label'
                                    value={form.user_id}
                                    size={'small'}
                                    onChange={(v) => handleChange('user_id', v.target.value)}
                                >
                                    {
                                        users.map((item, index) => (
                                            <MenuItem key={`${item.user_id}${index}`} value={item.id}>
                                                {item.fullname}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                            <FormControl fullWidth style={{ margin: 2 }}>
                                <InputLabel id="project-label">Project</InputLabel>
                                <Select
                                    labelId='project-label'
                                    value={form.project_id}
                                    size={'small'}
                                    onChange={(v) => handleChange('project_id', v.target.value)}
                                >
                                    {
                                        projects.map((item, index) => (
                                            <MenuItem key={`${item.project_id}+${index}`} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>

                        <div className="app-flex-row">
                            <DesktopDatePicker
                                label="Start date"
                                inputFormat="DD/MM/YYYY"
                                value={form.start_date}
                                onChange={(v) => handleChange('start_date', moment(v, 'MM/DD/YYYY').format('MM/DD/YYYY'))}
                                renderInput={(params) => <TextField style={{ margin: 2 }} fullWidth size={'small'} {...params} />}
                            />

                            <DesktopDatePicker
                                label="End date"
                                inputFormat="DD/MM/YYYY"
                                value={form.end_date}
                                onChange={(v) => handleChange('end_date', moment(v, 'MM/DD/YYYY').format('MM/DD/YYYY'))}
                                renderInput={(params) => <TextField style={{ margin: 2 }} fullWidth size={'small'} {...params} />}
                            />
                        </div>

                        <div className='app-flex-row'>
                            <Button variant="contained" style={{ margin: 4 }} fullWidth onClick={() => FetchBugs()}>
                                Filter
                            </Button>
                            <Button variant="contained" style={{ margin: 4 }} fullWidth onClick={() => clearAction()}>
                                Clear
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: 10 }}>
                        {/* table */}
                        <TableContainer component={Paper} >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Project name</TableCell>
                                        <TableCell align="center">Bug detected by</TableCell>
                                        <TableCell align="center">Descrition</TableCell>
                                        <TableCell align="center">Creation date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows).map((row, index) => (
                                            <TableRow
                                                key={`${row.id}-table`}
                                            >
                                                <TableCell align="center">{row.project}</TableCell>
                                                <TableCell align="center">{row.username}</TableCell>
                                                <TableCell align="center">{row.description}</TableCell>
                                                <TableCell align="center">{row.creation_date}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* pagination */}
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={totalItems}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </div>
        </LocalizationProvider>
    )
}

export default BugsDetails