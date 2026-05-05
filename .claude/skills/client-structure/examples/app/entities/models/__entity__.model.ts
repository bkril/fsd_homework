export interface I__Entity__ {
  id: string;
  // add fields
}

// Only create if a separate detail endpoint exists with additional fields
export interface I__Entity__Detail extends I__Entity__ {
  // add detail-only fields
}
