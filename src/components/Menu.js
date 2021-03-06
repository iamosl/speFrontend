import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuTabs from './MenuTabs';
import { ListItem } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Link, Button } from '@mui/material';
import { getLocalStorageData } from './globalFunctions';
import './Menu.css'


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  color:'black',
  backgroundColor:'#4863A0',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  color:'black',
  backgroundColor:'#4863A0',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function NavMenuBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const user = getLocalStorageData('currentUser');

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.clear();
    console.log("I was called");
    window.location.reload(false);
    history.push('/login'); //redirect to login
  }

  const handleClick=(item)=>{
    var tabs = document.getElementsByClassName('Tabs');
    var currTab = document.getElementById(item.text);
    for(var i=0;i<tabs.length;i++){
      console.log(tabs[i],currTab)
      if(tabs[i]==currTab){
        tabs[i].classList.add('selectedTab');
        console.log("Fdsafd");
      }
      else {
        tabs[i].classList.remove('selectedTab');
      }
    }
    // console.log(item.path + user.username);
    history.push(item.path + "/" + user.username )
  }

  return (
    <Box >
      <AppBar position="fixed" open={open} sx={{backgroundColor:"#151B54"}} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'flex' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Find Buddy
          </Typography>
          <Button style={{marginLeft:"80%", backgroundColor:"#4863A0"}} color="secondary" variant="contained" onClick={() => { logout() }}> Logout</Button>
        </Toolbar>
      </AppBar> 
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerOpen}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <List>
            {
                MenuTabs.map((item,key)=>(
                    <ListItem id={item.text} className='Tabs' button onClick={()=>{handleClick(item)}} key={item.text} >
                        <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center',px: 2.5,}}>
                        <ListItemIcon 
                        sx={{minWidth: 0,mr: open ? 3 : 'auto',justifyContent: 'center',marginLeft:"-15px",color:"#191970"}}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
        <Divider />
      </Drawer>
      
    </Box>
  );
}
