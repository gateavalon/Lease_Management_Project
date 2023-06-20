import React, { useState, useEffect } from "react";
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { LeaseBasicDetailsProp } from "./LeaseBasicDetails";

interface leasePaymentProp {
  period: number;
  leasePayment: number;
  otherPayment: number;
}

const LeaseRentDetailsTable = ({
  setLeaseDetails,
  leaseDetails,
}: LeaseBasicDetailsProp) => {
  const {
    capCost,
    residualValue,
    internalBorrowingRate,
    leaseTerm,
    initialPayment,
    frequency,
    rentalAmount,
    leaseStartDate,
    calMethod,
  } = leaseDetails;

  const [singleLeasePayment, setSingleLeasePayment] =
    useState<leasePaymentProp>({
      period: 0,
      leasePayment: 0,
      otherPayment: 0,
    });
  const [manualLeasePayments, setManualLeasePayments] = useState<
    leasePaymentProp[]
  >([]);
  const [rouAsset, setROUAsset] = useState<number>(0);
  const [depreciation, setDepreciation] = useState<number>(0);

  useEffect(() => {
    const handleCalculate = () => {
      const presentValues = manualLeasePayments.map((payment) => {
        const { period, leasePayment, otherPayment } = payment;
        const presentValue =
          (leasePayment + otherPayment) /
          Math.pow(1 + internalBorrowingRate / 100, period);
        return presentValue;
      });

      const rouAssetValue = presentValues.reduce((acc, val) => acc + val, 0);
      setROUAsset(parseFloat(rouAssetValue.toFixed(2)));

      const depreciationExpense = rouAssetValue / leaseTerm;
      setDepreciation(parseFloat(depreciationExpense.toFixed(2)));
    };
    handleCalculate();
  }, [internalBorrowingRate, leaseTerm, manualLeasePayments]);

  const leasePeriods = frequency.includes("Quarterly")
    ? leaseTerm / 3
    : leaseTerm;

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Lease Rent Details Table
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal" size="md">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th isNumeric>Rent</Th>
              <Th>Frequency</Th>
              <Th isNumeric>Other expense</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leasePeriods > 0 &&
              Array.from(Array(leasePeriods).keys()).map((period) => {
                const currentPeriod = new Date(leaseStartDate);
                if (frequency.includes("Quarterly")) {
                  currentPeriod.setMonth(
                    currentPeriod.getMonth() + 3 * (period + 1)
                  );
                } else if (frequency.includes("Monthly")) {
                  currentPeriod.setMonth(
                    currentPeriod.getMonth() + (period + 1)
                  );
                }
                const currentPeriodString =
                  currentPeriod.toLocaleDateString("en-GB");

                return (
                  <Tr key={`${period}-${frequency}`}>
                    <Td>{currentPeriodString}</Td>
                    <Td isNumeric>
                      <FormControl mr="3%">
                        <NumberInput
                          onChange={(value: string) => {
                            setSingleLeasePayment({
                              ...singleLeasePayment,
                              period: period + 1,
                              leasePayment: parseFloat(value),
                            });
                          }}
                          onBlur={() => {
                            const existingValue = manualLeasePayments.find(
                              (payment) => payment.period === period + 1
                            );
                            if (existingValue && existingValue.leasePayment) {
                              const updatedList = manualLeasePayments.map(
                                (payment) => {
                                  if (payment.period === period + 1) {
                                    return {
                                      ...payment,
                                      leasePayment:
                                        singleLeasePayment.leasePayment,
                                    };
                                  }
                                  return payment;
                                }
                              );
                              setManualLeasePayments(updatedList);
                              return;
                            }
                            setManualLeasePayments([
                              ...manualLeasePayments,
                              singleLeasePayment,
                            ]);
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </Td>
                    <Td>{frequency}</Td>

                    <Td isNumeric>
                      <FormControl mr="3%">
                        <NumberInput
                          onChange={(value: string) => {
                            setSingleLeasePayment({
                              ...singleLeasePayment,
                              otherPayment: parseFloat(value),
                            });
                          }}
                          onBlur={() => {
                            const existingValue = manualLeasePayments.find(
                              (payment) => payment.period === period + 1
                            );
                            if (existingValue && existingValue.leasePayment) {
                              const updatedList = manualLeasePayments.map(
                                (payment) => {
                                  if (payment.period === period + 1) {
                                    return {
                                      ...payment,
                                      otherPayment:
                                        singleLeasePayment.otherPayment,
                                    };
                                  }
                                  return payment;
                                }
                              );
                              setManualLeasePayments(updatedList);
                              return;
                            }
                            setManualLeasePayments([
                              ...manualLeasePayments,
                              singleLeasePayment,
                            ]);
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LeaseRentDetailsTable;
