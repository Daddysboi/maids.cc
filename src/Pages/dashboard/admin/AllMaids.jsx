import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAllMaids } from "../../../redux/features/userSlice";
import { setCreateModal } from "../../../redux/features/modalSlice";
import { setUsers } from "../../../redux/features/userSlice";

import RoleHeader from "../../../components/RoleHeader";
import CreateUser from "../../../components/CreateUser";
import SideBar from "../../../components/SideBar";
import Loading from "../../../components/Loading";
import ProfileCard from "../../../components/ProfileCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: ${(props) => (props.createModal ? "80%" : "")};
  transition: width 0.5s ease;
`;

const Cards = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const options1 = ["Home Maid"];
const options2 = ["Monthly"];

const AllMaids = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users: maids, isLoading: loading } = useAppSelector(
    (state) => state.user
  );
  const { query: searchValue } = useAppSelector((state) => state.query);
  const { createModal } = useAppSelector((state) => state.modal);

  useEffect(() => {
    dispatch(getAllMaids(1))
      .unwrap()
      .then((resp) => {
        dispatch(setUsers(resp.data));
      })
      .catch((error) => {});
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleEdit = (maid) => {
    dispatch(setCreateModal(true));
    setEditing(true);
    setUser(maid);
  };

  const handleDelete = (id) => {};

  return (
    <Container createModal={createModal}>
      <RoleHeader
        text="Add Maid"
        users={maids}
        sort
        onClick={() => {
          dispatch(setCreateModal(true));
        }}
      />

      <Cards>
        {maids
          ?.filter((val) => {
            let searchVal = searchValue?.toLowerCase();
            if (!searchVal) return true;
            return (
              val.first_name?.toLowerCase().startsWith(searchVal) ||
              val.middle_name?.toLowerCase().startsWith(searchVal) ||
              val.lastName?.toLowerCase().startsWith(searchVal) ||
              val.gender?.toLowerCase().startsWith(searchVal)
            );
          })
          ?.map((maid) => (
            <ProfileCard
              maid
              role="Maid"
              header1="TYPE"
              header2="DURATION"
              options1={options1}
              options2={options2}
              name={`${maid?.first_name} ${maid?.last_name}`}
              id={maid?.id}
              key={maid?.id}
              user={maid}
              img={maid.avatar}
              onEdit={() => handleEdit(maid)}
              onDelete={() => handleDelete(maid?._id)}
              onClick={() => navigate(`${maid?.id}`)}
            />
          ))}
      </Cards>

      <SideBar
        isOpen={createModal}
        onClose={() => {
          dispatch(setCreateModal(false));
          setEditModal(false);
        }}
        hasCloseBtn={true}
      >
        <CreateUser
          editing={editing}
          role="maid"
          user={user}
          setIsCreating={createModal}
        />
      </SideBar>
    </Container>
  );
};

export default AllMaids;
