import { useEffect, useState } from "react";
import { Row, Col, Button, Container, Alert, Spinner } from "reactstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import {
  getABILoop,
  getAddressLoop,
  signTxnAndSubmitLoop
} from "src/api";
import { activeState } from "src/recoil/activeState";
import { balanceState } from "src/recoil/balanceState";
import { contractState } from "src/recoil/contractState";
import { functionState } from "src/recoil/functionState";
import { gasFeeState } from "src/recoil/gasState";
import { loadingState } from "src/recoil/loadingState";
import { privateKeyState } from "src/recoil/privateKeyState";
import { resultState } from "src/recoil/resultState";
import { timeLauchState } from "src/recoil/timeLaunchState";

//convert time to miliseconds
const convertTime = (date: string, time: string) => {
  const dateArr = date.split("-");
  const timeArr = time.split(":");
  return new Date(
    Number(dateArr[0]),
    Number(dateArr[1]) - 1,
    Number(dateArr[2]),
    Number(timeArr[0]),
    Number(timeArr[1])
  ).getTime();
};

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

const convertMsToTime = (milliseconds: number) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(milliseconds / 1000 / 3600);
  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${padTo2Digits(hours)}h:${padTo2Digits(minutes)}m:${padTo2Digits(
    seconds
  )}s`;
};

const Submit = () => {
  // value
  const gasFee = useRecoilValue(gasFeeState);
  const balance = useRecoilValue(balanceState);
  const func = useRecoilValue(functionState);
  const timeLaunch = useRecoilValue(timeLauchState);
  const privateKey = useRecoilValue(privateKeyState);
  const contract = useRecoilValue(contractState);
  const [result, setResult] = useRecoilState(resultState);
  const resetResult = useResetRecoilState(resultState);
  const [active, setActive] = useRecoilState(activeState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useState<string | undefined>();
  const [timeRequest, setTimeRequest] = useState<number>(0);
  const [abi, setAbi] = useState<any>();
  
  // count down
  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => {
      setTimeRequest(timeRequest - 500);
      if (timeRequest < 500) {
        setActive(true);
      }
    }, 500);
    return () => clearInterval(id);
  }, [loading, timeRequest]);

  // get abi before submit
  useEffect(() => {
    if (!loading) return;
    (async () => {
      const address = await getAddressLoop(privateKey);
      const abiResult = await getABILoop(
        contract,
        address,
        func.isUsed ? func.func : undefined,
        func.isUsed ? func.quatity : undefined
      );
      if(abiResult.includes(undefined)){
        setLoading(false)
        setError("Invalid contract, function or quantity!")
        return
      }
      setAbi(abiResult);
    })();
  }, [loading]);

  // submit transaction
  useEffect(() => {
    if (!active) return;
    loading && setLoading(false);
    signTxnAndSubmitLoop(
      privateKey,
      abi,
      gasFee.gasPrice ? gasFee.gasPrice : 100,
      gasFee.gasMax ? gasFee.gasMax : 20000,
      setResult
    );
  }, [active]);

  // disable active
  useEffect(() => {
    loading && setLoading(false)
    active && setActive(false);
  }, [result.length]);

  // handle submit
  const handleSubmit = async (status: number) => {
    error && setError(undefined);
    loading && setLoading(false);
    if(loading || active) return;
    if (status) {
      if (!contract) {
        setError("Please enter contract!");
        return;
      }
      if (func.isUsed && !func.func) {
        setError("Please enter function!");
        return;
      }
      if (!privateKey) {
        setError("Please enter private key!");
        return;
      }
      if (balance.includes(undefined)) {
        setError("Some private key invalid!");
        return;
      }
      if (
        (timeLaunch.isUsed && !timeLaunch.date) ||
        (timeLaunch.isUsed && !timeLaunch.time)
      ) {
        setError("Please select lauchpad time!");
        return;
      }
      if(!timeLaunch.isUsed){
        setActive(true)
        return
      }
      if (timeLaunch.date && timeLaunch.time) {
        const timeLaunchMs = convertTime(timeLaunch.date, timeLaunch.time);
        setTimeRequest(timeLaunchMs - new Date().getTime());
      }
      setLoading(true);
      return
    }
    //cancel
    if (!status) {
      setLoading(false);
      setTimeRequest(0);
      return;
    }
  };
  return (
    <>
      <Row className="justify-content-between">
        <Col>
          {balance.length >=1 &&
            balance.map((bal, key) => (
              <div key={bal ? bal + key : key}>
                Account{key + 1}:{" "}
                {bal ? (bal / 100000000).toString().slice(0, 6) : "--"}APT
              </div>
            ))}
        </Col>
        <Col>
          Max Fee:{" "}
          {gasFee?.gasMax &&
            gasFee?.gasPrice &&
            (gasFee.gasMax * gasFee.gasPrice) / 100000000}{" "}
          APT
        </Col>
      </Row>
      {error && <Alert color="secondary">{error}</Alert>}
      {loading && (
        <Container className="bg-light text-center p-2 mt-1 mb-3 shadow-lg">
          waiting for request: {convertMsToTime(timeRequest)}
        </Container>
      )}
      <Button
        className="mb-5"
        color={loading ? "secondary" : "primary"}
        size="sm"
        onClick={() => (loading ? handleSubmit(0) : handleSubmit(1))}
      >
        {loading ? "Cancel" : active ? <Spinner></Spinner> : "Submit"}
      </Button>
    </>
  );
};

export default Submit;
