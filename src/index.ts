import { Document, GroupDoc } from "./documents";
import {
  IApiOptions,
  Api,
  ExperimentCookie,
  PreviewCookie,
  Form,
  SearchForm
} from "./api";

import { DefaultRequestHandler } from './request';
import * as Predicates from './predicates';
import { Experiments } from './experiments';

const defaultOptions: IApiOptions = {};

function getApi(url: String, options: IApiOptions = defaultOptions): Promise<Api> {
  return Promise.resolve(new Api());
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
