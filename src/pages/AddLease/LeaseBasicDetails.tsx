import React, { useState, useEffect } from "react";
import {
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { leaseDetailsProp } from "./AddLease";

interface LeaseBasicDetailsProp {
  setLeaseDetails: (leaseDetails: leaseDetailsProp) => void;
  leaseDetails: leaseDetailsProp;
}

const LeaseBasicDetails = ({
  setLeaseDetails,
  leaseDetails,
}: LeaseBasicDetailsProp) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  console.log("leaseDetails123", leaseDetails);
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Lease Basic Details
      </Heading>
      <Flex>
        <FormControl mr="3%">
          <FormLabel htmlFor="entity-name" fontWeight={"normal"}>
            Entity Name
          </FormLabel>
          <Input
            id="entity-name"
            onChange={(e) =>
              setLeaseDetails({ ...leaseDetails, entity: e.target.value })
            }
          />
        </FormControl>

        <FormControl mr="3%">
          <FormLabel htmlFor="lease-name" fontWeight={"normal"}>
            Lease Name
          </FormLabel>
          <Input
            id="lease-name"
            onChange={(e) =>
              setLeaseDetails({ ...leaseDetails, leaseName: e.target.value })
            }
          />
        </FormControl>
      </Flex>

      <Flex>
        <FormControl mt="2%" mr="3%">
          <FormLabel htmlFor="cap-cost" fontWeight={"normal"}>
            Cap Cost
          </FormLabel>
          <NumberInput
            onChange={(value) =>
              setLeaseDetails({
                ...leaseDetails,
                capCost: parseInt(value),
              })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl mt="2%">
          <FormLabel htmlFor="residual-value" fontWeight={"normal"}>
            Residual Value
          </FormLabel>
          <NumberInput
            onChange={(value) =>
              setLeaseDetails({
                ...leaseDetails,
                residualValue: parseInt(value),
              })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Flex>

      <Flex>
        <FormControl mt="2%" mr="3%">
          <FormLabel htmlFor="ibr" fontWeight={"normal"}>
            IBR (%)
          </FormLabel>
          <NumberInput
            min={0}
            value={leaseDetails.internalBorrowingRate}
            onChange={(value) =>
              setLeaseDetails({
                ...leaseDetails,
                internalBorrowingRate: parseInt(value),
              })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider
            flex="1"
            focusThumbOnChange={false}
            value={leaseDetails.internalBorrowingRate}
            onChange={(value) =>
              setLeaseDetails({
                ...leaseDetails,
                internalBorrowingRate: value,
              })
            }
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb
              fontSize="sm"
              boxSize="32px"
              children={leaseDetails.internalBorrowingRate}
            />
          </Slider>
        </FormControl>

        <FormControl mt="2%">
          <FormLabel htmlFor="lease-term" fontWeight={"normal"}>
            Lease Terms (In Months)
          </FormLabel>
          <NumberInput
            min={0}
            onChange={(value) =>
              setLeaseDetails({
                ...leaseDetails,
                leaseTerm: parseInt(value),
              })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Flex>

      <Flex>
        <FormControl mt="2%" mr="3%">
          <FormLabel htmlFor="lease-start-date" fontWeight={"normal"}>
            Lease Start Date
          </FormLabel>
          <Input
            type="date"
            id="lease-start-date"
            onChange={(e) =>
              setLeaseDetails({
                ...leaseDetails,
                leaseStartDate: e.target.value,
              })
            }
          />
        </FormControl>

        <FormControl mt="2%">
          <FormLabel htmlFor="lease-term" fontWeight={"normal"}>
            Lease End Date
          </FormLabel>
          <Input
            type="date"
            id="lease-term"
            onChange={(e) =>
              setLeaseDetails({
                ...leaseDetails,
                leaseEndingDate: e.target.value,
              })
            }
          />
        </FormControl>
      </Flex>
    </>
  );
};

export default LeaseBasicDetails;
