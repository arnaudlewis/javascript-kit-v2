import { IPredicate, Predicates } from './predicates';
import { IExperiments, IExperiment, Experiments } from './experiments';
import { IRequestHandler, DefaultRequestHandler } from './request';
import { IDocument } from './documents';
import { IApiCache, DefaultApiCache } from './cache';
import Cookies from './cookies';
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

  constructor(ref: string, label: string, isMaster: string, scheduledAt: string, id: string) {
    this.ref = ref;
    this.label = label;
    this.isMaster = isMaster;
    this.scheduledAt = scheduledAt;
    this.id = id;
  }
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

  getField(field: string): IField | undefined
  getFieldSafe(field: string): IField
}

export class Form implements IForm {
  fields: any;
  action: string;
  name: string;
  rel: string;
  form_method: string;
  enctype: string;

  constructor(
    fields: any,
    action: string,
    name: string,
    rel: string,
    form_method: string,
    enctype: string
  ) {
    this.fields = fields;
    this.action = action;
    this.name = name;
    this.rel = rel;
    this.form_method = form_method;
    this.enctype = enctype;
  }

  getField(field: string): IField | undefined {
    return this.fields[field];
  }

  getFieldSafe(field: string): IField {
    const f = this.fields[field];
    if(!f) throw new Error(`Missing field ${f} in form fields ${this.fields}`);
    return f;
  }
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
  orderings(orderings ?: string[]): ISearchForm;
  submit(callback: (error: Error | null, response: IApiResponse, xhr: any) => void): any;
}

export class SearchForm implements ISearchForm {
  api: IApi;
  form: IForm;
  data: any;

  constructor(api: IApi, form: IForm, data: any) {
    this.api = api;
    this.form = form;
    this.data = data || {};

    for(var field in form.fields) {
      if(form.getFieldSafe(field)['default']) {
        this.data[field] = [form.fields[field]['default']];
      }
    }
  }

  set(field: string, value: any): ISearchForm {
    const fieldDesc = this.form.getField(field);

    if(!fieldDesc) throw new Error("Unknown field " + field);

    const checkedValue = () => value === '' || value === undefined ? null : value;
    const values = (() => {
      const defaultValues = this.data[field] || [];
      if(fieldDesc.multiple) {
        return checkedValue ? defaultValues.concat([checkedValue]) : defaultValues;
      } else {
        return checkedValue ? [checkedValue] : defaultValues;
      }
    })();
    return this;
  }

  /**
   * Sets a ref to query on for this SearchForm. This is a mandatory
   * method to call before calling submit(), and api.form('everything').submit()
   * will not work.
   */
  ref(ref: string): ISearchForm {
    return this.set("ref", ref);
  }

  /**
   * Sets a predicate-based query for this SearchForm. This is where you
   * paste what you compose in your prismic.io API browser.
   */
  query(query: string | IPredicate | IPredicate[]): ISearchForm {
    if (typeof query === 'string') {
      return this.set("q", query);
    } else if(query instanceof Array) {
      const predicates = query.map((predicate: IPredicate) => {
        return predicate.toString();
      });
      return this.query(`[${predicates.join("")}]`);
    } else {
      return this.query([query]);
    }
  }

  /**
   * Sets a page size to query for this SearchForm. This is an optional method.
   *
   * @param {number} size - The page size
   * @returns {SearchForm} - The SearchForm itself
   */
  pageSize(size: number): ISearchForm {
    return this.set("pageSize", size);
  }

  /**
   * Restrict the results document to the specified fields
   */
  fetch(fields: string | string[]): ISearchForm {
    const strFields = fields instanceof Array ? fields.join(",") : fields;
    return this.set("fetch", strFields);
  }

  /**
   * Include the requested fields in the DocumentLink instances in the result
   */
  fetchLinks(fields: string | string[]): ISearchForm {
    const strFields = fields instanceof Array ? fields.join(",") : fields;
    return this.set("fetchLinks", strFields);
  }

  /**
   * Sets the language to query for this SearchForm. This is an optional method.
   */
  lang(langCode: string) {
    return this.set("lang", langCode);
  }

  /**
   * Sets the page number to query for this SearchForm. This is an optional method.
   */
  page(p: number): ISearchForm {
    return this.set("page", p);
  }

  /**
   * Sets the orderings to query for this SearchForm. This is an optional method.
   */
  orderings(orderings ?: string[]): ISearchForm {
    if (!orderings) {
      return this;
    } else {
      return this.set("orderings", `[${orderings.join(",")}]`);
    }
  }

