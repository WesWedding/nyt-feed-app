import React from 'react'
import {NiceDate} from "./NiceDate";
import './WireItem.css'

/**
 * The Article object returned by the NYT Newswire endpoint.
 *
 * @typedef {Object} NYTWireArticle
 *
 * @property {string} abstract
 * @property {string} blog_name
 * @property {string} byline
 * @property {string} created_date
 * @property {Array<string>} des_facet
 * @property {Array<string>} geo_facet
 * @property {string} headline
 * @property {string} item_type
 * @property {string} kicker
 * @property {string} material_type_facet
 * @property {Array<Object>} multimedia
 * @property {string} org_facet
 * @property {Array<string>} per_facet
 * @property {string} published_date
 * @property {Array<Object>} related_urls
 * @property {string} section
 * @property {string} short_url
 * @property {string} source
 * @property {string} subsection
 * @property {string} thumbnail_standard
 * @property {string} title
 * @property {string} updated_date
 * @property {string} url
 */

export function WireItem(props) {
  /** @type NYTWireArticle props.item */
  const item = props.item;
  return <article className={'wire-item'}>
    <header className={'head'}>
      <div className={'title'}>{item.title}</div>
      <div className={'date'}><NiceDate dateString={item.published_date} /></div>
    </header>
    <div className={'abstract'}>{item.abstract} <a className={'more'} href={item.url} target={'_blank'}>Read...</a></div>
  </article>;
}
