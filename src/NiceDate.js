import React from 'react';

export function NiceDate(props) {
  const dateStr = props.dateString;
  console.log("dateStr", dateStr);
  const date = new Date(dateStr);
  const cleanStr = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(date);

  return <span className={'nice-date'}>{cleanStr}</span>;
}