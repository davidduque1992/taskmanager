import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export interface handleClickDelete {
  id: number;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface RecipeReviewCardProps {
  id?: number;
  title?: string;
  descripcion?: string;
  fecha?: string;
  color?: { bgcolor: string };
  estado?: number;
  handleChangeEstado?: (id: number, estado: number) => void;
  handleClickDelete?: (item: handleClickDelete) => void;
  columns?: Array<{ id: string; title: string }>;
}

export default function RecipeReviewCard({
  id = 0,
  title = "Sin Titulo",
  descripcion = "Sin descripcion",
  fecha = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  color = { bgcolor: "red" },
  estado = 1,
  handleChangeEstado,
  handleClickDelete,
  columns = [
    { id: "1", title: "Por hacer" },
    { id: "2", title: "En progreso" },
    { id: "3", title: "Hecho" },
  ],
}: RecipeReviewCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const deleteItem = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmationConfirm = () => {
    if (handleClickDelete) {
      handleClickDelete({ id });
    }
    setDeleteConfirmationOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPopover = open ? "simple-popover" : undefined;

  // Generate an array of numbers from 1 to columns.length, excluding the value of the estado prop
  const options = columns
    .map((column) => parseInt(column.id))
    .filter((option) => option !== estado);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={color} aria-label="recipe"></Avatar>}
        action={
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <IconButton
              aria-label="settings"
              onClick={handleClick}
              sx={{ marginBottom: "-40%" }}
            >
              <MoreVertIcon />
            </IconButton>
            <IconButton aria-label="settings" onClick={deleteItem}>
              <DeleteIcon />
            </IconButton>
          </Box>
        }
        title={title}
        subheader={fecha}
      />
      <CardActions disableSpacing>
        Descripción
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{descripcion}</Typography>
        </CardContent>
      </Collapse>

      <Popover
        id={idPopover}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        enviar a :
        {options.map((option) => (
          <React.Fragment key={option}>
            <br />
            <Button
              onClick={() =>
                handleChangeEstado && handleChangeEstado(id, option)
              }
            >
              {columns.find((column) => parseInt(column.id) === option)?.title}
            </Button>
          </React.Fragment>
        ))}
      </Popover>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este elemento?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose}>Cancelar</Button>
          <Button onClick={handleDeleteConfirmationConfirm} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
