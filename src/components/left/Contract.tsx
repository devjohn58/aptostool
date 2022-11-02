import React, { useEffect } from "react";
import {Container, Label, Input} from "reactstrap"
import {useRecoilState, useRecoilValue} from "recoil"
import { activeState } from "src/recoil/activeState";
import { contractState } from "src/recoil/contractState";
import { loadingState } from "src/recoil/loadingState";

const Contract = () => {
    const [contract, setContract] = useRecoilState(contractState)
    const loading = useRecoilValue(loadingState)
    const active = useRecoilValue(activeState)
  return (
      <Container className="bg-light p-2 shadow-sm mb-2">
        <Label for="contract">Contract</Label>
        <Input
          type="text"
          bsSize="sm"
          placeholder="contract"
          defaultValue={contract}
          disabled={loading || active ? true : false}
          onChange={({ target: { value } }) => setContract(value)}
        />
      </Container>
  );
};

export default Contract;
