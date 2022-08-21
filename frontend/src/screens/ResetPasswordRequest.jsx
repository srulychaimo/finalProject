import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Input from "../common/Input";

import { login, resetPasswordEmail } from "../store/actions/userActions";
import Joi from "joi";
import validateFormikUsingJoi from "../utils/validateFormikUsingJoi";
import { emailRegex, emailRegexError } from "../utils/regex";
import Meta from "../common/Meta";
import Loader from "../common/Loader";
import Message from "../common/Message";
import { toast } from "react-toastify";

const ResetPasswordRequest = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.userPasswordResetEmail
  );

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
    },
    validate: validateFormikUsingJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .regex(emailRegex)
        .messages(emailRegexError)
        .required()
        .label("Email"),
    }),
    onSubmit(values) {
      dispatch(resetPasswordEmail(values));
    },
  });

  useEffect(() => {
    if (success) {
      toast.success("Email was successfully send!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [success]);

  return (
    <>
      <Meta title="Jersey Store - Reset Password Request" />
      <FormContainer>
        <h1>Enter your email</h1>
        <p>U will receive a URL to change your password</p>

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={form.handleSubmit}>
          <Input
            {...form.getFieldProps("email")}
            error={form.touched.email && form.errors.email}
            label="Email Address"
            placeholder="Enter Email"
          />

          <Button
            type="submit"
            variant="primary"
            className="my-3"
            disabled={!form.isValid}
          >
            Send email
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ResetPasswordRequest;
