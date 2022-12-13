import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircle from "@mui/icons-material/AccountCircle";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";

import { NativeSelect, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAndUpdatePasswordFun,
  resetPasswordFun,
  resetUsernameSuccess,
} from "../../../Redux/action";
import freeLoadGif from "../../../assets/gif/loaderspinnergif.gif";

function ResetPassword() {
  const steps = ["User Detail", "Security Question", "Reset Password"];
  const [openFromDialogResetPassword, setOpenFromDialogResetPassword] =
    React.useState(true);

  const [buttonDisable, setButtonDisable] = React.useState(true);
  const { resetPasswordLoadingFlag, resetPasswordSuccessData } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const [inputUserDetail, setInputBoxUserDetail] = React.useState({
    username: "",
    email: "",
    number: "",
  });
  const [flagOneTimeValid, setFlagOneTimeValid] = React.useState(true);

  // Key press input part
  const handleOnChangeInputBoxUserDetail = (e) => {
    const { name, value } = e.target;
    setInputBoxUserDetail({ ...inputUserDetail, [name]: value });
  };

  const inputUserDetailStep1 = (event) => {
    event.preventDefault();
    dispatch(resetPasswordFun(inputUserDetail));
    setInputBoxUserDetail({
      username: "",
      email: "",
      number: "",
    });
  };

  const [inputBoxSecurityQuestion, setInputBoxSecurityQuestion] =
    React.useState({
      securityAnswer1: "",
      securityAnswer2: "",
    });

  // Key press input part
  const handleOnChangeInputBoxSecurityQuestion = (e) => {
    const { name, value } = e.target;
    setInputBoxSecurityQuestion({ ...inputBoxSecurityQuestion, [name]: value });
  };

  const inputUserDetailStep2 = (event) => {
    event.preventDefault();

    if (
      inputBoxSecurityQuestion.securityAnswer1 ===
        resetPasswordSuccessData.user.securityAnswer1 &&
      inputBoxSecurityQuestion.securityAnswer2 ===
        resetPasswordSuccessData.user.securityAnswer2
    ) {
      handleComplete();
    } else {
      alert("Enter Right Answers");
    }

    setInputBoxSecurityQuestion({
      securityAnswer1: "",
      securityAnswer2: "",
    });
  };

  const [inputBoxNewPassword, setInputBoxNewPassword] = React.useState({
    password: "",
    confirmPassword: "",
  });

  // Key press input part
  const handleOnChangeInputBoxNewPassword = (e) => {
    const { name, value } = e.target;
    if (inputBoxNewPassword.password >= 8) {
      setButtonDisable(false);
    }
    setInputBoxNewPassword({ ...inputBoxNewPassword, [name]: value });
  };

  const inputUserDetailStep3 = (event) => {
    event.preventDefault();
    inputBoxNewPassword.user = resetPasswordSuccessData.user._id;
    dispatch(resetAndUpdatePasswordFun(inputBoxNewPassword));
    setInputBoxNewPassword({
      password: "",
      confirmPassword: "",
    });
    handleComplete();
  };

  // Password show and hide button part
  const [valuesPasswordViewPart, setvaluesPasswordViewPart] =
    React.useState(false);
  const handleClickShowPassword = () => {
    setvaluesPasswordViewPart(!valuesPasswordViewPart);
  };
  const [valuesConfirmPasswordViewPart, setvaluesConfirmPasswordViewPart] =
    React.useState(false);
  const handleClickShowConfirmPassword = () => {
    setvaluesConfirmPasswordViewPart(!valuesConfirmPasswordViewPart);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    dispatch(resetUsernameSuccess(null));
    setOpenFromDialogResetPassword(false);
  };

  if (
    resetPasswordSuccessData !== null &&
    resetPasswordSuccessData !== undefined &&
    flagOneTimeValid &&
    resetPasswordSuccessData.success
  ) {
    handleComplete();
    setFlagOneTimeValid(false);
  } else if (
    resetPasswordSuccessData !== null &&
    resetPasswordSuccessData !== undefined &&
    flagOneTimeValid &&
    !resetPasswordSuccessData.success
  ) {
    alert(resetPasswordSuccessData.message);
  }

  return (
    <Dialog open={openFromDialogResetPassword}>
      <DialogTitle
        style={{ textAlign: "center", fontSize: "28px", fontWeight: "600" }}
      >
        {" "}
        Reset Password{" "}
      </DialogTitle>
      <DialogContent style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit">{label}</StepButton>
              </Step>
            ))}
          </Stepper>
          <Box>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography
                  component="div"
                  sx={{ mt: 2, mb: 1 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "22px",
                  }}
                >
                  Your password successfully updated !
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Close</Button>
                </Box>
              </React.Fragment>
            ) : (
              <Typography
                component="div"
                sx={{ mt: 2, mb: 1, py: 1 }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {activeStep === 0 ? (
                  <form
                    className="welcome_resetusername_formOutsideBox"
                    onSubmit={inputUserDetailStep1}
                  >
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="welcome_resetusername_username">
                        {" "}
                        Enter Your Username{" "}
                      </InputLabel>
                      <Input
                        type="number"
                        required
                        onChange={handleOnChangeInputBoxUserDetail}
                        name="username"
                        value={inputUserDetail.username}
                        id="welcome_resetusername_username"
                        endAdornment={
                          <Tooltip title="Enter your 13 digit username">
                            <IconButton style={{ width: "40px" }}>
                              <AccountCircle />
                            </IconButton>
                          </Tooltip>
                        }
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="welcome_resetusername_email">
                        {" "}
                        Enter Your Email{" "}
                      </InputLabel>
                      <Input
                        required
                        type="email"
                        onChange={handleOnChangeInputBoxUserDetail}
                        name="email"
                        value={inputUserDetail.email}
                        id="welcome_resetusername_email"
                        endAdornment={
                          <Tooltip title="Enter your email address">
                            <IconButton style={{ width: "40px" }}>
                              <MailIcon />
                            </IconButton>
                          </Tooltip>
                        }
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="welcome_resetusername_number">
                        {" "}
                        Enter Your Number{" "}
                      </InputLabel>
                      <Input
                        required
                        type="number"
                        onChange={handleOnChangeInputBoxUserDetail}
                        name="number"
                        value={inputUserDetail.number}
                        id="welcome_resetusername_number"
                        endAdornment={
                          <Tooltip title="Enter your phone number">
                            <IconButton style={{ width: "40px" }}>
                              <PhoneIcon />
                            </IconButton>
                          </Tooltip>
                        }
                      />
                      {inputUserDetail.number === "" ||
                      inputUserDetail.number.length === 10 ? (
                        ""
                      ) : (
                        <p style={{ color: "red", textAlign: "start" }}>
                          Enter 10 digit number
                        </p>
                      )}
                    </FormControl>
                    <Stack
                      direction="row"
                      spacing={1}
                      style={{ margin: "auto" }}
                    >
                      <Button type="submit">
                        {resetPasswordLoadingFlag ? (
                          <img
                            src={freeLoadGif}
                            alt=""
                            style={{ width: "50px" }}
                          />
                        ) : (
                          "Next Step"
                        )}
                      </Button>
                      <Button onClick={handleReset}>Close</Button>
                    </Stack>
                  </form>
                ) : activeStep === 1 ? (
                  <form
                    className="welcome_resetusername_formOutsideBox"
                    onSubmit={inputUserDetailStep2}
                  >
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel
                        variant="standard"
                        htmlFor="welcome_resetusername_securityQuestion1"
                      >
                        {" "}
                        Security Question
                      </InputLabel>
                      <NativeSelect
                        id="welcome_resetusername_securityQuestion1"
                        value={resetPasswordSuccessData.user.securityQuestion1}
                        onChange={handleOnChangeInputBoxSecurityQuestion}
                        name="securityQuestion1"
                        disabled
                      >
                        {forgotPasswordQuestionsList.map((ques, index) => (
                          <option key={index} value={ques}>
                            {ques}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="welcome_resetusername_securityAnswer1">
                        {" "}
                        Security Question Answer
                      </InputLabel>
                      <Input
                        required
                        onChange={handleOnChangeInputBoxSecurityQuestion}
                        name="securityAnswer1"
                        value={inputBoxSecurityQuestion.securityAnswer1}
                        id="welcome_resetusername_securityAnswer1"
                        endAdornment={
                          <Tooltip title="Enter Answer">
                            <IconButton style={{ width: "40px" }}>
                              <QuestionMarkIcon />
                            </IconButton>
                          </Tooltip>
                        }
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel
                        variant="standard"
                        htmlFor="welcome_resetusername_securityQuestion2"
                      >
                        {" "}
                        Security Question
                      </InputLabel>
                      <NativeSelect
                        id="welcome_resetusername_securityQuestion2"
                        value={resetPasswordSuccessData.user.securityQuestion2}
                        onChange={handleOnChangeInputBoxSecurityQuestion}
                        name="securityQuestion2"
                        disabled
                      >
                        {forgotPasswordQuestionsList.map((ques, index) => (
                          <option key={index} value={ques}>
                            {ques}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="welcome_resetusername_securityAnswer2">
                        {" "}
                        Security Question Answer
                      </InputLabel>
                      <Input
                        required
                        onChange={handleOnChangeInputBoxSecurityQuestion}
                        name="securityAnswer2"
                        value={inputBoxSecurityQuestion.securityAnswer2}
                        id="welcome_resetusername_securityAnswer2"
                        endAdornment={
                          <Tooltip title="Enter Answer">
                            <IconButton style={{ width: "40px" }}>
                              <QuestionMarkIcon />
                            </IconButton>
                          </Tooltip>
                        }
                      />
                    </FormControl>
                    <Stack
                      direction="row"
                      spacing={1}
                      style={{ margin: "auto" }}
                    >
                      <Button type="submit">Next Step</Button>
                      <Button onClick={handleReset}>Close</Button>
                    </Stack>
                  </form>
                ) : (
                  <form
                    className="welcome_resetusername_formOutsideBox"
                    onSubmit={inputUserDetailStep3}
                  >
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="welcome_resetusername_password">
                        Password
                      </InputLabel>
                      <Input
                        required
                        name="password"
                        value={inputBoxNewPassword.password}
                        id="welcome_resetusername_password"
                        type={valuesPasswordViewPart ? "text" : "password"}
                        onChange={handleOnChangeInputBoxNewPassword}
                        endAdornment={
                          <Tooltip title="Password length more then 8">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              style={{ width: "40px" }}
                            >
                              {valuesPasswordViewPart ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </Tooltip>
                        }
                      />
                    </FormControl>
                    <FormControl
                      sx={{ m: 1, width: "100%" }}
                      variant="standard"
                    >
                      <InputLabel htmlFor="welcome_resetusername_confirmPassword">
                        Confirm Password
                      </InputLabel>
                      <Input
                        required
                        name="confirmPassword"
                        value={inputBoxNewPassword.confirmPassword}
                        id="welcome_resetusername_confirmPassword"
                        type={
                          valuesConfirmPasswordViewPart ? "text" : "password"
                        }
                        onChange={handleOnChangeInputBoxNewPassword}
                        endAdornment={
                          <Tooltip title="Enter same as password">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleClickShowConfirmPassword}
                              style={{ width: "40px" }}
                            >
                              {valuesConfirmPasswordViewPart ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </Tooltip>
                        }
                      />
                      {inputBoxNewPassword.confirmPassword === "" ||
                      inputBoxNewPassword.password ===
                        inputBoxNewPassword.confirmPassword ? (
                        ""
                      ) : (
                        <p style={{ color: "red", textAlign: "start" }}>
                          Enter the same password
                        </p>
                      )}
                    </FormControl>
                    <Stack
                      direction="row"
                      spacing={1}
                      style={{ margin: "auto" }}
                    >
                      <Button type="submit" disabled={buttonDisable}>
                        Update Password
                      </Button>
                      <Button onClick={handleReset}>Close</Button>
                    </Stack>
                  </form>
                )}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ResetPassword;

const forgotPasswordQuestionsList = [
  "What is your favorite movie?",
  "What is the first and last name of your first boyfriend or girlfriend?",
  "Which phone number do you remember most from your childhood?",
  "What was your favorite place to visit as a child?",
  "Who is your favorite actor, musician, or artist?",
  "What is the name of your favorite pet?",
  "In what city were you born?",
  "What high school did you attend?",
  "What is the name of your first school?",
  "What is your mother's maiden name?",
  "What street did you grow up on?",
  "What was the make of your first car?",
  "When is your anniversary?",
  "What is your favorite color?",
  "What is your father's middle name?",
  "What is the name of your first grade teacher?",
  "What was your high school mascot?",
  "Which is your favorite web browser?",
  "what is your favorite website?",
  "what is your favorite forum?",
  "what is your favorite online platform?",
  "what is your favorite social media website?",
];
