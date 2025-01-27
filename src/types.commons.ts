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
  relevanceSore: number;
  startingPos: number;
  type: string[];
  wikiLink: string;
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

interface Section {
  title: string;
  content: string;
}

export interface WikipediaPageData {
  title: string;
  sections: Section[];
  imageUrl: string | null;
}
