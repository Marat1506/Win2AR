import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

interface ItemWithFields {
    name: string;
    department: string;
}

interface DialogPropsTypes<T> {
    openDialog: boolean;
    handleCloseDialog: () => void;
    isAdding: boolean;
    currentItem: T | null;
    handleSave: () => void;
    actions: React.ReactNode;
}
export default function DialogAction<T extends ItemWithFields>({
    openDialog,
    handleCloseDialog,
    isAdding,
    currentItem,
    handleSave,
    actions
}: DialogPropsTypes<T>) {
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{isAdding ? "Добавить медсестру" : "Редактировать медсестру"}</DialogTitle>
            <DialogContent>
                {currentItem && actions}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleSave} color="primary">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
}
