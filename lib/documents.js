"use strict";

/**
 * Embodies a document as returned by the API.
 * Most useful fields: id, type, tags, slug, slugs
 * @constructor
 * @global
 * @alias Doc
 */
function Document(id, uid, type, href, tags, slugs, firstPublicationDate, lastPublicationDate, lang, alternateLanguages, data, rawJSON) {
  return {
    /**
     * The ID of the document
     * @type {string}
     */
    id: id,
    /**
     * The User ID of the document, a human readable id
     * @type {string|null}
     */
    uid: uid,
    /**
     * The type of the document, corresponds to a document mask defined in the repository
     * @type {string}
     */
    type: type,
    /**
     * The URL of the document in the API
     * @type {string}
     */
    href: href,
    /**
     * The tags of the document
     * @type {array}
     */
    tags: tags,
    /**
     * The current slug of the document, "-" if none was provided
     * @type {string}
     */
    slug: slugs ? slugs[0] : "-",
    /**
     * All the slugs that were ever used by this document (including the current one, at the head)
     * @type {array}
     */
    slugs: slugs,
    /**
     * same as fragments
     */
    data: data,
    /**
     * The first publication date of the document
     */
    firstPublicationDate: firstPublicationDate ? new Date(firstPublicationDate) : null,
    /**
     * The last publication date of the document
     */
    lastPublicationDate: lastPublicationDate ? new Date(lastPublicationDate) : null,
    /**
     * The language code of the document
     */
    lang: lang ? lang : null,
    /**
     * The alternate language versions of the document
     */
    alternateLanguages: alternateLanguages ? alternateLanguages : []
  };
}


function GroupDoc(data) {
  /**
   * The original JSON data from the API
   */
  return data;
}

// -- Private helpers

function isFunction(f) {
  var getType = {};
  return f && getType.toString.call(f) === '[object Function]';
}

module.exports = {
  Document: Document,
  GroupDoc: GroupDoc
};
