import React from 'react'
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material'

const Footer = () => {
    const { palette } = useTheme();
    return (
        <>
        <Box sx={{
            height: '70px',
            bgcolor: palette.secondary.midNightGreen,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box component='span' sx={{ color: palette.primary.main }}>All rights reserved! 2024.</Box>

        </Box>
    </>
    )
}

export default Footer