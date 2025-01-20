import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjMTkxNDE0My1mNmU4LTQ0N2QtYjdkYS1hZGMyYjlhYTU4Y2YiLCJlbWFpbCI6Im1hdGh5cy5kZWNrZXJAZWR1LmRldmluY2kuZnIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMmVmM2Q3MDUzNDI5MDYzNTUxZjEiLCJzY29wZWRLZXlTZWNyZXQiOiIxNzViMGVhYTNiOTAxOWJkNDEyMmIzZmYzNTk1ZDZiMTc4NTg4YTJhNDg3NDBmMTI0Y2RlNTc2ZGJlNTA5N2FlIiwiZXhwIjoxNzY4OTQwMjcxfQ.Xov5B5_qATGA3VW1y9ecBUp72l8uDuyfX9n-IEQif2o",
  pinataGateway: "salmon-casual-lark-715.mypinata.cloud",
});


async function upload() {
  try {
    const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
    const upload = await pinata.upload.file(file);
    console.log(upload);
  } catch (error) {
    console.log(error);
  }
}

async function retrieve(cid) {
  try {
    const data = await pinata.gateways.get(cid);
    console.log(data)

    const url = await pinata.gateways.createSignedURL({
       	cid: cid,
    	expires: 1800,
    })
    console.log(url)

  } catch (error) {
    console.log(error);
  }
}

retrieve("bafkreibm6jg3ux5qumhcn2b3flc3tyu6dmlb4xa7u5bf44yegnrjhc4yeq")
