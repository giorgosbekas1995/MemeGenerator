import "./App.css";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import MemeItem from "./components/MemeItem";
import MyMemes from "./components/MyMemes";
import { dispatchMemes } from "./actions";

function App() {
  const objectMemes = useSelector((state) => state.memes.memes);
  const dispatch = useDispatch();
  const [memeLimit, setMemeLimit] = useState(10);
  const [topText, settopText] = useState("");
  const [botText, setbotText] = useState("");

  useEffect(() => {
    dispatch(dispatchMemes());
  }, [memeLimit]);

  return (
    <div className="App">
      <h1>React-Redux-API Meme Generator</h1>
      <h4>Write your text and then choose your meme</h4>
      <MyMemes />
      <Form>
        <FormGroup>
          <FormLabel>Top text </FormLabel>
          <FormControl
            type="text"
            onChange={(e) => settopText(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Bot text </FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setbotText(e.target.value)}
          ></FormControl>
        </FormGroup>
      </Form>
      {objectMemes ? (
        objectMemes.slice(0, memeLimit).map((meme, index) => {
          return (
            <MemeItem text0={topText} text1={botText} key={index} data={meme} />
          );
        })
      ) : (
        <h4>No Meme Found</h4>
      )}
      <div
        className="memeButton"
        onClick={() => {
          setMemeLimit(memeLimit + 10);
        }}
      >
        Load 10 more memes
      </div>
    </div>
  );
}

export default connect()(App);
