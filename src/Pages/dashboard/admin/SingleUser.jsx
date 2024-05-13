import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch } from "../../../redux/hooks";
import { getUserById } from "../../../redux/features/userSlice";

import Loading from "../../../components/Loading";
import BackButton from "../../../components/BackButton";

const Container = styled.div`
  font-size: 1rem;
  color: gray;
`;
const Img = styled.img`
  width: 10rem;
  margin-bottom: 1rem;
`;

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    dispatch(getUserById(id))
      .unwrap()
      .then((resp) => {
        setUser(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <BackButton />
      <Img src={user?.avatar} alt="" />
      <div>
        Name: {user?.first_name} {user?.last_name}
      </div>
      <div>Email: {user?.email}</div>
      Id: {user?.id}
    </Container>
  );
};

export default SingleUser;
