import {
  FormControl,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LeaseBasicDetailsProp } from "./LeaseBasicDetails";

export interface leasePaymentProp {
  period: number;
  leasePayment: number;
  otherPayment: number;
}

const LeaseRentDetailsTable = ({
  setLeaseDetails,
  leaseDetails,
}: LeaseBasicDetailsProp) => {
  const {
    internalBorrowingRate,
    leaseTerm,
    frequency,
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

  const leasePeriods = frequency.includes("Quarterly")
    ? leaseTerm / 3
    : leaseTerm;

  useEffect(() => {
    const handleCalculate = () => {
      const rouLeaseLiability = manualLeasePayments.map((payment) => {
        const { period, leasePayment, otherPayment } = payment;
        const presentValue =
          (leasePayment + otherPayment) /
          Math.pow(1 + internalBorrowingRate / 100, period);
        return presentValue;
      });

      const ROUValue = rouLeaseLiability.reduce((acc, val) => acc + val, 0);
      const depreciationExpense = ROUValue / leasePeriods;

      setLeaseDetails({
        ...leaseDetails,
        rouAssetValue: parseFloat(ROUValue.toFixed(2)),
        depreciationExpense: parseFloat(depreciationExpense.toFixed(2)),
        manualLeasePayments: manualLeasePayments,
      });
    };
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    internalBorrowingRate,
    leasePeriods,
    manualLeasePayments,
    setLeaseDetails,
  ]);

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Lease Rent Details Table
      </Heading>
      <TableContainer>
        {calMethod === "Manual Calculation" && (
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
        )}
      </TableContainer>
    </>
  );
};

export default LeaseRentDetailsTable;
