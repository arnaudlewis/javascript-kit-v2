export interface IDocument {
  id: string;
  uid ?: string;
  type: string;
  href: string;
  tags: string[];
  slug: string;
  slugs: string[];
  firstPublicationDate: Date | null;
  lastPublicationDate: Date | null;
  lang ?: string;
  alternateLanguages: string[];
  data: object;
}

export interface IGroupDoc {
  data: object;
}

export function Document(
  id: string,
  type: string,
  href: string,
  tags: string[],
  slug: string,
  slugs: string[],
  firstPublicationDate: string | null,
  lastPublicationDate: string | null,
  alternateLanguages: string[],
  data: any,
  uid ?: string,
  lang ?: string,
): IDocument {
  return {
    alternateLanguages,
    data,
    firstPublicationDate: firstPublicationDate ? new Date(firstPublicationDate) : null,
    href,
    id,
    lastPublicationDate: lastPublicationDate ? new Date(lastPublicationDate) : null,
    tags,
    slug: slug[0],
    slugs,
    type,
    uid,
    lang,
  };
}

export function GroupDoc(data: object): IGroupDoc {
  return {data};
}