  /**
   * Submits the query, and calls the callback function.
   */
  submit(callback: (error: Error | null, response: IApiResponse, xhr: any) => void): any {
    var self = this;
    var url = this.form.action;

    if (this.data) {
      var sep = (url.indexOf('?') > -1 ? '&' : '?');
      for(var key in this.data) {
        if (this.data.hasOwnProperty(key)) {
          var values = this.data[key];
          if (values) {
            for (var i = 0; i < values.length; i++) {
              url += sep + key + '=' + encodeURIComponent(values[i]);
              sep = '&';
            }
          }
        }
      }
    }

    return this.api.requestHandler.request(url, callback);
  }
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

  constructor(
    page: number,
    results_per_page: number,
    results_size: number,
    total_results_size: number,
    total_pages: number,
    next_page: string,
    prev_page: string,
    results: IDocument[]
  ) {
    this.page = page;
    this.results_per_page = results_per_page;
    this.results_size = results_size;
    this.total_results_size = total_results_size;
    this.total_pages = total_pages;
    this.next_page = next_page;
    this.prev_page = prev_page;
    this.results = results;
  }
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

  constructor(url: string, options: IApiOptions) {
    var opts = options || {};
    this.accessToken = opts.accessToken;
    this.url = url + (this.accessToken ? (url.indexOf('?') > -1 ? '&' : '?') + 'access_token=' + this.accessToken : '');
    this.apiCache = opts.apiCache || new DefaultApiCache();
    this.requestHandler = opts.requestHandler || new DefaultRequestHandler();
    this.apiCacheKey = this.url + (this.accessToken ? ('#' + this.accessToken) : '');
    this.apiDataTTL = opts.apiDataTTL || 5;
    return this;
  }
  /**
   * Fetches data used to construct the api client, from cache if it's
   * present, otherwise from calling the prismic api endpoint (which is
   * then cached).
   */
  get(callback: (err: Error | null, value?: any, xhr?: any, ttl?: number) => void) {
    var self = this;
    var cacheKey = this.apiCacheKey;

    return new Promise(function (resolve, reject) {
      var cb = function(err: Error | null, value?: any, xhr?: any, ttl?: number) {
        if (callback) callback(err, value, xhr, ttl);
        if (value) resolve(value);
        if (err) reject(err);
      };
      self.apiCache.get(cacheKey, function (err: Error, value: any) {
        if (err || value) {
          cb(err, value);
          return;
        }

        self.requestHandler.request(self.url, function(err: Error | null, value?: any, xhr?: any, ttl?: number) {
          if (err) {
            cb(err, null, xhr, ttl);
            return;
          }

          var parsed = self.parse(value);
          ttl = ttl || self.apiDataTTL;

          self.apiCache.set(cacheKey, parsed, ttl, function (err: Error) {
            cb(err, parsed, xhr, ttl);
          });
        });
      });
    });
  }

  /**
   * Cleans api data from the cache and fetches an up to date copy.
   *
   * @param {function} callback - Optional callback function that is called after the data has been refreshed
   * @returns {Promise}
   */
  refresh(callback: (err: Error | null | undefined, data: any, xhr: any) => void) {
    const self = this;
    const cacheKey = this.apiCacheKey;

    return new Promise(function(resolve, reject) {
      var cb = function(err?: Error | null, value?: any, xhr?: any) {
        if (callback) callback(err, value, xhr);
        if (value) resolve(value);
        if (err) reject(err);
      };
      self.apiCache.remove(cacheKey, (err: Error) => {
        if (err) { cb(err); return; }

        self.get(function (err: Error, data: any) {
          if (err) { cb(err); return; }

          self.data = data;
          self.bookmarks = data.bookmarks;
          self.experiments = new Experiments(data.experiments);

          cb();
        });
      });
    });
  }

  /**
   * Parses and returns the /api document.
   * This is for internal use, from outside this kit, you should call Prismic.Api()
   *
   * @param {string} data - The JSON document responded on the API's endpoint
   * @returns {Api} - The Api object that can be manipulated
   * @private
   */
  parse(data: any) {
    // Parse the forms
    const forms = Object.keys(data.forms || []).reduce((acc: any, key: string, i: number) => {
      if (data.forms.hasOwnProperty(key)) {
        const f = data.forms[key];

        if(this.accessToken) {
          f.fields['access_token'] = {};
          f.fields['access_token']['type'] = 'string';
          f.fields['access_token']['default'] = this.accessToken;
        }

        const form = new Form(
          f.name,
          f.fields,
          f.form_method,
          f.rel,
          f.enctype,
          f.action
        );

        acc[key] = form;
      } else {
        return acc;
      }
    }, {});

    const refs = data.refs.map((r: any) => {
      return new Ref(
        r.ref,
        r.label,
        r.isMasterRef,
        r.scheduledAt,
        r.id
      );
    }) || [];

    const master = refs.filter((r: any) => {
      return r.isMaster === true;
    });

    const types = data.types;

    const tags = data.tags;

    if (master.length === 0) {
      throw ("No master ref.");
    }

    return {
      bookmarks: data.bookmarks || {},
      refs: refs,
      forms: forms,
      master: master[0],
      types: types,
      tags: tags,
      experiments: data.experiments,
      oauthInitiate: data['oauth_initiate'],
      oauthToken: data['oauth_token'],
      quickRoutes: data.quickRoutes
    };

  }

