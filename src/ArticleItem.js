import React from 'react';
import {WireItem} from './WireItem';
import {GeoItems} from "./GeoItems";
import './ArticleItem.css'

export function ArticleItem(props) {
  // Sometimes geo_facets come up as an empty string, so let's make those uniform with the rest..
  const geos = props.item.geo_facet.map ? props.item.geo_facet : []

  return <div className={'article-item'}>
    <div className={'main'}>
      <WireItem item={props.item} />
    </div>
    <div className={'related'}>
      <GeoItems geos={geos}/>
    </div>
  </div>
}