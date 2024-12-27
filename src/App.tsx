import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { setDoctors } from "./features/doctorsSlice";
import { setNurses } from "./features/nursesSlice";
import { DoctorsTable } from "./components/DoctorsTable";
import { NursesTable } from "./components/NursesTable";
import doctorsData from "./mock/doctors.json";
import nursesData from "./mock/nurses.json";
import { useAppDispatch, useAppSelector } from "./hook/reduxTypes";

const App = () => {
  const [activeTab, setActiveTab] = useState<"doctors" | "nurses">("doctors");
  const dispatch = useAppDispatch();

  const doctors = useAppSelector((state) => state.doctors.doctors);
  const nurses = useAppSelector((state) => state.nurses.nurses);

  useEffect(() => {
    if (!doctors.length) {
      dispatch(setDoctors(doctorsData));
    }
    if (!nurses.length) {
      dispatch(setNurses(nursesData));
    }
  }, [dispatch, doctors.length, nurses.length]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Медучреждение
          </Typography>
          <Button
            color="inherit"
            onClick={() => setActiveTab("doctors")}
            sx={{
              borderBottom: activeTab === "doctors" ? "2px solid white" : "none",
              borderRadius: 0,
            }}
          >
            Врачи
          </Button>
          <Button
            color="inherit"
            onClick={() => setActiveTab("nurses")}
            sx={{
              borderBottom: activeTab === "nurses" ? "2px solid white" : "none",
              borderRadius: 0,
            }}
          >
            Медсестры
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "20px" }}>
        {activeTab === "doctors" && <DoctorsTable />}
        {activeTab === "nurses" && <NursesTable />}
      </div>
    </div>
  );
};

export default App;
