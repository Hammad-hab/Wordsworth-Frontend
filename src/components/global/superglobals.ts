const HobbiesSuggetions = [
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
].map(v => {return {label:v, value:v}})

function setCookie(cname:string, cvalue:string, exdays:number) {
    /**Source: W3Schools */
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
function getCookie(cname:string) {
    /**Source: W3Schools */
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
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

export {
    HobbiesSuggetions,
    setCookie,
    getCookie
}