import React, {useState, useEffect} from 'react';
import {WireItem} from './WireItem'

export function ArticleList(props) {

  const [error, setError] = useState(null);
  const [pendingRequest, setPendingRequest] = useState(true);
  const [isLoaded, setLoaded] = useState(false);
  /** @type {Array<NYTWireArticle>}items */
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!pendingRequest) return;
    setPendingRequest(false);
    fetch(props.uri)
      .then(res => res.json())
      .then((result) => {
          setLoaded(true);
          setItems(result.results)
        },
        (error) => {
          setLoaded(true);
          setError(error);
        })
  }, [props.uri, pendingRequest]);

  if (error) {
    return <div className={"articles"}>Error: {error.message}</div>
  }
  if (!isLoaded) {
    return <div className={"articles"}>Loading...</div>
  }

  return (
    <div className={"articles"}>
      {items.map(item => (
        <WireItem key={item.slug_name} item={item}/>
      ))}
    </div>
  );
}