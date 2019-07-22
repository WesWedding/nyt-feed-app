import React, {useState, useEffect} from 'react';
import {ArticleItem} from "./ArticleItem";
import {SearchResult} from "./SearchResult";

export function GeoItems(props) {

  // In order to be used as query items, the geo strings need to be wrapped in quotes
  const geoStrings = props.geos.map((geo) => `"${geo}"`);

  const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest';
  const apiKey =  'api-key=vAqNAG36g21TaUrlNdUvUAdq2OZ3DL5f';
  const glocations = geoStrings.join(' ');
  const pub_range = '"2019-07-18" TO "2019-07-20"';
  const query = `fq=glocations.contains:(${glocations}) AND type_of_material:("News") AND pub_date:[${pub_range}]`;
  const url = `${baseUrl}&${apiKey}&${query}`;

  const [error, setError] = useState(null);
  const [requestNeeded, setRequestNeeded] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!requestNeeded) return;
    setRequestNeeded(false);
    fetch(url)
      .then(res => res.json())
      .then((result) => {
          setLoaded(true);
          setItems(result.response.docs)
        },
        (error) => {
          setLoaded(true);
          setError(error);
        })
      .finally(() => {
        setPendingRequest(false);
      })
  }, [url, pendingRequest, requestNeeded]);

  function startRequest() {
    setRequestNeeded(true);
    setPendingRequest(true);
  }

  let content = <button onClick={startRequest}>Load More</button>;
  if (error) {
    content = <div className={'error'}> Error: {error.message}</div>;
  }
  if (!isLoaded && pendingRequest) {
    content = <div>Loading...</div>
  }
  if (isLoaded) {
    console.log('items', items);
    content = items.map((item) =>
      <SearchResult key={item._id} item={item}/>
    )
  }

  return (
    <div className={"geo-items"}>
      <div>More articles from {geoStrings}</div>
      {content}
    </div>
  );
}