import React, {useState, useEffect} from 'react';
import {ArticleItem} from "./ArticleItem";
import './ArticleList.css'
import {EllipsisSpinner} from "./EllipsisSpinner";

export function ArticleList(props) {

  const [error, setError] = useState(null);
  const [pendingRequest, setPendingRequest] = useState(true);
  const [isLoaded, setLoaded] = useState(false);
  /** @type {Array<NYTWireArticle>} items */
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

  let content = <div className="loading"><EllipsisSpinner/></div>;

  if (error) {
    content = <div className={"error"}>Error: {error.message}</div>
  }
  if (isLoaded) {
    content = <div className={"results"}>
      {items.map(item => (
        <ArticleItem key={item.slug_name} item={item} />
      ))}
    </div>
  }

  return (
    <div className={"article-list"}>
      {content}
    </div>
  );
}