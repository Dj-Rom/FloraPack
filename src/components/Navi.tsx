import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logoSettings from './../assets/icons8-settings.svg';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setIsSelectLanguage, setIsSelectPackList, setIsSelectWhatsAppMessage } from '../redux/slices/navi';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const isSelectLanguage = useSelector((state: RootState) => state.navi.isSelectLanguage);
    const isSelectPackList = useSelector((state: RootState) => state.navi.isSelectPackList);
    const language = useSelector((state: RootState) => state.settingsLanguage);
    const [pageMenuAnchorEl, setPageMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] = React.useState<null | HTMLElement>(null);

    const handlePageMenu = (event: React.MouseEvent<HTMLElement>) => {
        setPageMenuAnchorEl(event.currentTarget);
    };

    const handleSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
        setSettingsMenuAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setPageMenuAnchorEl(null);
        setSettingsMenuAnchorEl(null);
    };


    const handlePageNavigation = (path: string) => {
        handleClose();
        navigator(path);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', borderRadius: '94px', alignItems: 'center', width: '100%' }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', borderRadius: '4px', backgroundColor: '#3a4346', alignItems: 'center', width: '100%' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        aria-controls="menu-select-pages"
                        sx={{ mr: 2 }}
                        onClick={handlePageMenu}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <h4>FloraPack</h4>
                    </Typography>

                    <IconButton
                        size="large"
                        aria-label="settings"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleSettingsMenu}
                        color="inherit"
                    >
                        <img src={logoSettings} alt="settings" style={{ width: '2rem', height: 'auto' }} />
                    </IconButton>
                    <Menu
                        id="menu-pages"
                        anchorEl={pageMenuAnchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(pageMenuAnchorEl)}
                        onClose={handleClose}
                    >

                        <MenuItem
                            className="naviSettingBtn"
                            onClick={() => handlePageNavigation('/FloraPack')}
                        >
                            {language.home}
                        </MenuItem>
                        <MenuItem
                            className="naviSettingBtn"
                            onClick={() => handlePageNavigation('/FloraPack/information')}
                        >
                            {language.information}
                        </MenuItem>
                    </Menu>
                    <Menu
                        id="menu-appbar"
                        anchorEl={settingsMenuAnchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(settingsMenuAnchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            className="naviSettingBtn"
                            disabled={isSelectLanguage || isSelectPackList}
                            onClick={() => {
                                dispatch(setIsSelectLanguage());
                                handleClose();
                            }}
                        >
                            {language.languageLabel}
                        </MenuItem>
                        <MenuItem
                            className="naviSettingBtn"
                            disabled={isSelectPackList || isSelectLanguage}
                            onClick={() => {
                                handleClose();
                                dispatch(setIsSelectPackList());
                            }}
                        >
                            {language.packagingList}
                        </MenuItem>
                        <MenuItem
                            className="naviSettingBtn"
                            disabled={isSelectPackList || isSelectLanguage}
                            onClick={() => {
                                handleClose();
                                dispatch(setIsSelectWhatsAppMessage());
                            }}
                        >
                            {language.settingsWhatsAppMessage}
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
