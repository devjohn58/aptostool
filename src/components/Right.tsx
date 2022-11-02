import React from "react";
import { Row, Alert, Button, Container, Fade } from "reactstrap";
import { resultState } from "src/recoil/resultState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import dynamic from "next/dynamic";
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

const Right = () => {
  const result = useRecoilValue(resultState);
  const setResult = useSetRecoilState(resultState);
  console.log(result);

  return (
    <Container
      className="bg-light"
      style={{ height: "700px", overflowY: "auto" }}
    >
      <Container style={{ height: "50px" }}>
        <Row className="float-end mt-2">
          {/* @ts-ignore */}
          <Button onClick={() => setResult()}>Clear</Button>
        </Row>
      </Container>
      <Row className="flex-column-reverse">
        {result.length > 0 ? (
          <>
            {result.map((res, key) => (
              <Fade key={new Date().getTime().toString().slice(-1, -6) + key}>
                Account: {res?.account}
                <br />
                <ReactJson
                  src={res && JSON.parse(JSON.stringify(res))}
                  theme="ashes"
                  collapsed
                  displayDataTypes={false}
                  style={{ padding: 10, marginBottom: 10 }}
                  enableClipboard={false}
                  onDelete={false}
                />
                <Alert color={res?.data?.success ? "success" : "secondary"}>
                  {res?.data?.success ? "Success" : "Error"}
                  {res?.data?.message ? (
                    <div className="text-truncate">
                      Message: {res?.data.message}
                    </div>
                  ) : res?.data?.vm_status ? (
                    <div className="text-truncate">
                      VM Status: {res?.data.vm_status}
                    </div>
                  ) : (
                    ""
                  )}
                  {res?.data?.hash ? (
                    <div className="text-truncate">
                      Transaction:{" "}
                      <a
                        className="text-truncate"
                        target="_blank"
                        href={`https://explorer.aptoslabs.com/txn/${res?.data?.hash}`}
                      >
                        {res?.data?.hash}
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </Alert>
              </Fade>
            ))}
          </>
        ) : (
          <div className="text-center">No Data</div>
        )}
      </Row>
    </Container>
  );
};

export default Right;
