import styled from "styled-components";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa6";

import { useAppDispatch } from "../redux/hooks";
import { setUsers } from "../redux/features/userSlice";

import Sort from "./Sort";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: flex-end;
  width: 70vw;
  gap: 1rem;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const options = [
  { value: "type", label: "Type" },
  { value: "service", label: "Service" },
];

const RoleHeader = ({
  text,
  onClick,
  users,
  sort,
  edit,
  canDelete,
  onEdit,
  onDelete,
}) => {
  const dispatch = useAppDispatch();

  const sortUsers = (option) => {
    if (!users) return;

    const sortedUsers = [...users].sort((a, b) => {
      switch (option) {
        case "type":
          return a.first_name.localeCompare(b.first_name);
        case "service":
          return a.last_name.localeCompare(b.last_name);
        default:
          return 0;
      }
    });
    console.log(sortedUsers);
    dispatch(setUsers(sortedUsers));
  };

  return (
    <Container>
      {text && <Button text={text} onClick={onClick} icon={<FaPlus />} />}

      {edit && <Button text={edit} onClick={onEdit} icon={<FaPen />} />}

      {canDelete && (
        <Button text={canDelete} onClick={onDelete} icon={<FaTrash />} />
      )}

      {sort && <Sort options={options} onSort={sortUsers} />}
    </Container>
  );
};

export default RoleHeader;
