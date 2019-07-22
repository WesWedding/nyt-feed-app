import React from 'react'
import './ElipsisSpinner.css'

/* Spinner from https://loading.io/css/ */
export function EllipsisSpinner(props) {
  return <div className="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
}