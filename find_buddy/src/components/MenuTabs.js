import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import LaptopIcon from '@mui/icons-material/Laptop';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const MenuTabs = [
    {
        path: "./dashboard",
        text: "Dashboard",
        icon: <LaptopIcon/>
    },

    {
        path: "./profile",
        text: "Profile",
        icon: <AccountCircleIcon/>

    },

    {
        path: "./portfolio",
        text: "Portfolio",
        icon: <MenuBookIcon/>

    },

    {
        path: "./post",
        text: "Posts",
        icon: <ArticleIcon/>

    }
]

export default MenuTabs;