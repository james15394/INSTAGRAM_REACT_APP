import { Button, CircularProgress, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Logo from "../../assets/images/logobig.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../FormFields/InputField";
import { useStyles } from "./SignUp.styles";
import { Values } from "../../Types";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import imageWrap from "../../assets/images/loginWrap.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images } from "./imageData";

const SignUp = () => {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (
    values: Values,
    { setSubmitting }: { setSubmitting: any }
  ) => {
    setLoading(true);
    const { emailOrName, passWord } = values;
    if (values) {
      auth
        .createUserWithEmailAndPassword(emailOrName, passWord)
        .then((user) => {
          setLoading(false);
          history.push("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    setSubmitting(false);
  };
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
  };
  return (
    <div className={classes.root}>
      <div className={classes.imageWrap}>
        <img src={imageWrap} alt="" />
      </div>
      <div className={classes.imageSlide}>
        <Slider {...settings}>
          {images.map((x) => (
            <div>
              <img src={x.image} alt="" />
            </div>
          ))}
        </Slider>
      </div>
      <div className={classes.container}>
        <div className={classes.input}>
          <img src={Logo} alt="" />
          <Typography variant="h6">
            Sign up to see photos and videos from your friends.
          </Typography>
          <Button
            variant="contained"
            disableRipple
            startIcon={<FacebookIcon />}
          >
            Login with facebook
          </Button>
          <div className="divider">
            <div className="line" />
            <div className="or">OR</div>
            <div className="line" />
          </div>
          <Formik
            initialValues={{
              emailOrName: "",
              fullName: "",
              userName: "",
              passWord: "",
            }}
            validationSchema={Yup.object({
              emailOrName: Yup.string()
                .required("Email/Phone Number is required")
                .test(
                  "test-name",
                  "Enter Valid Phone/Email",
                  //@ts-expect-error
                  function (value: string | number) {
                    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
                    //@ts-expect-error
                    let isValidEmail = emailRegex.test(value);
                    //@ts-expect-error
                    let isValidPhone = phoneRegex.test(value);
                    if (!isValidEmail && !isValidPhone) {
                      return false;
                    }
                    return true;
                  }
                ),
              fullName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              userName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              passWord: Yup.string()
                .required("Required")
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => {
              console.log(isSubmitting);
              return (
                <Form>
                  <InputField
                    label="Email/ Name"
                    name="emailOrName"
                    type="text"
                  />
                  <InputField label="Fullname" name="fullName" type="text" />
                  <InputField label="Username" name="userName" type="text" />
                  <InputField label="Password" name="passWord" type="text" />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    endIcon={loading ? <CircularProgress /> : ""}
                  >
                    Sign up
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <Typography variant="subtitle2">
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy.
          </Typography>
        </div>
        <Typography variant="subtitle1">
          Have an account ?{" "}
          <Button
            onClick={() => history.push("/login")}
            style={{ color: "#0095f6", textTransform: "capitalize" }}
          >
            Log in
          </Button>
        </Typography>
      </div>
    </div>
  );
};

export default SignUp;
