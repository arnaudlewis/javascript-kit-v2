import 'isomorphic-fetch';

import { Document, GroupDoc } from "./documents";
import {
  IApiOptions,
  IApi,
  Api,
  ExperimentCookie,
  PreviewCookie,
  Form,
  SearchForm
} from "./api";

import { DefaultRequestHandler } from './request';
import * as Predicates from './predicates';
import { Experiments } from './experiments';

function getApi(url: string, options: IApiOptions): Promise<IApi> {
  var api = new Api(url, options);
  //Use cached api data if available
  return new Promise(function(resolve, reject) {
    var cb = function(err: Error | null, api?: any) {
      if (options.complete) options.complete(err, api);
      if (err) {
        reject(err);
      } else {
        resolve(api);
      }
    };
    api.get(function (err: Error, data: any) {
      if (!err && data) {
        api.data = data;
        api.bookmarks = data.bookmarks;
        api.experiments = new Experiments(data.experiments);
      }

      cb(err, api);
    });

    return api;
  });
}

export default {
  experimentCookie: ExperimentCookie,
  previewCookie: PreviewCookie,
  Document: Document,
  SearchForm: SearchForm,
  Form: Form,
  Experiments: Experiments,
  Predicates: Predicates,
  api: getApi
};