  /**
   * Returns a useable form from its id, as described in the RESTful description of the API.
   * For instance: api.form("everything") works on every repository (as "everything" exists by default)
   * You can then chain the calls: api.form("everything").query('[[:d = at(document.id, "UkL0gMuvzYUANCpf")]]').ref(ref).submit()
   */
  form(formId: string): ISearchForm | null {
    var form = this.data.forms[formId];
    if(form) {
      return new SearchForm(this, form, {});
    }
    return null;
  }

  everything(): ISearchForm {
    const f = this.form("everything");
    if(!f) throw new Error("Missing everything form");
    return f;
  }

  /**
   * The ID of the master ref on this prismic.io API.
   * Do not use like this: searchForm.ref(api.master()).
   * Instead, set your ref once in a variable, and call it when you need it; this will allow to change the ref you're viewing easily for your entire page.
   */
  master(): string {
    return this.data.master.ref;
  }

  /**
   * Returns the ref ID for a given ref's label.
   * Do not use like this: searchForm.ref(api.ref("Future release label")).
   * Instead, set your ref once in a variable, and call it when you need it; this will allow to change the ref you're viewing easily for your entire page.
   */
  ref(label: string): string | null {
    for(var i=0; i<this.data.refs.length; i++) {
      if(this.data.refs[i].label == label) {
        return this.data.refs[i].ref;
      }
    }
    return null;
  }

  /**
   * The current experiment, or null
   */
  currentExperiment(): IExperiment | null {
    return this.experiments.current();
  }

  quickRoutesEnabled(): boolean {
    return this.data.quickRoutes.enabled;
  }

  /**
   * Retrieve quick routes definitions
   */
  quickRoutes(callback: (err: Error, data: any, xhr: any) => void) {
    var self = this;
    return new Promise(function(resolve, reject) {
      this.requestHandler.request(self.data.quickRoutes.url, function(err: Error, data: any, xhr: any) {
        if (callback) callback(err, data, xhr);
        if (err) reject(err);
        if (data) resolve(data);
      });
    });
  }

  /**
   * Query the repository
   * @param {string|array|Predicate} the query itself
   * @param {object} additional parameters. In NodeJS, pass the request as 'req'.
   * @param {function} callback(err, response)
   */
  query(q: string | IPredicate | IPredicate[], optionsOrCallback: object | ((err: Error | null, response?: any) => void), cb: (err: Error | null, response?: any) => void) {
        const {options, callback} = typeof optionsOrCallback === 'function'
      ? {options: {}, callback: optionsOrCallback}
      : {options: optionsOrCallback || {}, callback: cb};

    const opts: any = options;

    var form = this.everything();
    for (var key in opts) {
      form = form.set(key, opts[key]);
    }
    if (q) {
      form.query(q);
    }
    return form.submit(callback);
  }

  /**
   * Retrieve the document returned by the given query
   * @param {string|array|Predicate} the query
   * @param {object} additional parameters. In NodeJS, pass the request as 'req'.
   * @param {function} callback(err, doc)
   */
  queryFirst(q: string | IPredicate[] | IPredicate, optionsOrCallback: object | ((err: Error | null, response?: any) => void), cb: (err: Error | null, response?: any) => void) {
    const {options, callback} = typeof optionsOrCallback === 'function'
      ? {options: {}, callback: optionsOrCallback}
      : {options: optionsOrCallback || {}, callback: cb};

    const opts: any = options;
    opts.page = 1;
    opts.pageSize = 1;
    return this.query(q, opts, function(err: Error, response: any) {
      if (callback) {
        var result = response && response.results && response.results[0];
        callback(err, result);
      }
    }).then(function(response: any){
      return response && response.results && response.results[0];
    });
  }

