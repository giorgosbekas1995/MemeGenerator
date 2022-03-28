import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

function MyMemes() {
  const myMemes = useSelector((state) => state.myMemes);
  return (
    <div>
      {myMemes.map((meme, index) => {
        return (
          <img
            key={index}
            src={meme.data.url}
            alt="my-meme"
            className="myMemeImg"
          />
        );
      })}
    </div>
  );
}

export default connect()(MyMemes);
