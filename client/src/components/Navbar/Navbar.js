import React, { useEffect, useState } from "react";
import { StyledAppBar, StyledTypography, StyledImage, BrandContainer, StyledToolbar, StyledAvatar, } from "./styles";
import memories from "../../assets/memories.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    if(token){
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()){
        logout();
      }
    };
    setuser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    try {
      googleLogout();
      dispatch({ type: "LOGOUT" });
      setuser(null);
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledAppBar position="static" color="inherit">
      <BrandContainer>
        <StyledImage src={memories} component={Link} to="/" alt="memories" height="60" />
        <StyledTypography variant="h2" align="center"> {" "} Memories{" "} </StyledTypography>
      </BrandContainer>
      <StyledToolbar>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <StyledAvatar alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </StyledAvatar>
            <StyledTypography variant="h6">{user.result.name}</StyledTypography>
            <Button variant="contained" color="secondary" onClick={logout}> Logout </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary" > Sign In </Button>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
