import React from "react";

/* Faded champion splash behind the page; falls back to the default gradient. */
export default function Backdrop({ src }) {
  return (
    <div className="backdrop" aria-hidden="true">
      {src && <div key={src} className="backdrop-img" style={{ backgroundImage: `url(${src})` }} />}
    </div>
  );
}
