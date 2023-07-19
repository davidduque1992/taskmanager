import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export type FormValues = {
  title: string;
  descripcion: string;
};

type FormDialogProps = {
  open: boolean;
  agregarTask: (data: FormValues) => void;
  handleClose: () => void;
};

export default function FormDialog({
  open,
  agregarTask,
  handleClose,
}: FormDialogProps) {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    agregarTask(data);
    reset();
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Tarea</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Título"
              type="text"
              fullWidth
              variant="standard"
              {...register("title", { required: true })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="descripcion"
              label="Descripción"
              type="textarea"
              fullWidth
              variant="standard"
              {...register("descripcion", { required: true })}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit">Aceptar</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
