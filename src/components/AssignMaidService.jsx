import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import { assignMaid } from "../redux/features/serviceSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllMaids } from "../redux/features/userSlice";

import Button from "./Button";
import AppSelectInput from "./SelectInput";
import serviceList from "../data/serviceList.json";
import Loading from "./Loading";
import { primaryColors } from "../assets/Colors";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
`;

const Subhead = styled.p`
  font-size: 0.7rem;
  margin-bottom: 1rem;
`;

const FieldSelect = styled(Field)`
  width: ${(props) => props.width || "100%"};
  min-height: 35px;
  min-width: 5rem;
  height: ${(props) => props.height || "35px"};
  padding: 0.5rem;
  box-sizing: border-box;
  display: block;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.borderColor || primaryColors.LightPurple};
  outline: none;
  background: transparent;
  font-size: 0.8rem;

  &:focus {
    border: 1px solid rgb(194, 194, 194);
  }
`;

const Option = styled.option`
  font-size: 13px;
  opacity: 0.5;
`;

const AssignMaidService = () => {
  const initialState = {
    subject: "",
    class: "",
    teacherId: "",
  };

  const [formData, setFormData] = useState(initialState);

  const dispatch = useAppDispatch();
  const { users: maids, isLoading } = useAppSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "service") {
      setFormData((prevData) => ({ ...prevData, subject: "" }));
    }
  };

  useEffect(() => {
    dispatch(getAllMaids())
      .unwrap()
      .then((resp) => {
        toast.success(
          resp?.payload?.message || "Successfully fetched services"
        );
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
      })
      .finally(() => {});
  }, [dispatch, maids]);

  if (isLoading) {
    return <Loading />;
  }

  const initialValues = {
    courseTittle: "",
    courseCode: "",
    courseStatus: "",
  };

  const validationSchema = Yup.object();
  const onSubmit = (e) => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <Subhead>Please Assign Maid to Service</Subhead>
        </div>

        <Container>
          <Field
            select="Services..."
            name="service"
            as={AppSelectInput}
            options={serviceList}
            required={true}
            onChange={handleChange}
          />

          <div>
            <FieldSelect
              name="maidId"
              as="select"
              required
              onChange={handleChange}
            >
              <Option value={formData.teacherId}>Maid...</Option>
              {maids &&
                maids.map((maid) => (
                  <Option key={maid?._id} value={maid?._id}>
                    {`${maid?.first_name} ${maid?.last_name}`}
                  </Option>
                ))}
            </FieldSelect>
          </div>

          <Button disabled={isLoading} text={`Assign`} />
        </Container>
      </Form>
    </Formik>
  );
};

AssignMaidService.propTypes = {
  setIsAssigning: PropTypes.func,
};

export default AssignMaidService;
