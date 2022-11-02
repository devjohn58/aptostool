import {
  CoinClient,
  AptosAccount,
  HexString,
  AptosClient,
  MaybeHexString
} from "aptos";
import { NODE_URL } from "./config";
import { TransactionBuilderRemoteABIPayload } from "./sdk/src";

const client = new AptosClient(NODE_URL);
const coin = new CoinClient(client);

export const getAddressLoop = async (privateKeyStr: string) => {
  if (!privateKeyStr) return [undefined];
  const privateKeyArr = privateKeyStr.split(",");
  let _result = [];
  for (let i in privateKeyArr) {
    if (!privateKeyArr[i]) continue;
    if (privateKeyArr[i].length % 2) {
      _result.push(undefined);
      continue;
    }
    try {
      const account = new AptosAccount(
        HexString.ensure(privateKeyArr[i]).toUint8Array()
      );
      const address = await account.address();
      _result.push(address);
    } catch (error) {
      console.log(error);
      _result.push(undefined);
    }
  }
  return _result;
};

export const checkBalanceLoop = async (privateKeyStr: string) => {
  if (!privateKeyStr) return [undefined];
  const privateKeyArr = privateKeyStr.split(",");
  let _result = [];
  for (let i in privateKeyArr) {
    if (!privateKeyArr[i]) continue;
    if (privateKeyArr[i].length % 2) {
      _result.push(undefined);
      continue;
    }
    try {
      const account = new AptosAccount(
        HexString.ensure(privateKeyArr[i]).toUint8Array()
      );
      const balance = await coin.checkBalance(account);
      _result.push(Number(balance));
    } catch (error) {
      console.log(error);
      _result.push(undefined);
    }
  }
  return _result;
};

export const getABILoop = async (
  contract: string,
  addressArr: (HexString | undefined)[],
  func?: string | undefined,
  mintQty?: number | undefined
) => {
  if (!addressArr) return [undefined];
  let _result = [];
  for (let i in addressArr) {
    if (!addressArr[i]) continue;
    try {
      const abibuild = await getABIpayload(
        contract,
        //@ts-ignore
        addressArr[i],
        func,
        mintQty
      );
      //@ts-ignore
      if (abibuild?.err) {
        _result.push(undefined);
      } else {
        _result.push(abibuild);
      }
    } catch (error) {
      console.log(error);
      _result.push(undefined);
    }
  }
  return _result;
};

const getABIpayload = async (
  contract: string,
  address: string,
  func?: string | undefined,
  mintQty?: number | undefined
) => {
  try {
    const aptosClient = {
      getAccountModules: (contract: MaybeHexString) =>
        client.getAccountModules(contract),
      getAccount: (contract: MaybeHexString) => client.getAccount(contract),
      getChainId: () => client.getChainId(),
      estimateGasPrice: () => client.estimateGasPrice(),
    };

    //get ABI from modules address
    //@ts-ignore
    const abi = new TransactionBuilderRemoteABIPayload(aptosClient, {
      //@ts-ignore
      sender: address,
    });
    //get rawtransaction to sign transaction
    const abiBuild = await abi.buildTranSactionPayload(
      `${contract}::${func ? func : "factory::mint_nft_public"}`,
      [],
      mintQty ? [mintQty] : []
    );
    return abiBuild;
  } catch (error) {
    console.log(error);
    return { err: true, data: error };
  }
};

export const signTxnAndSubmitLoop = async (
  privateKeyStr: string,
  transacPayload: any,
  gasPrice: number,
  gasMax: number,
  setResult: any
) => {
  const privateKeyArr = privateKeyStr.split(",");
  for (let i in privateKeyArr) {
    try {
      const account = new AptosAccount(
        HexString.ensure(privateKeyArr[i]).toUint8Array()
      );
      client
        .generateSignSubmitWaitForTransaction(account, transacPayload[i], {
          maxGasAmount: BigInt(gasMax),
          gasUnitPrice: BigInt(gasPrice),
        })
        // for test
        // .waitForTransactionWithResult("0x8ad167577185e5cd327f5343e0a94b7c5b411db6c7f0fef7dc8157c8b6d7afd1")
        .then((res) => {
          setResult([{ account: Number(i) + 1, status: true, data: res }]);
        })
        .catch((err) => {
          setResult([{ account: Number(i) + 1, status: false, data: err }]);
        });
    } catch (error) {
      console.log(error);
      setResult([{ account: Number(i) + 1, status: false, data: "Not found address" }]);
    }
  }
};
