import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsSelectLanguage, setIsSelectPackList } from '../redux/slices/navi';

export default function MenuAppBar() {
    const dispatch = useDispatch()
    const isSelectLanguage = useSelector((state: RootState) => state.navi.isSelectLanguage);
    const isSelectPackList = useSelector((state: RootState) => state.navi.isSelectPackList);
    const language = useSelector((state: RootState) => state.settingsLanguage)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <AppBar position="static" >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "#3a4346", alignItems: 'center', width: '100%' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <h3>FloraPack</h3>

                    </Typography>
                    {(
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem className="naviSettingBtn" disabled={isSelectLanguage || isSelectPackList} onClick={() => {
                                    dispatch(setIsSelectLanguage())
                                    handleClose()
                                }
                                }>{language.languageLabel}</MenuItem>
                                <MenuItem className="naviSettingBtn" disabled={isSelectPackList || isSelectLanguage} onClick={() => {
                                    dispatch(setIsSelectPackList())
                                    handleClose()
                                }}>{language.packagingList}</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}