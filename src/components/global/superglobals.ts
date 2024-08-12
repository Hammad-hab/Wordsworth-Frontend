import formidable, { Files } from "formidable";
import { UserInformation } from "./interfaces"
import { User, } from "firebase/auth";
import { v4 } from "uuid"

function setCookie(cname: string, cvalue: string, exdays: number) {
  /**Source: W3Schools */
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const vReactDropdown = (x: string[]) => x.map(v => { return { label: v, value: v } })

function getCookie(cname: string) {
  /**Source: W3Schools */
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}


const extractFormidableFileData = (files: Files<string>): Map<string, formidable.File | undefined> => {
  // Each formidable file object firstly contains keys corresponding to each file
  const keys = Object.keys(files) // extracting the keys
  const fileMap = new Map<string, formidable.File | undefined>()
  for (const fileField of keys) {
    const correspondingFile = files[fileField]?.[0]
    fileMap.set(fileField, correspondingFile)
  }
  return fileMap

}

const btmb = (bytes: number, precision: number = 3, forcedMB: boolean = false, forceFloat: boolean = false) => {
  let _;
  let unit;

  if (bytes >= 1e+6 || forcedMB) {
    _ = (bytes / 1e+6)
    unit = " MB"
  } else {
    _ = (bytes / 1000)
    unit = " KB"
  }
  const retval = (!Number.isNaN(_) ? _.toPrecision(precision) : "0")
  if (forceFloat)
    return parseFloat(retval)
  else
    return retval + unit
}


/** 
 * @deprecated
 * @description The only difference between btmb and btmb_legacy is that the api route is 
practically depended on the older version of btmb, building a compatibility layer is 
too inefficient
 */
const btmb_legacy = (bytes: number, precision: number = 3) => {
  const _ = (bytes / 1e+6)
  return (!Number.isNaN(_) ? _.toPrecision(precision) : "0")
}


function generateReadingUsername() {
  const prefixes = ['Book', 'Page', 'Read', 'Story', 'Novel', 'Lit', 'Word', 'Text', 'Plot', 'Prose'];
  const middles = ['Worm', 'Lover', 'Wizard', 'Master', 'Explorer', 'Seeker', 'Voyager', 'Dreamer', 'Diver', 'Weaver'];
  const suffixes = ['AI', 'Bot', 'Assist', 'Helper', 'Buddy', 'Pal', 'Guide', 'Mate', 'Friend', 'Companion'];
  const numbers = ['', '21', '42', '101', '365', '525', '1984', '2023', '3000'];

  function getRandomElement(arr: Array<any>) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const username = [
    getRandomElement(prefixes),
    getRandomElement(middles),
    getRandomElement(suffixes),
    getRandomElement(numbers)
  ].join('');

  return username;
}

const genStdUsrTemplate = (user: User, args: Partial<UserInformation> ) => {
  const userInformation: UserInformation = {
    displayName: user.displayName ?? generateReadingUsername(),
    userIsCustomised: false,
    isProUser: false,
    userstorageid: v4(),
    ReadingLists: [],
    ...args
  };
  return userInformation
}

const HobbiesSuggetions = vReactDropdown([
  "Cycling",
  "Driving (General)",
  "Painting (General)",
  "Cooking",
  "Eating",
  "Reading",
  "Dancing (General)",
  "Drawing",
  "Sketching",
  "Watching Movies",
  "Playing Games",
  "Sports (General)",
  "Basketball",
  "Baseball",
  "Football",
  "Collecting (General)",
  "Wood Works",
  "Coin Collection",
  "Stamp Collection",
  "Writing (General)",
  "Traveling",
  "Shopping",
  "Just Wandering out doors",
  "Coding (General)",
  "Graphics (General)",
  "Photography",
  "3D Design (General)",
  "3D Modeling (General)",
  "Playing Board Games (General)",
  "Chess",
  "Go (Board Game)",
  "Archery (Uncommon)",
  "Sword Fighting (Highly uncommon)",
  "Horse riding",
  "Animal related activity",
  "Indulging in politics",
  "Reasearching science",
  "Reasearching chemistry",
  "Reasearching (General)",
  "Reasearching Policics.",
  "Reading News",
  "Watching Youtube Videos (General)",
  "Watching Memes"
])


const firebaseConfig = {
  apiKey: "AIzaSyCbdjz-JelBwKewufk3y3CgjM-N1uIlfXs",
  authDomain: "bigqserver.firebaseapp.com",
  projectId: "bigqserver",
  storageBucket: "bigqserver.appspot.com",
  messagingSenderId: "665695844751",
  appId: "1:665695844751:web:c0c4fd3d71837e7f1073fa",
  measurementId: "G-Q6GXL6PXN3"
};


const PreferencesSuggestion = vReactDropdown([
  "Horror",
  "Creepy",
  "Scary",
  "Splatterpunk (Gore/Violent)",
  "Love/Romance",
  "Action",
  "Adventure",
  "Harmartia",
  "Sad",
  "Tragic",
  "Victorian",
  "Classical",
  "Thriller",
  "Mystery",
  "Science Fiction",
  "Fiction",
  "Non-Fiction",
  "Young Adult",
  "Dystopian",
  "Religion and Spirituality",
  "Philosophy",
  "Self-Help",
  "Biography",
  "Comics",
  "Poetry",
  "Classical Poetry",
  "Funny/Comedy",
  "Satire",
  "Dark Fantasy",
  "Dark Comedy",
  "Epic",
  "Essays",
  "Mythology",
  "Bizarro fiction (Uncommon)",
  "Surrealism (Uncommon)",
  "Slipstream fiction (Uncommon)",
  "Bildungsroman (Comming of age stories)",
  "Epistolary novel",
  "Steampunk",
  "Spy Thrillers",
  "Ballads (Uncommon)",
  "Historical Fiction",
  "Memoirs"
])


export {
  HobbiesSuggetions,
  firebaseConfig,
  PreferencesSuggestion,
  setCookie,
  getCookie,
  extractFormidableFileData,
  btmb,
  generateReadingUsername,
  btmb_legacy,
  genStdUsrTemplate
}