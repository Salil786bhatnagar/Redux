import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(5),
    },
  },
}));

function Firstpage() {
  const [open, setOpen] = React.useState(false);
  const [getTitle, setTitle] = useState("");
  const [getId, setId] = useState(new Date().valueOf());
  const [getRefresh, setRefresh] = useState(true);
  const [getDiscription, setDiscription] = useState("");
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.to_do);
  const toDoitems = Object.values(selector);

  const handleClick = () => {
    setOpen(false);
    var body = {
      id: getId,
      title: getTitle,
      discription: getDiscription,
    };
    dispatch({ type: "TO_DO", payload: [body.id, body] });
  };

  const handleClickOpen = () => {
    setOpen(true);
  }; //// const toDoitems    = Object.values(selector)

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          ADD TO DO
        </Button>
        <Dialog
          open={open}
          //   TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <center> ADD TO DO</center>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <TextField
                required
                id="standard-required"
                label="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description">
              <TextField
                required
                id="standard-required"
                label="discription"
                onChange={(e) => setDiscription(e.target.value)}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClick} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {showData()}
      </div>
    </div>
  );

  function showData() {
    return toDoitems.map((item) => {
      return (
        <div>
          <Paper elevation={2} />
          {item.title}
          <br />
          {item.discription}
          <div>
            <Paper />

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(item)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelet(item)}
            >
              Delete
            </Button>
            <Button variant="contained">Complet</Button>
            <br />
          </div>
        </div>
      );
    });
  }
  function handleDelet(item) {
    dispatch({ type: "Delete_item", payload: [item.id] });
    setRefresh(!getRefresh);
  }

  function handleEdit(item) {
    setOpen(true);
    setId(item.id);
    setTitle(item.title);
    setDiscription(item.discription);
  }
}

export default Firstpage;
