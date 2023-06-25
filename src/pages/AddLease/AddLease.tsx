import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Progress,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import LeaseBasicDetails from "./LeaseBasicDetails";
import LeaseDocUpload from "./LeaseDocUpload";
import LeaseRentCalculations from "./LeaseRentCalculation";
import LeaseRentDetails from "./LeaseRentDetails";
import LeaseRentDetailsTable, {
  leasePaymentProp,
} from "./LeaseRentDetailsTable";

export interface leaseDetailsProp {
  entity: string;
  leaseName: string;
  capCost: number;
  residualValue: number;
  internalBorrowingRate: number;
  leaseTerm: number;
  initialPayment: number;
  leaseStartDate: string;
  leaseEndingDate: string;
  frequency: string;
  rentalAmount: number;
  calMethod: string;
  rouAssetValue: number;
  depreciationExpense: number;
  manualLeasePayments: leasePaymentProp[];
}

export interface AddLeaseProp {
  setActiveTabName: (value: string) => void;
}

function AddLease({ setActiveTabName }: AddLeaseProp) {
  const toast = useToast();
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(33.33);
  // const navigate = useNavigate();

  const [leaseDetails, setLeaseDetails] = useState<leaseDetailsProp>({
    entity: "",
    leaseName: "",
    capCost: 0,
    residualValue: 0,
    internalBorrowingRate: 0,
    leaseTerm: 0,
    initialPayment: 0,
    leaseStartDate: "",
    leaseEndingDate: "",
    frequency: "",
    rentalAmount: 0,
    calMethod: "",
    rouAssetValue: 0,
    depreciationExpense: 0,
    manualLeasePayments: [],
  });
  // console.log("manualLeasePayments123", leaseDetails.manualLeasePaymentsSaved);
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress value={progress} mb="5%" mx="5%"></Progress>
        {step === 1 ? (
          <LeaseBasicDetails
            setLeaseDetails={setLeaseDetails}
            leaseDetails={leaseDetails}
          />
        ) : step === 2 ? (
          <LeaseRentDetails
            setLeaseDetails={setLeaseDetails}
            leaseDetails={leaseDetails}
          />
        ) : step === 3 ? (
          <LeaseRentDetailsTable
            setLeaseDetails={setLeaseDetails}
            leaseDetails={leaseDetails}
          />
        ) : step === 4 ? (
          <LeaseRentCalculations
            setLeaseDetails={setLeaseDetails}
            leaseDetails={leaseDetails}
          />
        ) : step === 5 ? (
          <LeaseDocUpload
            setLeaseDetails={setLeaseDetails}
            leaseDetails={leaseDetails}
          />
        ) : (
          <div>test</div>
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  if (step === 1) {
                    setActiveTabName("Dashboard");
                    return;
                  }
                  setStep((prev) => prev - 1);
                  setProgress(progress - 16.67);
                }}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 6}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 6) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 16.67);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 6 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}

export default AddLease;
