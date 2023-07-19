import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export type modifyValues = {
  id: number;
  title: string;
  descripcion: string;
};

type Item = {
  id: number;
  titulo: string;
  descripcion: string;
  // ...
};

type FormDialogProps = {
  open: boolean;
  modificarTask: (data: modifyValues) => void;
  handleClose: () => void;
  data: Item;
};

export default function FormModify({
  open,
  modificarTask,
  handleClose,
  data,
}: FormDialogProps) {
  const { register, handleSubmit, reset } = useForm<modifyValues>();

  const onSubmit: SubmitHandler<modifyValues> = (formData) => {
    modificarTask({ ...formData, id: data.id });
    reset();
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modificar Tarea</DialogTitle>
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
              defaultValue={data.titulo}
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
              defaultValue={data.descripcion}
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
