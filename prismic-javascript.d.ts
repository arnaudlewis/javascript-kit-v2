declare module 'prismic-javascript/src/predicates' {
	export interface IPredicate {
	    op: Operator;
	    toString(): string;
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
	export const Predicates: {
	    at: typeof AtPredicate;
	    not: typeof NotPredicate;
	    missing: typeof MissingPredicate;
	    has: typeof HasPredicate;
	    any: typeof AnyPredicate;
	    in: typeof InPredicate;
	    fulltext: typeof FulltextPredicate;
	    similar: typeof SimilarPredicate;
	    gt: typeof GtPredicate;
	    lt: typeof LtPredicate;
	    inRange: typeof InRangePredicate;
	    before: typeof DateBeforePredicate;
	    after: typeof DateAfterPredicate;
	    between: typeof DateBetweenPredicate;
	    dayOfMonth: typeof DayOfMonthPredicate;
	    dayOfMonthAfter: typeof DayOfMonthAfterPredicate;
	    dayOfMonthBefore: typeof DayOfMonthBeforePredicate;
	    dayOfWeek: typeof DayOfWeekPredicate;
	    dayOfWeekAfter: typeof DayOfWeekAfterPredicate;
	    dayOfWeekBefore: typeof DayOfWeekBeforePredicate;
	    month: typeof MonthPredicate;
	    monthBefore: typeof MonthBeforePredicate;
	    monthAfter: typeof MonthAfterPredicate;
	    year: typeof YearPredicate;
	    hour: typeof HourPredicate;
	    hourBefore: typeof HourBeforePredicate;
	    hourAfter: typeof HourAfterPredicate;
	    near: typeof NearPredicate;
	};

}
declare module 'prismic-javascript/src/experiments' {
	export interface IExperiment {
	    variations: IVariation[];
	    data: any;
	    id(): string;
	    googleId(): string;
	    name(): string;
	}
	export interface IVariation {
	    data: any;
	    id(): string;
	    ref(): string;
	    label(): string;
	}
	export interface IExperiments {
	    drafts: IExperiment[];
	    running: IExperiment[];
	    current(): IExperiment | null;
	    refFromCookie(cookie: string): string | null;
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
	    request(url: String, cb: (error: Error | null, result?: any, xhr?: any) => void): void;
	}
	export class DefaultRequestHandler implements IRequestHandler {
	    request(url: String, cb: (error: Error | null, result?: any, xhr?: any, ttl?: number) => void): void;
	}

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
	    put(key: string, value: any): void;
	    get(key: string, Entry: boolean): any;
	    remove(key: String): void;
	    removeAll(): void;
	}

}
declare module 'prismic-javascript/src/cache' {
	import { ILRUCache } from 'prismic-javascript/src/lru';
	export interface IApiCache {
	    isExpired(key: String): boolean;
	    get(key: string, cb: (error?: Error | null, entry?: any) => any): void;
	    set(key: string, value: any, ttl: number, cb: (error?: Error | null, entry?: any) => any): void;
	    remove(key: string, cb: (error?: Error | null) => any): void;
	    clear(cb: (error?: Error | null) => any): void;
	}
	export class DefaultApiCache implements IApiCache {
	    lru: ILRUCache;
	    constructor(limit?: number);
	    isExpired(key: string): boolean;
	    get(key: string, cb: (error?: Error | null, entry?: any) => any): void;
	    set(key: string, value: any, ttl: number, cb: (error?: Error | null, entry?: any) => any): void;
	    remove(key: string, cb: (error?: Error | null) => any): void;
	    clear(cb: (error?: Error | null) => any): void;
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
declare module 'prismic-javascript/src/api' {
	import { IPredicate } from 'prismic-javascript/src/predicates';
	import { IExperiments, IExperiment } from 'prismic-javascript/src/experiments';
	import { IRequestHandler } from 'prismic-javascript/src/request';
	import { IDocument } from 'prismic-javascript/src/documents';
	import { IApiCache } from 'prismic-javascript/src/cache';
	export const PreviewCookie = "io.prismic.preview";
	export const ExperimentCookie = "io.prismic.experiment";
	export interface IRef {
	    ref: string;
	    label: string;
	    isMaster: string;
	    scheduledAt: string;
	    id: string;
	}
	export class Ref implements IRef {
	    ref: string;
	    label: string;
	    isMaster: string;
	    scheduledAt: string;
	    id: string;
	    constructor(ref: string, label: string, isMaster: string, scheduledAt: string, id: string);
	}
	export interface IField {
	    [key: string]: string;
	    value: string;
	}
	export interface IForm {
	    fields: any;
	    action: string;
	    name: string;
	    rel: string;
	    form_method: string;
	    enctype: string;
	    getField(field: string): IField | undefined;
	    getFieldSafe(field: string): IField;
	}
	export class Form implements IForm {
	    fields: any;
	    action: string;
	    name: string;
	    rel: string;
	    form_method: string;
	    enctype: string;
	    constructor(fields: any, action: string, name: string, rel: string, form_method: string, enctype: string);
	    getField(field: string): IField | undefined;
	    getFieldSafe(field: string): IField;
	}
	export interface ISearchForm {
	    api: IApi;
	    form: IForm;
	    data: any;
	    set(field: string, value: any): ISearchForm;
	    ref(ref: string): ISearchForm;
	    query(query: string | IPredicate | IPredicate[]): ISearchForm;
	    pageSize(size: number): ISearchForm;
	    fetch(fields: string | string[]): ISearchForm;
	    fetchLinks(fields: string | string[]): ISearchForm;
	    lang(langCode: string): ISearchForm;
	    page(p: number): ISearchForm;
	    orderings(orderings?: string[]): ISearchForm;
	    submit(callback: (error: Error | null, response: IApiResponse, xhr: any) => void): any;
	}
	export class SearchForm implements ISearchForm {
	    api: IApi;
	    form: IForm;
	    data: any;
	    constructor(api: IApi, form: IForm, data: any);
	    set(field: string, value: any): ISearchForm;
	    /**
	     * Sets a ref to query on for this SearchForm. This is a mandatory
	     * method to call before calling submit(), and api.form('everything').submit()
	     * will not work.
	     */
	    ref(ref: string): ISearchForm;
	    /**
	     * Sets a predicate-based query for this SearchForm. This is where you
	     * paste what you compose in your prismic.io API browser.
	     */
	    query(query: string | IPredicate | IPredicate[]): ISearchForm;
	    /**
	     * Sets a page size to query for this SearchForm. This is an optional method.
	     *
	     * @param {number} size - The page size
	     * @returns {SearchForm} - The SearchForm itself
	     */
	    pageSize(size: number): ISearchForm;
	    /**
	     * Restrict the results document to the specified fields
	     */
	    fetch(fields: string | string[]): ISearchForm;
	    /**
	     * Include the requested fields in the DocumentLink instances in the result
	     */
	    fetchLinks(fields: string | string[]): ISearchForm;
	    /**
	     * Sets the language to query for this SearchForm. This is an optional method.
	     */
	    lang(langCode: string): ISearchForm;
	    /**
	     * Sets the page number to query for this SearchForm. This is an optional method.
	     */
	    page(p: number): ISearchForm;
	    /**
	     * Sets the orderings to query for this SearchForm. This is an optional method.
	     */
	    orderings(orderings?: string[]): ISearchForm;
	    /**
	     * Submits the query, and calls the callback function.
	     */
	    submit(callback: (error: Error | null, response: IApiResponse, xhr: any) => void): any;
	}
	export interface IApiResponse {
	    page: number;
	    results_per_page: number;
	    results_size: number;
	    total_results_size: number;
	    total_pages: number;
	    next_page: string;
	    prev_page: string;
	    results: IDocument[];
	}
	export class ApiResponse {
	    page: number;
	    results_per_page: number;
	    results_size: number;
	    total_results_size: number;
	    total_pages: number;
	    next_page: string;
	    prev_page: string;
	    results: IDocument[];
	    constructor(page: number, results_per_page: number, results_size: number, total_results_size: number, total_pages: number, next_page: string, prev_page: string, results: IDocument[]);
	}
	export interface IApiOptions {
	    accessToken: string;
	    complete?: (err: Error | null, value?: any, xhr?: any) => void;
	    requestHandler?: IRequestHandler;
	    apiCache?: IApiCache;
	    apiDataTTL?: number;
	}
	export interface IApi {
	    url: string;
	    accessToken: string;
	    apiCacheKey: string;
	    apiCache: IApiCache;
	    apiDataTTL: number;
	    requestHandler: IRequestHandler;
	    experiments: IExperiments;
	    bookmarks: string[];
	    data: any;
	    forms: IForm[];
	}
	export class Api implements IApi {
	    url: string;
	    accessToken: string;
	    apiCacheKey: string;
	    apiCache: IApiCache;
	    apiDataTTL: number;
	    requestHandler: IRequestHandler;
	    experiments: IExperiments;
	    bookmarks: string[];
	    data: any;
	    forms: IForm[];
	    constructor(url: string, options: IApiOptions);
	    /**
	     * Fetches data used to construct the api client, from cache if it's
	     * present, otherwise from calling the prismic api endpoint (which is
	     * then cached).
	     */
	    get(callback: (err: Error | null, value?: any, xhr?: any, ttl?: number) => void): Promise<{}>;
	    /**
	     * Cleans api data from the cache and fetches an up to date copy.
	     *
	     * @param {function} callback - Optional callback function that is called after the data has been refreshed
	     * @returns {Promise}
	     */
	    refresh(callback: (err: Error | null | undefined, data: any, xhr: any) => void): Promise<{}>;
	    /**
	     * Parses and returns the /api document.
	     * This is for internal use, from outside this kit, you should call Prismic.Api()
	     *
	     * @param {string} data - The JSON document responded on the API's endpoint
	     * @returns {Api} - The Api object that can be manipulated
	     * @private
	     */
	    parse(data: any): {
	        bookmarks: any;
	        refs: any;
	        forms: any;
	        master: any;
	        types: any;
	        tags: any;
	        experiments: any;
	        oauthInitiate: any;
	        oauthToken: any;
	        quickRoutes: any;
	    };
	    /**
	     * Returns a useable form from its id, as described in the RESTful description of the API.
	     * For instance: api.form("everything") works on every repository (as "everything" exists by default)
	     * You can then chain the calls: api.form("everything").query('[[:d = at(document.id, "UkL0gMuvzYUANCpf")]]').ref(ref).submit()
	     */
	    form(formId: string): ISearchForm | null;
	    everything(): ISearchForm;
	    /**
	     * The ID of the master ref on this prismic.io API.
	     * Do not use like this: searchForm.ref(api.master()).
	     * Instead, set your ref once in a variable, and call it when you need it; this will allow to change the ref you're viewing easily for your entire page.
	     */
	    master(): string;
	    /**
	     * Returns the ref ID for a given ref's label.
	     * Do not use like this: searchForm.ref(api.ref("Future release label")).
	     * Instead, set your ref once in a variable, and call it when you need it; this will allow to change the ref you're viewing easily for your entire page.
	     */
	    ref(label: string): string | null;
	    /**
	     * The current experiment, or null
	     */
	    currentExperiment(): IExperiment | null;
	    quickRoutesEnabled(): boolean;
	    /**
	     * Retrieve quick routes definitions
	     */
	    quickRoutes(callback: (err: Error, data: any, xhr: any) => void): Promise<{}>;
	    /**
	     * Query the repository
	     * @param {string|array|Predicate} the query itself
	     * @param {object} additional parameters. In NodeJS, pass the request as 'req'.
	     * @param {function} callback(err, response)
	     */
	    query(q: string | IPredicate | IPredicate[], optionsOrCallback: object | ((err: Error | null, response?: any) => void), cb: (err: Error | null, response?: any) => void): any;
	    /**
	     * Retrieve the document returned by the given query
	     * @param {string|array|Predicate} the query
	     * @param {object} additional parameters. In NodeJS, pass the request as 'req'.
	     * @param {function} callback(err, doc)
	     */
	    queryFirst(q: string | IPredicate[] | IPredicate, optionsOrCallback: object | ((err: Error | null, response?: any) => void), cb: (err: Error | null, response?: any) => void): any;
	    /**
	     * Retrieve the document with the given id
	     */
	    getByID(id: string, options: any, callback: (err: Error | null, response?: any) => void): any;
	    /**
	     * Retrieve multiple documents from an array of id
	     */
	    getByIDs(ids: string[], options: any, callback: (err: Error | null, response?: any) => void): any;
	    /**
	     * Retrieve the document with the given uid
	     */
	    getByUID(type: string, uid: string, options: any, callback: (err: Error | null, response?: any) => void): any;
	    /**
	     * Retrieve the singleton document with the given type
	     */
	    getSingle(type: string, options: any, callback: (err: Error | null, response?: any) => void): any;
	    /**
	     * Retrieve the document with the given bookmark
	     */
	    getBookmark(bookmark: string, options: any, callback: (err: Error | null, response?: any) => void): Promise<any>;
	    /**
	     * Return the URL to display a given preview
	     */
	    previewSession(token: string, linkResolver: (ctx: any) => string, defaultUrl: string, callback: (err: Error | null, url?: any, xhr?: any) => void): PromiseLike<string>;
	    /**
	     * Fetch a URL corresponding to a query, and parse the response as a Response object
	     */
	    request(url: string, callback: (err: Error | null, results: IApiResponse | null, xhr?: any) => void): PromiseLike<IApiResponse>;
	    getNextPage(nextPage: number, callback: (err: Error | null, results: IApiResponse | null, xhr?: any) => void): PromiseLike<IApiResponse>;
	    /**
	     * JSON documents to Response object
	     */
	    response(documents: any): ApiResponse;
	}

}
declare module 'prismic-javascript/src/index' {
	import { Document } from 'prismic-javascript/src/documents';
	import { IApiOptions, IApi, Form, SearchForm } from 'prismic-javascript/src/api';
	import * as Predicates from 'prismic-javascript/src/predicates';
	import { Experiments } from 'prismic-javascript/src/experiments'; var _default: {
	    experimentCookie: string;
	    previewCookie: string;
	    Document: typeof Document;
	    SearchForm: typeof SearchForm;
	    Form: typeof Form;
	    Experiments: typeof Experiments;
	    Predicates: typeof Predicates;
	    api: (url: string, options: IApiOptions) => Promise<IApi>;
	};
	export default _default;

}
