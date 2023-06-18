import React, { useState, useEffect } from "react";
import {
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
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
import moment from "moment";
import { leaseDetailsProp } from "./AddLease";

export interface LeaseBasicDetailsProp {
  setLeaseDetails: (leaseDetails: leaseDetailsProp) => void;
  leaseDetails: leaseDetailsProp;
}

const LeaseBasicDetails = ({
  setLeaseDetails,
  leaseDetails,
}: LeaseBasicDetailsProp) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    if (leaseDetails.leaseStartDate !== "" || !leaseDetails.leaseTerm) {
      const startDate = moment(leaseDetails.leaseStartDate);
      const endDate = startDate.add(leaseDetails.leaseTerm, "months");
      setLeaseDetails({
        ...leaseDetails,
        leaseEndingDate: endDate.format("YYYY-MM-DD"),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaseDetails.leaseTerm, leaseDetails.leaseStartDate, setLeaseDetails]);

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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
            onChange={(value: string) =>
              setLeaseDetails({
                ...leaseDetails,
                initialPayment: parseFloat(value),
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
            onChange={(value: string) =>
              setLeaseDetails({
                ...leaseDetails,
                residualValue: parseFloat(value),
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
            onChange={(value: string) =>
              setLeaseDetails({
                ...leaseDetails,
                internalBorrowingRate: parseFloat(value),
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
            onChange={(value: number) =>
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
            onChange={(value: string) =>
              setLeaseDetails({
                ...leaseDetails,
                leaseTerm: parseInt(value),
              })
            }
            value={leaseDetails.leaseTerm}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLeaseDetails({
                ...leaseDetails,
                leaseStartDate: e.target.value,
              })
            }
            value={leaseDetails.leaseStartDate}
          />
        </FormControl>

        <FormControl mt="2%">
          <FormLabel htmlFor="lease-term" fontWeight={"normal"}>
            Lease End Date
          </FormLabel>
          <Input
            type="date"
            id="lease-term"
            value={leaseDetails.leaseEndingDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
