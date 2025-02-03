// TextRazor Types =============================================================

export interface Topic {
  id: number;
  label: string;
  score: number;
  wikiLink: string;
  wikidataId: string;
}
type CoarseTopic = Omit<Topic, "wikidataId">;

export interface Entity {
  confidenceScore: number;
  endingPos: number;
  entityEnglishId: string;
  entityId: string;
  freeBaseTypes: string[];
  id: number;
  matchedText: string;
  matchingTokens: number[];
  relevanceScore: number;
  startingPos: number;
  type: string[];
  wikiLink?: string;
}

export interface ResponseObject {
  coarseTopics?: CoarseTopic[];
  entities: Entity[];
  language: string;
  languageIsReliable: boolean;
  topics?: Topic[];
}

export interface TextRazorAPIResponse {
  ok: boolean;
  response: ResponseObject;
  time: number;
}

export interface AskTxtRazorResponse {
  data: TextRazorAPIResponse;
  entities: Entity[];
  topics?: Topic[];
}

// Wikipedia Types =============================================================
interface Section {
  line?: string;
  anchor: string;
  fromtitle: string;
  index: string | number;
  level: string | number;
  number: string | number;
}

export interface WikipediaAPIResponse {
  title: string;
  extract: string;
  // pageid: number;
  // text: {
  //   ["*"]: string;
  // };
  // images: string[];
  // sections: Section[];
}

export interface FullResponse {
  textRazor: AskTxtRazorResponse;
  wikiData: WikipediaAPIResponse;
}
