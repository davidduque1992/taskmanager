import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Fab,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { SxProps } from "@mui/system";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";

import CustomCard, {
  handleClickDelete,
} from "../../@core/components/cardComplexInteraction";
import filmmakersImage from "../../assets/multimedia/home-office-gea524a043_1920.jpg";
import FormDialog, { FormValues } from "./add";

import "./Styles.css";

const url = "http://localhost:3000/api/task";

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  estado: number;
  prioridad: number;
  fecha: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#d3d2d2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const columns = [
  { id: "1", title: "Por hacer" },
  { id: "2", title: "En progreso" },
  { id: "3", title: "Hecho" },
];

export default function Task() {
  const [initialTasks, setInitialTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedEstado, setSelectedEstado] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState<string>("titulo");
  const [searchString, setSearchString] = useState("");

  const handleSearchChange = (searchString: string) => {
    setSearchString(searchString);
  };

  const handleFilterChange = (event: SelectChangeEvent<number>) => {
    const estado = event.target.value as number;
    setSelectedEstado(estado);
  };

  const handleChangeEstado = (id: number, nuevoEstado: number) => {
    axios
      .put(
        `${url}/${id}/estado`,
        {
          estado: nuevoEstado,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .catch((response) => console.log(response));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const agregarTask = (data: FormValues) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const fecha = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    axios
      .post(
        url,
        {
          titulo: data.title,
          descripcion: data.descripcion,
          fecha: fecha,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .catch((error) => {
        console.error(error);
      });
  };

  const eliminarTask = (data: handleClickDelete) => {
    axios
      .delete(`${url}/${data.id}`)
      .catch((response) => console.log(response.data));
  };

  const handleOrderByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const newOrderBy = checked ? "titulo" : "fecha";
    setOrderBy(newOrderBy);
  };

  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setInitialTasks([...response.data.tareas]);
    });
  }, [agregarTask]);

  useEffect(() => {
    if (searchString.trim() === "") {
      // No hay texto de búsqueda, mostrar todas las tareas ordenadas
      let sortedTasks = [...initialTasks];

      if (orderBy !== "titulo") {
        sortedTasks.sort((a, b) => a.titulo.localeCompare(b.titulo));
      } else {
        sortedTasks.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
      }

      setFilteredTasks(sortedTasks);
    } else {
      // Realizar la búsqueda y filtrar las tareas
      const filteredTasks = initialTasks.filter((task) => {
        const { titulo, descripcion } = task;
        return (
          titulo.toLowerCase().includes(searchString.toLowerCase()) ||
          descripcion.toLowerCase().includes(searchString.toLowerCase())
        );
      });

      // Ordenar las tareas filtradas
      let sortedTasks = [...filteredTasks];

      if (orderBy !== "titulo") {
        sortedTasks.sort((a, b) => a.titulo.localeCompare(b.titulo));
      } else {
        sortedTasks.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
      }

      setFilteredTasks(sortedTasks);
    }
  }, [initialTasks, orderBy, searchString]);

  return (
    <>
      <Card className="min-witth-card " style={{ marginBottom: ".3%" }}>
        <CardMedia
          component="img"
          height="140"
          image={filmmakersImage}
          alt="filmmakers-gff7f896f3_1920.jpg"
        />
        <CardContent>
          <Divider style={{ marginBottom: "3%" }}>
            <Chip label="Gestor de tareas" />
          </Divider>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Filtrar por Nombre o descripción"
                variant="outlined"
                fullWidth
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="estado-select-label">
                  Filtrar por Estado
                </InputLabel>
                <Select
                  labelId="estado-select-label"
                  label="Filtrar por Estado"
                  value={selectedEstado}
                  onChange={handleFilterChange}
                >
                  <MenuItem value={0}>Todos</MenuItem>
                  <MenuItem value={1}>Por hacer</MenuItem>
                  <MenuItem value={2}>En progreso</MenuItem>
                  <MenuItem value={3}>Hecho</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              container
              justifyContent="center"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                Ordenar por título
                <Switch
                  checked={orderBy === "titulo"}
                  onChange={handleOrderByChange}
                  inputProps={{
                    "aria-label": "Ordenar por título o por fecha",
                  }}
                />
                <span>Ordenar por fecha</span>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card className="min-witth-card ">
        <CardContent>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={12}
              md={selectedEstado !== 1 ? 4 : 12}
              style={{
                display:
                  selectedEstado === 1 || selectedEstado === 0
                    ? "block"
                    : "none",
              }}
            >
              <h4>{columns[0].title}</h4>
              <Item key="item01">
                {filteredTasks
                  .filter((task) => task.estado === 1)
                  .map((task) => (
                    <React.Fragment key={task.id}>
                      <CustomCard
                        id={task.id}
                        title={task.titulo}
                        descripcion={task.descripcion}
                        fecha={task.fecha}
                        color={{ bgcolor: "red" }}
                        estado={task.estado}
                        handleChangeEstado={handleChangeEstado}
                        handleClickDelete={eliminarTask}
                        columns={columns}
                      />
                      <Divider light />
                    </React.Fragment>
                  ))}
              </Item>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={selectedEstado !== 2 ? 4 : 12}
              style={{
                display:
                  selectedEstado === 2 || selectedEstado === 0
                    ? "block"
                    : "none",
              }}
            >
              <h4>{columns[1].title}</h4>
              <Item key="item02">
                {filteredTasks
                  .filter((task) => task.estado === 2)
                  .map((task) => (
                    <React.Fragment key={task.id}>
                      <CustomCard
                        key={task.id}
                        id={task.id}
                        title={task.titulo}
                        descripcion={task.descripcion}
                        fecha={task.fecha}
                        color={{ bgcolor: "yellow" }}
                        estado={task.estado}
                        handleChangeEstado={handleChangeEstado}
                        handleClickDelete={eliminarTask}
                      />
                      <Divider light />
                    </React.Fragment>
                  ))}
              </Item>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={selectedEstado !== 3 ? 4 : 12}
              style={{
                display:
                  selectedEstado === 3 || selectedEstado === 0
                    ? "block"
                    : "none",
              }}
            >
              <h4>{columns[2].title}</h4>
              <Item key="item03">
                {filteredTasks
                  .filter((task) => task.estado === 3)
                  .map((task) => (
                    <React.Fragment key={task.id}>
                      <CustomCard
                        id={task.id}
                        key={task.id}
                        title={task.titulo}
                        descripcion={task.descripcion}
                        fecha={task.fecha}
                        color={{ bgcolor: "green" }}
                        estado={task.estado}
                        handleChangeEstado={handleChangeEstado}
                        handleClickDelete={eliminarTask}
                      />
                      <Divider light />
                    </React.Fragment>
                  ))}
              </Item>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Fab
        sx={fabStyle as SxProps}
        aria-label="Add"
        color="primary"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <FormDialog
        open={open}
        agregarTask={agregarTask}
        handleClose={handleClose}
      />
    </>
  );
}
