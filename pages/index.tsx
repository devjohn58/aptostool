import Head from "next/head";
import { Row, Col, Container } from "reactstrap";
import { useRecoilValue } from "recoil";
import Docs from "src/components/Docs";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Left from "src/components/left/Left";
import Right from "src/components/Right";
import { chainState } from "src/recoil/chainState";
import { headerState } from "src/recoil/headerState";

export default function Home() {
  const header = useRecoilValue(headerState);
  const chain = useRecoilValue(chainState);
  return (
    <>
      <Head>
        <title>Tool mint NFT free on Aptos</title>
        <meta
          name="description"
          content="Aptos tool mint nft on aptos , sui, ethw blockchain, aptos mint nft free, aptos nft, automatic mint nft, buy nft aptos"
        />
        <meta
          property="og:description"
          content="Aptos tool mint nft on aptos , sui, ethw blockchain, aptos mint nft free, aptos nft, automatic mint nft, buy nft aptos"
        />
        <meta name="robots" content="noodp,index,follow" />
        <meta name="keywords" content="aptos, aptos tool mint nft free, aptos tool minft muntiple account, nft aptos" />
        <meta http-equiv="content-language" content="en" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className="p-4" style={{ maxWidth: "1600px" }}>
        <Header />
        {!header && chain === "aptos" ? (
          <Docs />
        ) : chain === "aptos" ? (
          <Row>
            <Col xs={12} md={6}>
              <Left />
            </Col>
            <Col xs={12} md={6}>
              <Right />
            </Col>
          </Row>
        ) : (
          <div className="text-center">Comming soon</div>
        )}
      </Container>
      <Footer />
    </>
  );
}
