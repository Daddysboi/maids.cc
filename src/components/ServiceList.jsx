import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Table } from "flowbite-react";

const Container = styled.div`
  width: 90%;
`;

const TableHead = styled(Table.Head)`
  text-align: left;
`;

const TableHeadCell = styled(Table.HeadCell)`
  padding: 0.5rem;
  background-color: transparent;
`;

const TableBody = styled(Table.Body)``;

const TableRow = styled(Table.Row)`
  &:nth-child(odd) {
    background-color: #fff;
  }
`;

const TableCell = styled(Table.Cell)`
  white-space: nowrap;
  font-weight: 500;
  padding: 0.5rem;
  &:nth-child(1) &:nth-child(2) {
    width: 10rem;
  }
  &:nth-child(3) {
    width: 40rem;
  }
`;

export const services = {
  Home: ["Baby Sitting", "Cooking", "Washing", "Cleaning", "Nany"],
  Outdoor: ["Errands", "Event Cook", "Ushers", "Cleaners", "Store Keeper"],
};

const ServiceList = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState("");

  const handleServiceSelect = (e) => {
    const selectedService = e.target.value;
    setSelectedService(selectedService);
    onSelectService(selectedService);
  };

  return (
    <Container>
      <Table>
        <TableHead>
          <TableHeadCell>Service</TableHeadCell>
          <TableHeadCell>Daily Service</TableHeadCell>
          <TableHeadCell>Longterm Services</TableHeadCell>
        </TableHead>
        <TableBody>
          {Object.entries(services)?.map(([category, services]) => (
            <React.Fragment key={category}>
              {services.map((service) => (
                <TableRow key={service} onClick={handleServiceSelect}>
                  <TableCell>{service}</TableCell>
                  <TableCell>
                    {service?.homeService || "Temporary Maids"}
                  </TableCell>
                  <TableCell>
                    {service?.outdoorService || "Longterm Maids"}
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

ServiceList.propTypes = {
  onSelectService: PropTypes.func.isRequired,
};

export default ServiceList;
