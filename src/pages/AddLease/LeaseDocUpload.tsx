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
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { LeaseBasicDetailsProp } from "./LeaseBasicDetails";
// import AWS from "aws-sdk";

// AWS.config.update({
//   accessKeyId: process.env.REACT_APP_ACCESS_KEY,
//   secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
// });

// const myBucket = new AWS.S3({
//   params: { Bucket: process.env.REACT_APP_S3_BUCKET },
//   region: process.env.REACT_APP_REGION,
// });

const LeaseDocUpload = ({
  setLeaseDetails,
  leaseDetails,
}: LeaseBasicDetailsProp) => {
  const [leaseDocsDetails, setLeaseDocsDetails] = useState<any[]>([]);

  const addNewRow = () => {
    setLeaseDocsDetails([
      ...leaseDocsDetails,
      {
        docDescription: "",
        uploadingDoc: "",
        notes: "",
      },
    ]);
  };

  //   const uploadFile = (file) => {
  //     const params = {
  //       ACL: "public-read",
  //       Body: file,
  //       Bucket: process.env.REACT_APP_S3_BUCKET,
  //       Key: file.name,
  //     };

  //     myBucket
  //       .putObject(params)
  //       .on("httpUploadProgress", (evt) => {
  //         setProgress(Math.round((evt.loaded / evt.total) * 100));
  //       })
  //       .send((err) => {
  //         if (err) console.log(err);
  //       });
  //   };

  console.log("leaseDocsDetails123", leaseDocsDetails);
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Upload relevant docs
      </Heading>
      <Flex>
        <Spacer />
        <Button colorScheme="teal" size="md" onClick={addNewRow}>
          Add Docs
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal" size="md">
          <Thead>
            <Tr>
              <Th>Index</Th>
              <Th>Doc Description</Th>
              <Th>Uploading Doc</Th>
              <Th>Notes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaseDocsDetails.length > 0 &&
              leaseDocsDetails.map((doc, index) => {
                return (
                  <Tr key={`doc-${index + 1}`}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Input
                        value={doc.docDescription}
                        onChange={(e) => {
                          setLeaseDocsDetails(
                            leaseDocsDetails.map((d, i) => {
                              if (i === index) {
                                return {
                                  ...d,
                                  docDescription: e.target.value,
                                };
                              }
                              return d;
                            })
                          );
                        }}
                        placeholder="Enter Doc Description"
                        variant="filled"
                        type="text"
                      />
                    </Td>
                    <Td>
                      <Input
                        value={doc.uploadingDoc}
                        onChange={(e) => {
                          setLeaseDocsDetails(
                            leaseDocsDetails.map((d, i) => {
                              if (i === index) {
                                return {
                                  ...d,
                                  uploadingDoc: e.target.value,
                                };
                              }
                              return d;
                            })
                          );
                        }}
                        placeholder="Upload Doc"
                        // variant="filled"
                        type="file"
                      />
                    </Td>
                    <Td>
                      <Input
                        value={doc.notes}
                        onChange={(e) => {
                          console.log("e.target.value123", e.target.value);
                        //   setLeaseDocsDetails(
                        //     leaseDocsDetails.map((d, i) => {
                        //       if (i === index) {
                        //         return {
                        //           ...d,
                        //           notes: e.target.value,
                        //         };
                        //       }
                        //       return d;
                        //     })
                        //   );
                        }}
                        placeholder="Enter Notes"
                        variant="filled"
                        type="text"
                      />
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

export default LeaseDocUpload;
