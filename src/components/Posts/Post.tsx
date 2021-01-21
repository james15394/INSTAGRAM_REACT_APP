import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Ava1 from "../../assets/images/ava1.jpg";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import SendIcon from "@material-ui/icons/Send";
import FlagIcon from "@material-ui/icons/Flag";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useStyles } from "./Post.styles";
import { db } from "../../firebase";
import { RootState } from "../../store";
import firebase from "firebase";

interface Data {
  user: string;
  comment: string;
}
const Post = () => {
  const user: object = useSelector((state: RootState) => state.user.entities);
  //@ts-expect-error
  const userName = user.user.email;
  //@ts-expect-error
  const uid = user.user.uid;
  //@ts-expect-error
  const id = user.id;
  const classes = useStyles();
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Data[]>([{ user: "", comment: "" }]);
  useEffect(() => {
    let unsubscribe: any;
    if (id) {
      unsubscribe = db
        .collection("posts")
        .doc(uid)
        .collection("comments")
        .orderBy("timeStamp", "desc")
        //@ts-expect-error
        .onSnapshot((doc) => setComments(doc.docs.map((item) => item.data())));
    }
    return () => {
      unsubscribe();
    };
  }, [id]);
  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    comment &&
      user &&
      db.collection("posts").doc(uid).collection("comments").add({
        comment: comment,
        user: userName,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setComment("");
  };
  return (
    <>
      <Card>
        <div className={classes.header}>
          <CardHeader
            avatar={<Avatar />}
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          ></CardHeader>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </div>

        <CardMedia image={Ava1} style={{ width: "100%", height: "700px" }} />
        <CardContent>
          <Grid
            container
            justify="space-between"
            wrap="nowrap"
            style={{ padding: 0 }}
          >
            <Grid container>
              <IconButton>
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton>
                <ModeCommentIcon />
              </IconButton>
              <IconButton>
                <SendIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <FlagIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="subtitle1" style={{ paddingLeft: "8px" }}>
            <strong>122 likes</strong>
          </Typography>
          {comments.map((x) => (
            <Typography variant="subtitle1">
              <strong>{x.user} </strong>
              {x.comment}
            </Typography>
          ))}
        </CardContent>
        <Divider />
        <CardActions>
          <form
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "100%",
            }}
          >
            <InputBase
              placeholder="Add a comment"
              onChange={handleComment}
              name="comment"
              value={comment}
            />
            <Button type="submit" onClick={handleSubmit} disabled={!comment}>
              Post
            </Button>
          </form>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
