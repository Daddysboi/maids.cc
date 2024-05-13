import PropTypes from "prop-types";
import { Form, Formik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createEditService } from "../redux/features/serviceSlice";

import Button from "./Button";
import AppInput from "./Input";
import AppSelectInput from "./SelectInput";
import ErrorRed from "./Error";
import Loading from "./Loading";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { primaryColors } from "../assets/Colors";

import serviceList from "../data/serviceList.json";

const Header = styled.h1`
  margin-bottom: 1rem;
`;

const Multiple = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Bottom = styled.div`
  margin-top: 1rem;
`;

const Trash = styled(FaTrash)`
  margin-top: 1rem;
  font-size: 0.7rem;
  color: red;
  &:hover {
    color: #a6aabc;
    padding-top: 0.1rem;
  }
`;

const CreateService = ({
  setIsCreating,
  editing = false,
  service = undefined,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.service);

  const initialValues = {
    subjectTitle: "",
    services: [""],
  };

  if (service !== undefined) {
    initialValues.subjectTitle = service?.subjectTitle;
    initialValues.services = service.services || [""];
  }

  const validationSchema = Yup.object().shape({
    subjectTitle: Yup.string().required("Service Title is required"),
    services: Yup.array().min(1, "At least one Service is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);

    let data = {
      subjectTitle: values.subjectTitle,
      services: values.services,
    };

    dispatch(createEditService(data, editing))
      .unwrap()
      .then((res) => {
        toast.success(res?.payload?.message || "Successfull " + service);
        resetForm();
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form>
          <Header> {editing ? "Update" : "Create"} Service</Header>
          <>
            <Field
              as={AppInput}
              label="Service Title"
              name="serviceTitle"
              placeholder="Service Title"
              type="text"
              height="2.2rem"
            />
            <ErrorMessage name="serviceTitle" component={ErrorRed} />
          </>
          <FieldArray name="Services">
            {({ push, remove }) => (
              <>
                {values.services.map((_, index) => (
                  <Multiple key={index}>
                    <Field
                      name={`services.${index}`}
                      as={AppSelectInput}
                      label={index === 0 ? "Services" : ""}
                      type="select"
                      options={serviceList}
                      required={true}
                      width="100%"
                    />
                    {index !== 0 && <Trash onClick={() => remove(index)} />}
                    <ErrorMessage
                      name={`Services.${index}`}
                      component={ErrorRed}
                    />
                  </Multiple>
                ))}

                <Bottom>
                  <Button
                    text="Select Service"
                    icon={<FaPlus />}
                    display="none"
                    textColor={`${primaryColors.Purple}`}
                    border={`1px solid ${primaryColors.Purple}`}
                    onClick={() => push("")}
                    hoverBg={primaryColors.LightPurple}
                  />
                </Bottom>
              </>
            )}
          </FieldArray>

          <Bottom>
            <Button disabled={Loading} text={`Save`} />
          </Bottom>
        </Form>
      )}
    </Formik>
  );
};

CreateService.propTypes = {
  setIsCreating: PropTypes.func,
  editing: PropTypes.bool,
  service: PropTypes.shape({
    _id: PropTypes.string,
    serviceTittle: PropTypes.string,
    serviceCode: PropTypes.string,
    serviceStatus: PropTypes.string,
  }),
};

export default CreateService;
