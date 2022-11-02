import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Container, Label, Input, FormGroup } from "reactstrap";
import { privateKeyState } from "src/recoil/privateKeyState";
import { checkBalanceLoop } from "src/api";
import { balanceState } from "src/recoil/balanceState";
import { loadingState } from "src/recoil/loadingState";
import { activeState } from "src/recoil/activeState";

const PrivateKey = () => {
  const [isPrivateKey, setIsPrivateKey] = useState<boolean>(false);
  const [privateKey, setPrivateKey] = useRecoilState(privateKeyState);
  const setBalance = useSetRecoilState(balanceState)
  const loading = useRecoilValue(loadingState)
  const active = useRecoilValue(activeState)
  useEffect(() => {
    const id = setTimeout(async () => {
      const balanceResult = await checkBalanceLoop(privateKey)
      setBalance(balanceResult)
      }, 2000)
      return () => clearTimeout(id)
  }, [privateKey, setBalance])
  
  return (
    <Container className="bg-light p-2 shadow-sm mb-2">
      <Label for="privateKey">Private Key</Label>
      <Input
        id="privateKey"
        type={isPrivateKey ? "textarea" : "password"}
        bsSize="sm"
        placeholder="private key"
        defaultValue={privateKey}
        disabled={loading || active ? true : false}
        onChange={({target: {value}}) => setPrivateKey(value)}
        />
      <Input
        id="check_privateKey"
        type="checkbox"
        disabled={loading || active ? true : false}
        onClick={() => setIsPrivateKey(!isPrivateKey)}
        defaultChecked={isPrivateKey}
      />
      <Label for="check_privateKey">Show</Label>
    </Container>
  );
};

export default PrivateKey;
