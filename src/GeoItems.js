import React, {useState, useEffect} from 'react';
import {SearchResult} from "./SearchResult";

export function GeoItems(props) {

  // In order to be used as query items, the geo strings need to be wrapped in quotes
  const geoStrings = props.geos.map((geo) => `"${geo}"`);
  const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest';
  // TODO: Get this key from props.
  const apiKey =  `api-key=${process.env.REACT_APP_NYT_KEY}`;
  const glocations = geoStrings.join(' ');
  const pub_range = getPubRangeForPastWeek();
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

function getPubRangeForPastWeek() {
  const today = new Date();
  var lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const oldStr = `${lastWeek.getFullYear()}-${lastWeek.getMonth()}-${lastWeek.getDate()}`;

  return `"${oldStr}" TO "${todayStr}"`;
}