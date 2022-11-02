import { Container, Label, Input, FormGroup } from "reactstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeState } from "src/recoil/activeState";
import { functionState } from "src/recoil/functionState";
import { loadingState } from "src/recoil/loadingState";

const Function = () => {
  const [func, setFuncState] = useRecoilState(functionState);
  const loading = useRecoilValue(loadingState)
  const active = useRecoilValue(activeState)
  return (
    <Container className="bg-light p-2 shadow-sm mb-2">
      <Label for="func">Function</Label>
      <Input
        className="mb-1"
        id="func"
        type="text"
        bsSize="sm"
        disabled={loading || active ? true : !func.isUsed}
        placeholder="function (default: factory::mint_nft_public)"
        defaultValue={func.isUsed ? func.func : ""}
        onChange={({ target: { value } }) => setFuncState({ func: value })}
      />
      <Input
        type="number"
        className="mb-1"
        bsSize="sm"
        placeholder="quatity (default: null)"
        disabled={!func.isUsed}
        defaultValue={func.isUsed ? func.quatity : ""}
        onChange={({ target: { value } }) =>
          setFuncState({ quatity: Number(value) })
        }
      />
      <Input
        onChange={({ target: { checked } }) =>
          setFuncState({ isUsed: checked })
        }
        id="quatity"
        type="checkbox"
        disabled= {loading || active ? true : false}
        defaultChecked={func.isUsed}
      />
      <Label defaultChecked for="quatity">
        Use function
      </Label>
    </Container>
  );
};

export default Function;
