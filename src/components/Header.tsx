import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Медучреждение
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/doctors"
          sx={{
            borderBottom: location.pathname === "/doctors" ? "2px solid white" : "none",
            borderRadius: 0,
          }}
        >
          Врачи
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/nurses"
          sx={{
            borderBottom: location.pathname === "/nurses" ? "2px solid white" : "none",
            borderRadius: 0,
          }}
        >
          Медсестры
        </Button>
      </Toolbar>
    </AppBar>
  );
};
