import BaseRequest from "./BaseRequest"
interface BookVolume {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: {
        type: string;
        identifier: string;
      }[];
      readingModes: {
        text: boolean;
        image: boolean;
      };
      pageCount: number;
      printType: string;
      categories: string[];
      averageRating: number;
      ratingsCount: number;
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
      };
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string;
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean;
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: {
        isAvailable: boolean;
      };
      pdf: {
        isAvailable: boolean;
      };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean;
    };
    searchInfo: {
      textSnippet: string;
    };
  }


// class GoogleBooksRequest extends BaseRequest {
//   constructor () {
//     super("https://www.googleapis.com/books/v1/volumes")
//   }
//   throwRequest(): Promise<BookVolume[]> {
    
//   }
// }
class GoogleBooksRequest {
    private url: string;
    private priv:boolean;
    constructor() {
        this.url = "https://www.googleapis.com/books/v1/volumes"
        this.priv = false
    }
    
    assignParameter(key:string, value:string | number) 
    {
        if (!this.priv) {
            this.url += `?${key}=${value}`
            this.priv = true
        } else {
            this.url += `&${key}=${value}`
        }
    }

    get getURL() {
        return this.url
    }

    
    async throwRequest(): Promise<BookVolume[]> {

        const request = await fetch(this.url, {
            headers: {
                "User-Agent": "Wordsworth/1.0 arcade.acme.org@gmail.com"
            }
        })
        if (!request.ok) throw "Request Failed, invalid response from API."
        const json_response: any =  (await request.json())
        if (json_response.totalItems === 0) throw "404 not found"
        const viabledata = json_response.items
       
        return viabledata
    }
}

const workRequest = (volume: BookVolume[]) => {
  volume = volume.slice(0, 5)
  let info = "" 
  for (const vl of volume) {
    if (!vl) continue
    info += `
    
      Result Number ${volume.indexOf(vl)}
      ${JSON.stringify(vl.volumeInfo)}

    `
  }
  info += "[APP_HINT]: Now return some valid information. Try generalizing and extracting valid info. Remember the response format."
return info
}


class Prompt
{
  private value:string
  public appenditure:string
  constructor(value:string) {
    this.value = value
    this.appenditure = ""
  }

  insertHint(key:string, value:string | any) {
    this.value += `\n[APP_HINT] ${key}: ${value}\n`
  }

  get getValue() {
    return this.value.toString()
  }
}

export default GoogleBooksRequest
export {
  workRequest,
  Prompt
}