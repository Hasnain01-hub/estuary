import React from "react";

const Loading = () => {
  return (
    <div className="v-align">
      <div className="loader">
        <aside className="loader__box loader--left">
          <span className="loader__circle"></span>
        </aside>
        <aside className="loader__box loader--right">
          <span className="loader__circle"></span>
        </aside>
      </div>
    </div>
  );
};

export default Loading;
