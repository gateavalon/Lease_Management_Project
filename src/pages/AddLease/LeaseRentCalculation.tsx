import {
  Button,
  Flex,
  Heading,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { LeaseBasicDetailsProp } from "./LeaseBasicDetails";

interface LeasePaymentScheduleProp {
  period: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

const LeaseRentCalculations = ({
  setLeaseDetails,
  leaseDetails,
}: LeaseBasicDetailsProp) => {
  const tableRef = useRef(null);
  const {
    internalBorrowingRate,
    leaseTerm,
    frequency,
    rouAssetValue,
    manualLeasePayments,
  } = leaseDetails;

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Amortisation table",
    sheet: "Amortisation",
  });

  const leasePeriods = frequency.includes("Quarterly")
    ? leaseTerm / 3
    : leaseTerm;

  const [leasePaymentSchedule, setLeasePaymentSchedule] = useState<
    LeasePaymentScheduleProp[]
  >([]);

  useEffect(() => {
    const calculateAmortizationSchedule = () => {
      const periodicalInterestRate = frequency.includes("Quarterly")
        ? internalBorrowingRate / 100 / 3
        : internalBorrowingRate / 100 / 12;

      const schedule = [];

      let balance = rouAssetValue;

      for (let period = 1; period <= leasePeriods; period++) {
        const interest = balance * periodicalInterestRate;
        const principal =
          manualLeasePayments[period - 1].leasePayment - interest;
        balance -= principal;

        schedule.push({
          period,
          payment: parseFloat(
            manualLeasePayments[period - 1].leasePayment.toFixed(2)
          ),
          interest: parseFloat(interest.toFixed(2)),
          principal: parseFloat(principal.toFixed(2)),
          balance: parseFloat(balance.toFixed(2)),
        });
      }
      setLeasePaymentSchedule(schedule);
    };

    calculateAmortizationSchedule();
  }, [
    frequency,
    internalBorrowingRate,
    leasePeriods,
    manualLeasePayments,
    rouAssetValue,
  ]);

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Lease Rent Details Table
      </Heading>
      <Flex>
        <Spacer />
        <Button colorScheme="teal" size="md" onClick={onDownload}>
          Exprot to Excel
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal" size="md" ref={tableRef}>
          <Thead>
            <Tr>
              <Th>Year</Th>
              <Th isNumeric>Opening Balance</Th>
              <Th isNumeric>Interest Expense</Th>
              <Th isNumeric>Payment</Th>
              <Th isNumeric>Closing Balance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leasePaymentSchedule.map((leasePaymentSchedule) => {
              const { period, payment, interest, principal, balance } =
                leasePaymentSchedule;
              return (
                <Tr key={`${period}-${frequency}`}>
                  <Td>{period}</Td>
                  <Td isNumeric>{balance}</Td>
                  <Td isNumeric>{interest}</Td>
                  <Td isNumeric>{payment}</Td>
                  <Td isNumeric>{balance - principal}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LeaseRentCalculations;
