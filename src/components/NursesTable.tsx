import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hook/reduxTypes";
import { updateNurse, deleteNurse, setNurses } from "../features/nursesSlice";
import DialogAction from "../model/dialog";

export interface Nurse {
    id: number;
    name: string;
    department: string;
}

export const NursesTable = () => {
    const dispatch = useAppDispatch();
    const nurses = useAppSelector((state) => state.nurses.nurses);

    const [openDialog, setOpenDialog] = useState(false);
    const [currentNurse, setCurrentNurse] = useState<Nurse>({id: 0, name: '', department: ''});
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = () => {
        setIsAdding(true);
        setCurrentNurse({ id: Date.now(), name: "", department: "" });
        setOpenDialog(true);
    };

    const handleEdit = (nurse: Nurse) => {
        setIsAdding(false);
        setCurrentNurse(nurse);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentNurse({id: 0, name: '', department: ''});
    };

    const handleSave = () => {
        if (currentNurse) {
            if (isAdding) {
                dispatch(setNurses([...nurses, currentNurse]));
            } else {
                dispatch(updateNurse(currentNurse));
            }
            setOpenDialog(false);
        }
    };

    const handleDelete = (id: number) => {
        dispatch(deleteNurse(id));
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleAdd} style={{ marginBottom: "20px" }}>
                Добавить медсестру
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ФИО</TableCell>
                        <TableCell>Отделение</TableCell>
                        {/* <TableCell>Смена</TableCell> */}
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nurses.map((nurse) => (
                        <TableRow key={nurse.id}>
                            <TableCell>{nurse.name}</TableCell>
                            <TableCell>{nurse.department}</TableCell>
                            {/* <TableCell>{nurse.shift}</TableCell>  */}
                            <TableCell>
                                <Button color="primary" onClick={() => handleEdit(nurse)}>
                                    Редактировать
                                </Button>
                                <Button color="error" onClick={() => handleDelete(nurse.id)}>
                                    Удалить
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{isAdding ? "Добавить медсестру" : "Редактировать медсестру"}</DialogTitle>
          <DialogContent>
            {currentNurse && (
              <>
                <TextField
                  label="ФИО"
                  value={currentNurse.name}
                  onChange={(e) => setCurrentNurse({ ...currentNurse, name: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Отделение"
                  value={currentNurse.department}
                  onChange={(e) => setCurrentNurse({ ...currentNurse, department: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Отмена
            </Button>
            <Button onClick={handleSave} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog> */}
            <DialogAction
                currentItem={currentNurse}
                handleCloseDialog={handleCloseDialog}
                handleSave={handleSave}
                isAdding={isAdding}
                openDialog={openDialog}
                // setCurrent={setCurrentNurse}
                actions={
                    <>
                        <TextField
                            label="ФИО"
                            value={currentNurse.name}
                            onChange={(e) => setCurrentNurse({ ...currentNurse, name: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Отделение"
                            value={currentNurse.department}
                            onChange={(e) => setCurrentNurse({ ...currentNurse, department: e.target.value })}
                            fullWidth
                            margin="normal"
                        />

                    </>
                }
            />
        </>
    );
};