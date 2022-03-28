import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { createMeme } from "../actions";

function MemeItem({ data, text0, text1 }) {
  const dispatch = useDispatch();
  let notxt = "";
  const state = useSelector((state) => state);
  const [hover, setHover] = useState(false);

  function postMeme() {
    const memeObj = {
      template_id: data.id,
      text0,
      text1,
    };

    if (text0 && text1) {
      dispatch(createMeme(memeObj));
    } else {
      alert("Put some text first");
    }
  }

  return (
    <div
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
      className="memeItem"
      onClick={() => postMeme()}
    >
      <img
        src={data.url}
        alt={data.name}
        className={hover ? "memeImg darkImg" : "memeImg"}
      />
      <p className={hover ? "memeName" : "notxt"}>{data.name}</p>
    </div>
  );
}

export default connect(null, { createMeme })(MemeItem);
