import { Grid, ThemeProvider } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router';
import DefaultTheme from '../themes/default';
import MyAppBar from '../components/MyAppBar';

function HomeLayout() {
    return (
        <ThemeProvider theme={DefaultTheme}>
            <MyAppBar />

            <Grid
                className='app-main'
                container
            >
                <Outlet />
            </Grid>
        </ThemeProvider>
    )
}

export default HomeLayout
