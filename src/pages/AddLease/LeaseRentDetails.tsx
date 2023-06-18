import React, { useState } from "react";
import {
  Heading,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { LeaseBasicDetailsProp } from "./LeaseBasicDetails";

const LeaseRentDetails = ({
  setLeaseDetails,
  leaseDetails,
}: LeaseBasicDetailsProp) => {
  // const [calMethod, setCalMethod] = useState<string>("");

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLeaseDetails({
      ...leaseDetails,
      frequency: event.target.value,
    });
  };

  const handleOptionGenerationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLeaseDetails({
      ...leaseDetails,
      calMethod: event.target.value,
    });
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Lease Rent Details
      </Heading>
      <Flex>
        <FormControl mr="3%">
          <FormLabel htmlFor="entity-name" fontWeight={"normal"}>
            Rental Amount
          </FormLabel>
          <NumberInput
            onChange={(value: string) =>
              setLeaseDetails({
                ...leaseDetails,
                rentalAmount: parseFloat(value),
              })
            }
            value={leaseDetails.rentalAmount}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl mr="3%">
          <FormLabel htmlFor="lease-name" fontWeight={"normal"}>
            Frequency
          </FormLabel>
          <Select
            id="frequency"
            name="frequency"
            autoComplete="frequency"
            placeholder="Select frequency"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            onChange={handleFrequencyChange}
            value={leaseDetails.frequency}
          >
            <option>Monthly</option>
            <option>Monthly/Arr</option>
            <option>Quarterly</option>
            <option>Quarterly/Arr</option>
          </Select>
        </FormControl>
      </Flex>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="generation_option"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Street address
        </FormLabel>
        <Select
          id="option_generation"
          name="option_generation"
          autoComplete="option_generation"
          placeholder="Select method"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={handleOptionGenerationChange}
          value={leaseDetails.calMethod}
        >
          <option>Automatic Calculation</option>
          <option>Manual Calculation</option>
        </Select>
      </FormControl>
    </>
  );
};

export default LeaseRentDetails;