  /**
   * Retrieve the document with the given id
   */
  getByID(id: string, options: any, callback: (err: Error | null, response?: any) => void) {
    options = options || {};
    if(!options.lang) options.lang = '*';
    return this.queryFirst(new Predicates.at('document.id', id), options, callback);
  }

  /**
   * Retrieve multiple documents from an array of id
   */
  getByIDs(ids: string[], options: any, callback: (err: Error | null, response?: any) => void) {
    options = options || {};
    if(!options.lang) options.lang = '*';
    return this.query(new Predicates.in('document.id', ids), options, callback);
  }

  /**
   * Retrieve the document with the given uid
   */
  getByUID(type: string, uid: string, options: any, callback: (err: Error | null, response?: any) => void) {
    options = options || {};
    if(!options.lang) options.lang = '*';
    return this.queryFirst(new Predicates.at(`my.${type}.uid`, uid), options, callback);
  }

  /**
   * Retrieve the singleton document with the given type
   */
  getSingle(type: string, options: any, callback: (err: Error | null, response?: any) => void) {
    return this.queryFirst(new Predicates.at('document.type', type), options, callback);
  }

  /**
   * Retrieve the document with the given bookmark
   */
  getBookmark(bookmark: string, options: any, callback: (err: Error | null, response?: any) => void) {
    return new Promise(function(resolve, reject) {
      var id = this.bookmarks[bookmark];
      if (id) {
        resolve(id);
      } else {
        var err = new Error("Error retrieving bookmarked id");
        if (callback) callback(err);
        reject(err);
      }
    }).then(function(id) {
      return this.getByID(id, options, callback);
    });
  }

  /**
   * Return the URL to display a given preview
   */
  previewSession(token: string, linkResolver: (ctx: any) => string, defaultUrl: string, callback: (err: Error | null, url?: any, xhr?: any) => void): PromiseLike<string> {
    var api = this;
    return new Promise(function(resolve, reject) {
      var cb = function(err: Error | null, url?: string, xhr?: any) {
        if (callback) callback(err, url, xhr);
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      };
      api.requestHandler.request(token, function(err: Error, result: any, xhr: any) {
        if (err) {
          cb(err, defaultUrl, xhr);
          return;
        }
        try {
          var mainDocumentId = result.mainDocument;
          if (!mainDocumentId) {
            cb(null, defaultUrl, xhr);
          } else {
            api.everything().query(new Predicates.at("document.id", mainDocumentId)).ref(token).lang('*').submit(function(err: Error, response: IApiResponse) {
              if (err) {
                cb(err);
              }
              try {
                if (response.results.length === 0) {
                  cb(null, defaultUrl, xhr);
                } else {
                  cb(null, linkResolver(response.results[0]), xhr);
                }
              } catch (e) {
                cb(e);
              }
            });
          }
        } catch (e) {
          cb(e, defaultUrl, xhr);
        }
      });
    });
  }

  /**
   * Fetch a URL corresponding to a query, and parse the response as a Response object
   */
  request(url: string, callback: (err: Error | null, results: IApiResponse | null, xhr?: any) => void): PromiseLike<IApiResponse> {
    var api = this;
    var cacheKey = url + (this.accessToken ? ('#' + this.accessToken) : '');
    var cache = this.apiCache;
    function run(cb: (err: Error | null, results: IApiResponse | null, xhr?: any) => void) {
      cache.get(cacheKey, function (err: Error, value: string) {
        if (err || value) {
          cb(err, api.response(value));
          return;
        }
        api.requestHandler.request(url, function(err: Error, documents: any, xhr: any, ttl?: number) {
          if (err) {
            cb(err, null, xhr);
            return;
          }

          if (ttl) {
            cache.set(cacheKey, documents, ttl, function (err: Error) {
              cb(err, api.response(documents));
            });
          } else {
            cb(null, api.response(documents));
          }
        });
      });
    }
    return new Promise(function(resolve, reject) {
      run(function(err, value, xhr) {
        if (callback) callback(err, value, xhr);
        if (err) reject(err);
        if (value) resolve(value);
      });
    });
  }

  getNextPage(nextPage: number, callback: (err: Error | null, results: IApiResponse | null, xhr?: any) => void) {
    return this.request(nextPage + (this.accessToken ? '&access_token=' + this.accessToken : ''), callback);
  }

  /**
   * JSON documents to Response object
   */
  response(documents: any){
    return new ApiResponse(
      documents.page,
      documents.results_per_page,
      documents.results_size,
      documents.total_results_size,
      documents.total_pages,
      documents.next_page,
      documents.prev_page,
      documents.results || []);
  }
}
