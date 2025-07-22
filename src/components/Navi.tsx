import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setIsSelectActivityHistoty, setIsSelectLanguage, setIsSelectPackList, setIsSelectWhatsAppMessage } from '../redux/slices/naviSlice';
import { useNavigate } from 'react-router-dom';
import { TbSettings } from "react-icons/tb";
import styles from "./../styles/navi.module.scss"
export default function MenuAppBar() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const isSelectLanguage = useSelector((state: RootState) => state.navi.isSelectLanguage);
    const isSelectPackList = useSelector((state: RootState) => state.navi.isSelectPackList);
    const isSelectActivityHistoty = useSelector((state: RootState) => state.navi.isSelectActivityHistoty);
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', borderRadius: '94px', alignItems: 'center', width: '99.5vw' }}>
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

                    <Typography variant="h6" component="div">
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
                        <TbSettings />
                    </IconButton>

                    <Menu
                        id="menu-pages"
                        disableScrollLock={true}
                        anchorEl={pageMenuAnchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        open={Boolean(pageMenuAnchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            sx: {left: "0% !important",
                                backgroundColor: '#3a4346',
                                boxShadow: 'none',

                            }
                        }}
                        MenuListProps={{
                            sx: {

                                paddingRight: 0,
                                width: '100% !important',
                                height: "100% !important",
                                display: 'contents',
                            }
                        }}

                    >
                        <div className={styles.closeButton} onClick={()=>handleClose()}>&#x2716;</div>
                        <MenuItem className="naviSettingBtn" onClick={() => handlePageNavigation('/FloraPack/')}>
                            {language.home}
                        </MenuItem>
                        <MenuItem className="naviSettingBtn" onClick={() => handlePageNavigation('/FloraPack/information')}>
                            {language.information}
                        </MenuItem>
                    </Menu>

                    <Menu
                        id="menu-appbar"
                        disableScrollLock={true}
                        anchorEl={settingsMenuAnchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(settingsMenuAnchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                              left: '75vw !important',

                                backgroundColor: '#3a4346',
                                boxShadow: 'none',

                            }
                        }}
                        MenuListProps={{
                            sx: {

                                paddingRight: 0,
                                width: '100% !important',
                                height: "100% !important",
                                display: 'contents',
                            }
                        }}
                    >
                        <div className={styles.closeButton} onClick={()=>handleClose()}>&#x2716;</div>
                        <MenuItem
                            className="naviSettingBtn"
                            disabled={isSelectLanguage || isSelectPackList || isSelectActivityHistoty}
                            onClick={() => {
                                dispatch(setIsSelectLanguage());
                                handleClose();
                            }}
                        >
                            {language.languageLabel}
                        </MenuItem>
                        <MenuItem
                            className="naviSettingBtn"
                            disabled={isSelectLanguage || isSelectPackList || isSelectActivityHistoty}
                            onClick={() => {
                                dispatch(setIsSelectActivityHistoty());
                                handleClose();
                            }}
                        >
                            {language.settings} {language.history}
                        </MenuItem>
                        <MenuItem
                            className="naviSettingBtn"
                            disabled={isSelectPackList || isSelectLanguage || isSelectActivityHistoty}
                            onClick={() => {
                                dispatch(setIsSelectPackList());
                                handleClose();
                            }}
                        >
                            {language.packingList}
                        </MenuItem>
                        <MenuItem
                            className="naviSettingBtn"
                            disabled={isSelectPackList || isSelectLanguage || isSelectActivityHistoty}
                            onClick={() => {
                                dispatch(setIsSelectWhatsAppMessage());
                                handleClose();
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
