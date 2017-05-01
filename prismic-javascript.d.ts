declare module 'prismic-javascript/src/api' {
	export const PreviewCookie = "io.prismic.preview";
	export const ExperimentCookie = "io.prismic.experiment";
	export class SearchForm {
	}
	export class Form {
	}
	export class Api {
	}
	export interface IApiOptions {
	}

}
declare module 'prismic-javascript/src/lru' {
	/**
	* A doubly linked list-based Least Recently Used (LRU) cache. Will keep most
	* recently used items while discarding least recently used items when its limit
	* is reached.
	*
	* Licensed under MIT. Copyright (c) 2010 Rasmus Andersson <http://hunch.se/>
	* Typescript-ified by Oleksandr Nikitin <https://tvori.info>
	*
	* Illustration of the design:
	*
	*       entry             entry             entry             entry
	*       ______            ______            ______            ______
	*      | head |.newer => |      |.newer => |      |.newer => | tail |
	*      |  A   |          |  B   |          |  C   |          |  D   |
	*      |______| <= older.|______| <= older.|______| <= older.|______|
	*
	*  removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added
	*/
	export function MakeLRUCache(limit: any): ILRUCache;
	export interface ILRUCache {
	    put: (key: string, value: any) => void;
	    get: (key: string, Entry: boolean) => any;
	    remove: (key: String) => void;
	    removeAll: () => void;
	}

}
declare module 'prismic-javascript/src/cache' {
	import { ILRUCache } from 'prismic-javascript/src/lru';
	export interface IApiCache {
	    isExpired: (key: String) => boolean;
	    get: (key: string, cb: (entry?: any) => any) => void;
	    set: (key: string, value: any, ttl: number, cb: () => any) => void;
	    remove: (key: string, cb: () => any) => void;
	    clear: (cb: () => any) => void;
	}
	export class ApiCache implements IApiCache {
	    lru: ILRUCache;
	    constructor(limit?: number);
	    isExpired(key: string): boolean;
	    get(key: string, cb: (entry?: any) => any): void;
	    set(key: string, value: any, ttl: number, cb: () => any): void;
	    remove(key: string, cb: () => any): void;
	    clear(cb: () => any): void;
	}

}
declare module 'prismic-javascript/src/cookies' {
	export interface ICookie {
	    [key: string]: string;
	    value: string;
	} var _default: {
	    parse: (str: string, options?: any) => ICookie;
	};
	export default _default;

}
declare module 'prismic-javascript/src/documents' {
	export interface IDocument {
	    id: string;
	    uid?: string;
	    type: string;
	    href: string;
	    tags: string[];
	    slug: string;
	    slugs: string[];
	    firstPublicationDate: Date | null;
	    lastPublicationDate: Date | null;
	    lang?: string;
	    alternateLanguages: string[];
	    data: object;
	}
	export interface IGroupDoc {
	    data: object;
	}
	export class Document implements IDocument {
	    id: string;
	    uid?: string;
	    type: string;
	    href: string;
	    tags: string[];
	    slug: string;
	    slugs: string[];
	    lang?: string;
	    alternateLanguages: string[];
	    firstPublicationDate: Date | null;
	    lastPublicationDate: Date | null;
	    data: any;
	    constructor(id: string, type: string, href: string, tags: string[], slug: string, slugs: string[], alternateLanguages: string[], firstPublicationDate: string | null, lastPublicationDate: string | null, data: any, uid?: string, lang?: string);
	}
	export class GroupDoc implements IGroupDoc {
	    data: any;
	    constructor(data: any);
	}

}
declare module 'prismic-javascript/src/experiments' {
	export interface IExperiment {
	    variations: IVariation[];
	    data: any;
	    id: () => string;
	    googleId: () => string;
	    name: () => string;
	}
	export interface IVariation {
	    data: any;
	    id: () => string;
	    ref: () => string;
	    label: () => string;
	}
	export interface IExperiments {
	    drafts: IExperiment[];
	    running: IExperiment[];
	    current: () => IExperiment | null;
	    refFromCookie: (cookie: string) => string | null;
	}
	export class Variation implements IVariation {
	    data: any;
	    constructor(data: any);
	    id(): string;
	    ref(): string;
	    label(): string;
	}
	export class Experiment implements IExperiment {
	    variations: IVariation[];
	    data: any;
	    constructor(data: any);
	    id(): string;
	    googleId(): string;
	    name(): string;
	}
	export class Experiments {
	    drafts: IExperiment[];
	    running: IExperiment[];
	    constructor(data: any);
	    current(): IExperiment | null;
	    refFromCookie(cookie: string): string | null;
	}

}
declare module 'prismic-javascript/src/request' {
	import "isomorphic-fetch";
	export interface IRequestError extends Error {
	    status: number;
	}
	export interface IRequestHandler {
	    request: (url: String, cb: (error: any, result: any, xhr: any, ttl: number) => void) => any;
	}
	export class DefaultRequestHandler implements IRequestHandler {
	    request(url: String, cb: (error: any, result: any, xhr: any, ttl: number) => void): void;
	}

}
declare module 'prismic-javascript/src/predicates' {
	export interface IPredicate {
	    op: Operator;
	    toString: () => string;
	}
	export enum Operator {
	    at = 0,
	    not = 1,
	    missing = 2,
	    has = 3,
	    any = 4,
	    in = 5,
	    fulltext = 6,
	    similar = 7,
	    "number.gt" = 8,
	    "number.lt" = 9,
	    "number.inRange" = 10,
	    "date.before" = 11,
	    "date.after" = 12,
	    "date.between" = 13,
	    "date.day-of-month" = 14,
	    "date.day-of-month-after" = 15,
	    "date.day-of-month-before" = 16,
	    "date.day-of-week" = 17,
	    "date.day-of-week-after" = 18,
	    "date.day-of-week-before" = 19,
	    "date.month" = 20,
	    "date.month-before" = 21,
	    "date.month-after" = 22,
	    "date.year" = 23,
	    "date.hour" = 24,
	    "date.hour-before" = 25,
	    "date.hour-after" = 26,
	    "geopoint.near" = 27,
	}
	export class AtPredicate implements IPredicate {
	    fragment: string;
	    value: string;
	    op: Operator;
	    constructor(fragment: string, value: string);
	    toString(): string;
	}
	export class NotPredicate implements IPredicate {
	    fragment: string;
	    value: string;
	    op: Operator;
	    constructor(fragment: string, value: string);
	    toString(): string;
	}
	export class MissingPredicate implements IPredicate {
	    fragment: string;
	    op: Operator;
	    constructor(fragment: string);
	    toString(): string;
	}
	export class HasPredicate implements IPredicate {
	    fragment: string;
	    op: Operator;
	    constructor(fragment: string);
	    toString(): string;
	}
	export class AnyPredicate implements IPredicate {
	    fragment: string;
	    values: string[];
	    op: Operator;
	    constructor(fragment: string, values: string[]);
	    toString(): string;
	}
	export class InPredicate implements IPredicate {
	    fragment: string;
	    values: string[];
	    op: Operator;
	    constructor(fragment: string, values: string[]);
	    toString(): string;
	}
	export class FulltextPredicate implements IPredicate {
	    fragment: string;
	    value: string;
	    op: Operator;
	    constructor(fragment: string, value: string);
	    toString(): string;
	}
	export class SimilarPredicate implements IPredicate {
	    documentId: string;
	    maxResults: number;
	    op: Operator;
	    constructor(documentId: string, maxResults: number);
	    toString(): string;
	}
	export class GtPredicate implements IPredicate {
	    fragment: string;
	    value: number;
	    op: Operator;
	    constructor(fragment: string, value: number);
	    toString(): string;
	}
	export class LtPredicate implements IPredicate {
	    fragment: string;
	    value: number;
	    op: Operator;
	    constructor(fragment: string, value: number);
	    toString(): string;
	}
	export class InRangePredicate implements IPredicate {
	    fragment: string;
	    before: number;
	    after: number;
	    op: Operator;
	    constructor(fragment: string, before: number, after: number);
	    toString(): string;
	}
	export class DateBeforePredicate implements IPredicate {
	    fragment: string;
	    before: Date;
	    op: Operator;
	    constructor(fragment: string, before: Date);
	    toString(): string;
	}
	export class DateAfterPredicate implements IPredicate {
	    fragment: string;
	    after: Date;
	    op: Operator;
	    constructor(fragment: string, after: Date);
	    toString(): string;
	}
	export class DateBetweenPredicate implements IPredicate {
	    fragment: string;
	    before: Date;
	    after: Date;
	    op: Operator;
	    constructor(fragment: string, before: Date, after: Date);
	    toString(): string;
	}
	export class DayOfMonthPredicate implements IPredicate {
	    fragment: string;
	    day: number;
	    op: Operator;
	    constructor(fragment: string, day: number);
	    toString(): string;
	}
	export class DayOfMonthAfterPredicate implements IPredicate {
	    fragment: string;
	    day: number;
	    op: Operator;
	    constructor(fragment: string, day: number);
	    toString(): string;
	}
	export class DayOfMonthBeforePredicate implements IPredicate {
	    fragment: string;
	    day: number;
	    op: Operator;
	    constructor(fragment: string, day: number);
	    toString(): string;
	}
	export class DayOfWeekPredicate implements IPredicate {
	    fragment: string;
	    day: number;
	    op: Operator;
	    constructor(fragment: string, day: number);
	    toString(): string;
	}
	export class DayOfWeekAfterPredicate implements IPredicate {
	    fragment: string;
	    day: number;
	    op: Operator;
	    constructor(fragment: string, day: number);
	    toString(): string;
	}
	export class DayOfWeekBeforePredicate implements IPredicate {
	    fragment: string;
	    day: number;
	    op: Operator;
	    constructor(fragment: string, day: number);
	    toString(): string;
	}
	export class MonthPredicate implements IPredicate {
	    fragment: string;
	    month: number | string;
	    op: Operator;
	    constructor(fragment: string, month: number | string);
	    toString(): string;
	}
	export class MonthBeforePredicate implements IPredicate {
	    fragment: string;
	    month: number | string;
	    op: Operator;
	    constructor(fragment: string, month: number | string);
	    toString(): string;
	}
	export class MonthAfterPredicate implements IPredicate {
	    fragment: string;
	    month: number | string;
	    op: Operator;
	    constructor(fragment: string, month: number | string);
	    toString(): string;
	}
	export class YearPredicate implements IPredicate {
	    fragment: string;
	    year: number;
	    op: Operator;
	    constructor(fragment: string, year: number);
	    toString(): string;
	}
	export class HourPredicate implements IPredicate {
	    fragment: string;
	    hour: number;
	    op: Operator;
	    constructor(fragment: string, hour: number);
	    toString(): string;
	}
	export class HourBeforePredicate implements IPredicate {
	    fragment: string;
	    hour: number;
	    op: Operator;
	    constructor(fragment: string, hour: number);
	    toString(): string;
	}
	export class HourAfterPredicate implements IPredicate {
	    fragment: string;
	    hour: number;
	    op: Operator;
	    constructor(fragment: string, hour: number);
	    toString(): string;
	}
	export class NearPredicate implements IPredicate {
	    fragment: string;
	    latitude: number;
	    longitude: number;
	    radius: number;
	    op: Operator;
	    constructor(fragment: string, latitude: number, longitude: number, radius: number);
	    toString(): string;
	}

}
declare module 'prismic-javascript/src/index' {
	import { Document } from 'prismic-javascript/src/documents';
	import { IApiOptions, Api, Form, SearchForm } from 'prismic-javascript/src/api';
	import * as Predicates from 'prismic-javascript/src/predicates';
	import { Experiments } from 'prismic-javascript/src/experiments'; var _default: {
	    experimentCookie: string;
	    previewCookie: string;
	    Document: typeof Document;
	    SearchForm: typeof SearchForm;
	    Form: typeof Form;
	    Experiments: typeof Experiments;
	    Predicates: typeof Predicates;
	    api: (url: String, options?: IApiOptions) => Promise<Api>;
	};
	export default _default;

}
