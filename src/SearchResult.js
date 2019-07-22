import React from 'react'
import {NiceDate} from "./NiceDate";

/**
 * An Article Search result from the NYT API.
 *
 * @typedef {Object} NYTSearchArticle
 *
 * @property {string} _id
 * @property {Object} byline
 * @property {string} document_type
 * @property {Object} headline
 * @property {Array<Object>} keywords
 * @property {Array<Object>} multimedia
 * @property {string} news_desk
 * @property {Number} print_page
 * @property {string} pub_date
 * @property {Number} score
 * @property {string} snippet
 * @property {string} source
 * @property {string} type_of_material
 * @property {string} uri
 * @property {string} web_url
 * @property {Number} word_count
 */

/**
 * @typedef
 * @param props
 * @returns {*}
 * @constructor
 */

export function SearchResult (props) {
  /** @type {NYTSearchArticle} item */
  const item = props.item;
  console.log('headline', item);
  return <div className={'search-result'}><a href={item.web_url}>{item.headline.main}</a> <NiceDate dateString={item.pub_date}/> </div>
}