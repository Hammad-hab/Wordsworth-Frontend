import { AES } from "crypto-js";
import { Timestamp } from "firebase/firestore";
const CONFIG = {
  MAX_USR_LENGTH: 10,
  MIN_USR_LENGTH: 6,
  MAX_PAS_LENGTH: 25,
  MIN_PAS_LENGTH: 7,
};

/**
 * @description Simple utility that uses standard configuration to check if the provided
 * string is valid enough to be used anywhere in the app.
 */
const stringIsValid = (x: string) =>
  x &&
  typeof x !== "undefined" &&
  x.length <= CONFIG.MAX_PAS_LENGTH &&
  x.length >= CONFIG.MIN_PAS_LENGTH;
const isNotNULL = (x: any) => x != null;
const createProfilePic = (n: string) => {
  console.log("Created Image");
  return `https://ui-avatars.com/api/background=a87732&name=${n}&color=FFF&size=128&format=svg`;
};
const getRandomBookPrompts = (count = 3, prompts: string[]) => {
  const getRandomIndices = (total: number, max: number) => {
    const indices = new Set();
    while (indices.size < total) {
      indices.add(Math.floor(Math.random() * max));
    }
    return [...indices];
  };

  const randomIndices = getRandomIndices(count, prompts.length);
  return randomIndices.map((index: any) => prompts[index]);
};

const setObjectLocalStorage = (object: any, hash: string, prefix = "0xen") => {
  if (!window || !window.localStorage) return null;
  for (const key in object) {
    let element: any;
    const ckey = object[key];

    element = typeof ckey === "string" ? ckey : JSON.stringify(ckey);
    const encryptions = AES.encrypt(element, hash);
    localStorage.setItem(`${prefix}${key}`, encryptions.toString());
  }
  return prefix;
};

const getObjectLocalStorage = (hash: string, prefix: string = "0xen") => {
  const obj: any = {};
  if (!window || !window.localStorage) return null;
  for (let index = 0; index < localStorage.length; index++) {
    const x = localStorage.key(index);
    if (!x) continue;
    if (x?.startsWith(prefix)) {
      let value: any = localStorage.getItem(x);
      value = Buffer.from(
        AES.decrypt(value, hash).toString(),
        "hex",
      ).toString();
      if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (
        (value.startsWith("[") && value.endsWith("]")) ||
        (value.startsWith("{") && value.endsWith("}"))
      )
        value = JSON.parse(value);
      const y = Object.keys(value);
      if (y.includes("seconds") && y.includes("nanoseconds"))
        obj[x.replace(prefix, "")] = new Timestamp(
          value.seconds,
          value.nanoseconds,
        ).toDate();
      else obj[x.replace(prefix, "")] = value;
    }
  }
  return obj;
};

const clearObjectLocalStorage = () => {
  const value = localStorage.getItem("hasdonetutorial");
  localStorage.clear();
  if (value) localStorage.setItem("hasdonetutorial", value);
};

export {
  stringIsValid,
  createProfilePic,
  isNotNULL,
  setObjectLocalStorage,
  getObjectLocalStorage,
  clearObjectLocalStorage,
  getRandomBookPrompts,
};
