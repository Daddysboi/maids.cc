import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { toast } from "react-toastify";

import AppInput from "../../../components/Input";
import AppSelectInput from "../../../components/SelectInput";
import Error from "../../../components/Error";
import WebcamCapture from "../../../components/WebcamCapture";
import { fileToDataUri } from "./ProfileSettings";
import { useAppDispatch } from "../../../redux/hooks";
import { useFetchUserData } from "../../../Guard";
import { updateUserKycDetails } from "../../../redux/features/userSlice";

const KYCContainer = styled.div`
  width: 30rem;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const ImgViewer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid black;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const options = [
  { value: "nationalID", label: "National ID" },
  { value: "driversLicense", label: "Drivers License" },
  { value: "votersCard", label: "Voters Card" },
];

const KYC = ({
  user,
  Button,
  Title,
  FileInputContainer,
  StyledLabel,
  UploadButton,
  FaCloudUploadAlt,
}) => {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const fetchUserData = useFetchUserData();
  const [imgPlaceholder, setImgPlaceholder] = useState(true);
  const [idPlaceholder, setIdPlaceholder] = useState(true);

  const initialValues = {
    idType: user?.identificationDetails?.idType || "",
    idNumber: user?.identificationDetails?.idNumber || "",
    fullName: user?.nextOfKin?.fullName || "",
    relationship: user?.nextOfKin?.relationship || "",
    contactNumber: user?.nextOfKin?.contactNumber || "",
    bvn: user?.bvn || "",
    uploadPicture: user?.idCard || null,
  };

  const validationSchema = Yup.object().shape({
    idType: Yup.string().required("ID Type is required"),
    idNumber: Yup.string().required("ID Number is required"),
    fullName: Yup.string().required("Next of Kin is required"),
    relationship: Yup.string().required("Relationship is required"),
    contactNumber: Yup.string().required(
      "Contact Number of Next of Kin is required"
    ),
    bvn: Yup.string().required("BVN is required"),
    uploadPicture: Yup.mixed().required("Please upload a picture."),
  });

  const onSubmit = async (values, { resetForm }) => {
    if (!imageSrc) {
      toast.error("Please upload a picture");
      return;
    }
    const formData = { ...values, takePicture: imageSrc };

    if (formData.uploadPicture.size > 500 * 1024) {
      toast.error("File size exceeds the limit of 500KB");
      return;
    }

    setLoading(true);
    const uri = await fileToDataUri(formData.uploadPicture);
    dispatch(
      updateUserKycDetails({
        headShot: formData?.takePicture,
        idType: formData?.idType,
        idNumber: formData?.idNumber,
        idCard: uri,
        nextOfKinFullName: formData?.fullName,
        nextOfKinRelationship: formData?.relationship,
        nextOfKinContactNumber: formData?.contactNumber,
        bvn: formData?.bvn,
        userId: user?._id,
      })
    )
      .then((resp) => {
        if (resp?.payload?.status !== 200) {
          toast.error(resp?.payload?.message || "Something went wrong");
          setLoading(false);
          return;
        }
        toast.success(resp?.payload?.message || "Successfully logged in");
        resetForm();
        setImageSrc("");
        setImgPlaceholder(true);
        setIdPlaceholder(true);
        fetchUserData();
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
        setLoading(false);
      });
  };

  return (
    <KYCContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <section
              style={{
                display: "flex",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <span onClick={() => setImgPlaceholder(false)}>
                <WebcamCapture imageSrc={imageSrc} setImageSrc={setImageSrc} />
              </span>
              {user?.headShot && !imageSrc && imgPlaceholder && (
                <ImgViewer>
                  <Img src={user?.headShot} alt="head-shot" />
                </ImgViewer>
              )}
            </section>
            <Title>Identification</Title>
            <Section>
              <div>
                <Field
                  name="idType"
                  value={values.idType}
                  onChange={handleChange}
                  component={AppSelectInput}
                  labelColor="gray"
                  label="Select Id"
                  type="select"
                  height="2rem"
                  width="20rem"
                  options={options}
                />

                <ErrorMessage name="idType" component={Error} />
              </div>{" "}
              <div>
                <Field
                  label="ID Number"
                  placeholder="Please enter a valid ID"
                  type="text"
                  name="idNumber"
                  value={values.idNumber}
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="idNumber" component={Error} />
              </div>{" "}
              <section
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                <div onClick={() => setIdPlaceholder(false)}>
                  <FileInputContainer>
                    <StyledLabel htmlFor="uploadPicture">
                      Upload Valid ID (Max 2MB)
                    </StyledLabel>
                    <div>
                      <UploadButton htmlFor="uploadPicture">
                        <FaCloudUploadAlt />
                      </UploadButton>
                      <div
                        style={{
                          display: "none",
                        }}
                      >
                        <Field
                          type="file"
                          name="uploadPicture"
                          onChange={(event) => {
                            setFieldValue(
                              "uploadPicture",
                              event.currentTarget.files[0]
                            );
                          }}
                          component={AppInput}
                          labelColor="gray"
                          accept="image/*"
                          border="none"
                        />
                      </div>
                    </div>
                    <ErrorMessage name="uploadPicture" component={Error} />
                    <span
                      style={{
                        opacity: "0.5",
                        fontSize: "0.6rem",
                      }}
                    >
                      {values?.uploadPicture && values?.uploadPicture.name}
                    </span>
                  </FileInputContainer>
                </div>
                {user?.identificationDetails?.idCard &&
                  !values?.uploadPicture &&
                  idPlaceholder && (
                    <ImgViewer>
                      <Img
                        src={user?.identificationDetails?.idCard}
                        alt="id-card"
                      />
                    </ImgViewer>
                  )}
              </section>
            </Section>
            <Section>
              <Title>Next of Kin</Title>
              <div>
                <Field
                  label="Full Name"
                  placeholder="Please enter Next of kin"
                  type="text"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="fullName" component={Error} />
              </div>{" "}
              <div>
                <Field
                  label="Relationship"
                  placeholder="Please enter relationship"
                  type="text"
                  name="relationship"
                  value={values.relationship}
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="relationship" component={Error} />
              </div>{" "}
              <div>
                <Field
                  label="Contact Number"
                  placeholder="Please enter contact number"
                  type="text"
                  name="contactNumber"
                  value={values.contactNumber}
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="contactNumber" component={Error} />
              </div>{" "}
            </Section>
            <Section>
              <Title>Bank Verification Number (BVN)</Title>
              <div>
                <Field
                  label="BVN"
                  placeholder="Please enter BVN"
                  type="text"
                  name="bvn"
                  value={values.bvn}
                  onChange={handleChange}
                  component={AppInput}
                  width="20rem"
                  labelColor="gray"
                  height="2rem"
                />
                <ErrorMessage name="bvn" component={Error} />
              </div>{" "}
            </Section>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit KYC"}
            </Button>
          </Form>
        )}
      </Formik>
    </KYCContainer>
  );
};

export default KYC;
