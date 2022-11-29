import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import {
    Alert,
    Box,
    Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow
} from '@mui/material';

import { GetSummary } from '../api';
import { useNavigate } from 'react-router-dom';

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

export default function Summary() {
    const style = useStyles();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const FetchData = async () => {
        try {
            setError('');
            setLoading(true);

            let response = await GetSummary();
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

    const NewBugAction = (row_item) => {
        navigate('/register', {
            state: {
                project_id: row_item.project_id,
                name: row_item.project_name
            }
        });
    };

    useEffect(() => {
        const method = async () => {
            return await FetchData();
        }

        method();
    }, []);


    const handleChangePage = async (event, newPage) => {
        await setPage(newPage);
    };

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    return (
        <div className={style.root}>
            <Grid
                container
                item
                xs={8}
                md={5}
                lg={5}
            >
                <Grid item xs={12}>
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
                    {/* table */}
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Project name</TableCell>
                                    <TableCell align="center">Bugs</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows).map((row, index) => (
                                        <TableRow
                                            key={row.project_id}
                                        >
                                            <TableCell align="center">{row.project_name}</TableCell>
                                            <TableCell align="center">{row.bugs}</TableCell>
                                            <TableCell align="center">
                                                <div>
                                                    <Button
                                                        variant='contained'
                                                        size="small"
                                                        onClick={() => NewBugAction(row)}
                                                    >
                                                        Add bug
                                                    </Button>
                                                </div>
                                            </TableCell>
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
    );
}