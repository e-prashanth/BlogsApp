import React from 'react'
import { Link } from "react-router-dom";
import { authActions, setDarkmode } from "../store";
import {
    AppBar, Typography,Toolbar, Box,  Button, Tabs, Tab,
  } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useState } from "react";
import { lightTheme, darkTheme } from '../utils/theme';

const Header = () => {
    const dispath = useDispatch();
    const isDark = useSelector((state)=> state.theme.isDarkmode)
    const theme = isDark ? darkTheme : lightTheme
    
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState();

  return <AppBar 
  position='sticky'
  sx={{ background:  `${theme.bg}` }}>
      
      <Toolbar>
          <Typography variant='h4'>
              BlogsApp
          </Typography>
         { isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                //className={classes.font}
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
              />
              <Tab
                //className={classes.font}
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
              />
              <Tab
                //className={classes.font}
                LinkComponent={Link}
                to="/blogs/add"
                label="Add Blog"
              />
            </Tabs>
          </Box>}
          <Box display="flex" marginLeft="auto">
              {!isLoggedIn && (
             <> <Button
              LinkComponent={Link}
              to="login/"
              sx={{ margin: 1, fontWeight : 'bold' , color:"white" , borderRadius: 10 }}
              >
                  Login
              </Button>
              </>
              )}

              
            <Button
          onClick={
            () => dispath(authActions.logout())
          }
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          {/* )} */}
          </Box>
      </Toolbar>
  </AppBar>
}

export default Header