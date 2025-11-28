import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import authService from '../services/authService'
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
    useTheme,
    Collapse,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HistoryIcon from '@mui/icons-material/History'
import SettingsIcon from '@mui/icons-material/Settings'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/Logout'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PeopleIcon from '@mui/icons-material/People'
import CloudIcon from '@mui/icons-material/Cloud'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import logoImage from '../asset/image/logo.png'

const drawerWidth = 280
const drawerWidthCollapsed = 64

const menuItems = [
    {
        text: 'Historias',
        icon: <HistoryIcon />,
        path: '/history',
    },
    {
        text: 'Configuración',
        icon: <SettingsIcon />,
        path: '/configuration',
        subItems: [
            {
                text: 'Usuario',
                icon: <PeopleIcon />,
                path: '/configuration/users',
            },
            {
                text: 'Entorno',
                icon: <CloudIcon />,
                path: '/configuration/environment',
            },
        ],
    },
]

function Layout({ children, mode, toggleMode }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()

    const isConfigurationActive = location.pathname.startsWith('/configuration')
    const [openSubmenu, setOpenSubmenu] = useState(isConfigurationActive)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleNavigation = (path) => {
        navigate(path)
        setMobileOpen(false)
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        handleMenuClose()
        authService.logout()
        navigate('/login')
    }

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    const getPageTitle = () => {
        if (location.pathname === '/configuration/users') {
            return 'Usuarios'
        }
        if (location.pathname === '/configuration/environment') {
            return 'Entorno'
        }
        const currentItem = menuItems.find((item) => item.path === location.pathname)
        return currentItem ? currentItem.text : 'SPARTA'
    }

    const handleSubmenuToggle = () => {
        setOpenSubmenu(!openSubmenu)
    }

    // Actualizar el estado del submenú cuando cambia la ruta
    useEffect(() => {
        setOpenSubmenu(isConfigurationActive)
    }, [isConfigurationActive])

    const drawer = (
        <Box>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    px: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {!collapsed && (
                        <>
                            <Box
                                component="img"
                                src={logoImage}
                                alt="SPARTA Logo"
                                sx={{
                                    width: 56,
                                    height: 56,
                                    mr: 2,
                                    objectFit: 'contain',
                                }}
                            />
                            <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
                                SPARTA
                            </Typography>
                        </>
                    )}
                    {collapsed && (
                        <Box
                            component="img"
                            src={logoImage}
                            alt="SPARTA Logo"
                            sx={{
                                width: 48,
                                height: 48,
                                objectFit: 'contain',
                            }}
                        />
                    )}
                </Box>
                <IconButton onClick={toggleCollapse} size="small" sx={{ ml: collapsed ? 0 : 'auto' }}>
                    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <Box key={item.text}>
                        <ListItem disablePadding>
                            <Tooltip title={collapsed ? item.text : ''} placement="right">
                                <ListItemButton
                                    selected={item.subItems ? isConfigurationActive : location.pathname === item.path}
                                    onClick={() => {
                                        if (item.subItems) {
                                            if (!collapsed) {
                                                handleSubmenuToggle()
                                            } else {
                                                handleNavigation(item.subItems[0].path)
                                            }
                                        } else {
                                            handleNavigation(item.path)
                                        }
                                    }}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: collapsed ? 'center' : 'flex-start',
                                        px: collapsed ? 2.5 : 3,
                                        '&.Mui-selected': {
                                            backgroundColor: 'transparent',
                                            color: 'primary.main',
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                            },
                                            '& .MuiListItemIcon-root': {
                                                color: 'primary.main',
                                            },
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: collapsed ? 0 : 3,
                                            justifyContent: 'center',
                                            color: (item.subItems ? isConfigurationActive : location.pathname === item.path) ? 'primary.main' : 'inherit',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    {!collapsed && (
                                        <>
                                            <ListItemText
                                                primary={item.text}
                                                sx={{
                                                    color: (item.subItems ? isConfigurationActive : location.pathname === item.path) ? 'primary.main' : 'inherit',
                                                }}
                                            />
                                            {item.subItems && (openSubmenu ? <ExpandLess /> : <ExpandMore />)}
                                        </>
                                    )}
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                        {item.subItems && !collapsed && (
                            <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.subItems.map((subItem) => (
                                        <ListItem key={subItem.text} disablePadding>
                                            <ListItemButton
                                                selected={location.pathname === subItem.path}
                                                onClick={() => handleNavigation(subItem.path)}
                                                sx={{
                                                    pl: 6,
                                                    minHeight: 48,
                                                    '&.Mui-selected': {
                                                        backgroundColor: 'transparent',
                                                        color: 'primary.main',
                                                        '&:hover': {
                                                            backgroundColor: 'action.hover',
                                                        },
                                                        '& .MuiListItemIcon-root': {
                                                            color: 'primary.main',
                                                        },
                                                    },
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: 3,
                                                        justifyContent: 'center',
                                                        color: location.pathname === subItem.path ? 'primary.main' : 'inherit',
                                                    }}
                                                >
                                                    {subItem.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={subItem.text}
                                                    sx={{
                                                        color: location.pathname === subItem.path ? 'primary.main' : 'inherit',
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </Box>
                ))}
            </List>
        </Box>
    )

    const currentDrawerWidth = collapsed ? drawerWidthCollapsed : drawerWidth

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                    ml: { sm: `${currentDrawerWidth}px` },
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 1,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        color="inherit"
                        onClick={toggleMode}
                        aria-label="toggle theme"
                        sx={{ mr: 1 }}
                    >
                        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={handleMenuOpen}
                        aria-label="settings menu"
                        aria-controls={anchorEl ? 'settings-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl ? 'true' : undefined}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <Menu
                        id="settings-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Cerrar Sesión</ListItemText>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{
                    width: { sm: currentDrawerWidth },
                    flexShrink: { sm: 0 },
                }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: currentDrawerWidth,
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                            overflowX: 'hidden',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                    backgroundColor: 'background.default',
                    minHeight: '100vh',
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}

export default Layout

