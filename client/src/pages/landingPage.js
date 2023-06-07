import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import api from "../utils/api";

const cards = [1, 2, 3];

const defaultTheme = createTheme();

export default function LandingPage() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [heading, setHeading] = React.useState("");
  const [body, setBody] = React.useState("");
  const [blogID, setBlogID] = React.useState("");
  const [blogs, setBlogs] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);

  React.useEffect(() => {
    const getBlog = async () => {
      const response = await api.get("/blog");
      setBlogs(response?.data?.blogs);
    };
    getBlog();
  }, [open, isDelete]);

  const handleClickOpen = async (card) => {
    setOpen(true);
    if (card) {
      setHeading(card.heading);
      setBody(card.body);
      setBlogID(card._id);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
      const data = await api.put("/blog", { heading, body, blogID });
      setIsEdit(false);
    } else {
      await api.post("/blog", { heading, body });
    }
    setHeading("");
    setBody("");
    handleClose();
  };

  const deleteBlog = async (id) => {
    setIsDelete(false);
    await api.delete("/blog", { params: { id } });
    setIsDelete(true);
  };

  const searchBlog = async (val) => {
    const response = await api.get(`/blog/search`, {
      params: { keyword: val },
    });
    setBlogs(response?.data?.blogs);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Blogs
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={logOut}
          >
            LogOut
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Blogs
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Search Blog</Button> */}
              <TextField
                autoFocus
                margin="dense"
                id="blogHeading"
                label="Search Blog"
                type="blogHeading"
                fullWidth
                variant="standard"
                // value={heading}
                onChange={(e) => searchBlog(e.target.value)}
              />
              <Button variant="outlined" onClick={handleClickOpen}>
                Add Blog
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {blogs?.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.heading}
                    </Typography>
                    <Typography>{card.body}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        handleClickOpen(card);
                        setIsEdit(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button size="small" onClick={() => deleteBlog(card._id)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogTitle>Blog</DialogTitle>
        <DialogContent>
          <DialogContentText>Add Blog</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="blogHeading"
            label="Blog Heading"
            type="blogHeading"
            fullWidth
            variant="standard"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Body</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="blogBody"
            label="Blog Body"
            type="blogBody"
            fullWidth
            variant="standard"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{ alignSelf: "center" }}>
          <Button onClick={handleSubmit} variant="contained">
            {isEdit === true ? `Edit Blog` : `Add Blog`}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
