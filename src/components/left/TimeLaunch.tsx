import { useRecoilState, useRecoilValue } from "recoil";
import { Container, Label, Input, FormGroup } from "reactstrap";
import { timeLauchState } from "src/recoil/timeLaunchState";
import { loadingState } from "src/recoil/loadingState";
import { activeState } from "src/recoil/activeState";

const TimeLaunch = () => {
  const [timeLaunch, setTimeLaunch] = useRecoilState(timeLauchState);
  const loading = useRecoilValue(loadingState);
  const active = useRecoilValue(activeState);
  
  return (
    <Container className="bg-light p-2 shadow-sm mb-2">
      <Label for="timeLaunch">Launch Time</Label>
      <Input
        id="timeLaunch"
        className="mb-1"
        type="date"
        bsSize="sm"
        disabled={loading || active ? true : !timeLaunch.isUsed}
        defaultValue={timeLaunch.date}
        onChange={({ target: { value } }) => setTimeLaunch({ date: value })}
      />
      <Input
        className="mb-1"
        type="time"
        bsSize="sm"
        disabled={loading || active ? true : !timeLaunch.isUsed}
        defaultValue={timeLaunch.time}
        onChange={({ target: { value } }) => setTimeLaunch({ time: value })}
      />
      <Input
        id="time"
        type="checkbox"
        disabled={loading || active ? true : false}
        defaultChecked={timeLaunch.isUsed}
        onChange={({ target: { checked } }) =>
          setTimeLaunch({ isUsed: checked })
        }
      />
      <Label for="time">Use launch time</Label>
    </Container>
  );
};

export default TimeLaunch;
