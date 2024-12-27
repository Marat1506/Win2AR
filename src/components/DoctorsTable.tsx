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
import { updateDoctor, deleteDoctor, setDoctors } from "../features/doctorsSlice";
import DialogAction from "../model/dialog";

export type Doctor = {
    id: number;
    name: string;
    department: string;
    isHead: boolean;
};

export const DoctorsTable = () => {
    const dispatch = useAppDispatch();
    const doctors = useAppSelector((state) => state.doctors.doctors);

    const [openDialog, setOpenDialog] = useState(false);
    const [currentDoctor, setCurrentDoctor] = useState<Doctor>({ id: 0, name: '', department: '', isHead: false });
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = () => {
        setIsAdding(true);
        setCurrentDoctor({ id: Date.now(), name: "", department: "", isHead: false });
        setOpenDialog(true);
    };

    const handleEdit = (doctor: Doctor) => {
        setIsAdding(false);
        setCurrentDoctor(doctor);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentDoctor({ id: 0, name: '', department: '', isHead: false });
    };

    const handleSave = () => {
        if (currentDoctor) {
            if (isAdding) {
                dispatch(setDoctors([...doctors, currentDoctor]));
            } else {
                dispatch(updateDoctor(currentDoctor));
            }
            setOpenDialog(false);
        }
    };

    const handleDelete = (id: number) => {
        dispatch(deleteDoctor(id));
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleAdd} style={{ marginBottom: "20px" }}>
                Добавить врача
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ФИО</TableCell>
                        <TableCell>Отделение</TableCell>
                        <TableCell>Заведующий</TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {doctors.map((doctor) => (
                        <TableRow key={doctor.id}>
                            <TableCell>{doctor.name}</TableCell>
                            <TableCell>{doctor.department}</TableCell>
                            <TableCell>{doctor.isHead ? "Да" : "Нет"}</TableCell>
                            <TableCell>
                                <Button color="primary" onClick={() => handleEdit(doctor)}>
                                    Редактировать
                                </Button>
                                <Button color="error" onClick={() => handleDelete(doctor.id)}>
                                    Удалить
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <DialogAction
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                isAdding={isAdding}
                currentItem={currentDoctor}
                handleSave={handleSave}
                actions={
                    <>
                        <TextField
                            label="ФИО"
                            value={currentDoctor.name}
                            onChange={(e) => setCurrentDoctor({ ...currentDoctor, name: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Отделение"
                            value={currentDoctor.department}
                            onChange={(e) => setCurrentDoctor({ ...currentDoctor, department: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Заведующий (Да/Нет)"
                            value={currentDoctor.isHead ? "Да" : "Нет"}
                            onChange={(e) => setCurrentDoctor({ ...currentDoctor, isHead: e.target.value === "Да" })}
                            fullWidth
                            margin="normal"
                        />
                    </>
                }
            />
        </>
    );
};
