import { useRecoilState, useRecoilValue } from "recoil";
import { Container, Row, Col, Label, Input } from "reactstrap";
import { gasFeeState } from "src/recoil/gasState";
import { activeState } from "src/recoil/activeState";
import { loadingState } from "src/recoil/loadingState";

const GasFee = () => {
  const [gasFee, setGasFee] = useRecoilState(gasFeeState);
  const active = useRecoilValue(activeState)
  const loading = useRecoilValue(loadingState)
  return (
    <Container className="bg-light p-2 shadow-sm mb-2">
      <Row>
        <Col xs={6}>
          <Label for="gas_price">Gas price</Label>
          <Input
            id="gas_price"
            type="number"
            bsSize="sm"
            disabled={loading || active ? true : false}
            defaultValue={gasFee.gasPrice}
            onChange={({target: {value}}) => setGasFee({gasPrice: Number(value)})}
            />
        </Col>
        <Col xs={6}>
          <Label for="gas_max">Gas max</Label>
          <Input
            id="gas_max"
            type="number"
            bsSize="sm"
            disabled={loading || active ? true : false}
            defaultValue={gasFee.gasMax}
            onChange={({target: {value}}) => setGasFee({gasMax: Number(value)})}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default GasFee;
