import {
  Button,
  ButtonBase,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useStyles } from "../SignUp/SignUp.styles";
import * as Yup from "yup";
import InputField from "../FormFields/InputField";
import Logo from "../../assets/images/logobig.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import { useHistory } from "react-router-dom";
import { LoginValues } from "../../Types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imageWrap from "../../assets/images/loginWrap.png";
import { images } from "../SignUp/imageData";

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (
    values: LoginValues,
    { setSubmitting }: { setSubmitting: any }
  ) => {
    const { emailOrName, passWord } = values;
    setLoading(true);
    if (values) {
      auth
        .signInWithEmailAndPassword(emailOrName, passWord)
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
      <div
        style={{
          position: "absolute",
          left: 145,
          top: 90,
          width: "250px",
          height: "300px",
        }}
      >
        <Slider {...settings}>
          {images.map((x) => (
            <div>
              <img
                src={x.image}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className={classes.container} style={{ minWidth: 300 }}>
        <div className={classes.input}>
          <img src={Logo} alt="" />

          <Formik
            initialValues={{
              emailOrName: "",
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
              return (
                <Form>
                  <InputField
                    label="Email/ Name"
                    name="emailOrName"
                    type="text"
                  />

                  <InputField label="Password" name="passWord" type="text" />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    endIcon={
                      loading ? (
                        <CircularProgress size={20} color="secondary" />
                      ) : (
                        ""
                      )
                    }
                  >
                    Log in
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <div className="divider">
            <div className="line" />
            <div className="or">OR</div>
            <div className="line" />
          </div>
          <Button
            disableRipple
            startIcon={<FacebookIcon />}
            style={{ background: "transparent", color: "rgb(35 43 141)" }}
          >
            Login with facebook
          </Button>
          <ButtonBase style={{ fontSize: "12px" }}>Forgot password</ButtonBase>
        </div>
        <Typography variant="subtitle1">
          Don't you have an account ?{" "}
          <Button
            onClick={() => history.push("/signup")}
            style={{ color: "#0095f6", textTransform: "capitalize" }}
          >
            Sign up
          </Button>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
