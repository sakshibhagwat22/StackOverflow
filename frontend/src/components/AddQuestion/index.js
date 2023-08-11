import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./index.css";
import Editor from "react-quill/lib/toolbar";
import axios from "axios";
import { TagsInput } from "react-tag-input-component";
import { selectUser } from "../../feature/userSlice";
import { useHistory } from "react-router-dom";
// import ChipsArray from "./TagsInput";
import { Link } from "react-router-dom";
import PaymentElement from './../../PaymentElement';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function Index() {
 
  const user = useSelector(selectUser);
  var toolbarOptions = [ 
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  /*
   * PropType validation
   */

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const history = useHistory();

  const handleQuill = (value) => {
    setBody(value);
  };

  const [showPaymentElement, setShowPaymentElement] = useState(false);

  const handleShowPayment = () => {
    setShowPaymentElement(true);
  };

  const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');
 
//  const handleSubscription = async () => {
//   try {
//     const response = await axios.post("/create-subscription", { plan: "premium" });
//     console.log(response.data);

//     if (response.data && response.data.subscription) {
//       window.location.href = "/subscription"; // Redirect to the subscription plan selection page
//     } else {
//       console.error("Subscription creation failed");
//       // Handle the error or display an error message
//     }
//   } catch (error) {
//     console.error(error);
//     // Handle the error
//   }
// };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== "" && body !== "") {
      const userSubscription = await axios.get('/api/user/subscription'); // Adjust the API endpoint to retrieve the user's subscription status
      if (userSubscription.data && userSubscription.data.status === 'active') {
        const bodyJSON = {
          title: title,
          body: body,
          tag: JSON.stringify(tag),
          user: user,
        };
        await axios
          .post("/api/question", bodyJSON)
          .then((res) => {
            // console.log(res.data);
            alert("Question added successfully");
            history.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // Redirect the user to the subscription plan selection page or show an error message
        history.push('/subscription');
      }
    }
  };



  
  return (
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                <ReactQuill
                  value={body}
                  onChange={handleQuill}
                  modules={Editor.modules}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add up to 5 tags to describe what your question is about
                </small>
                {/* <input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  data-role="tagsinput"
                  data-tag-trigger="Space"
                  type="text"
                  placeholder="e.g. (asp.net-mvc php react json)"
                /> */}

                <TagsInput
                  value={tag}
                  onChange={setTag}
                  name="fruits"
                  placeHolder="press enter to add new tag"
                />

                {/* <ChipsArray /> */}
              </div>
            </div>
          </div>
        </div>

          {/* type="submit" onClick={handleSubmit} */}
          <div className="App">
            <button onClick={handleShowPayment}>Add your Question</button>
            {showPaymentElement && (
              <Elements stripe={stripePromise}>
                <PaymentElement />
              </Elements>
            )}
          </div>
      </div>
    </div>
  );
}

export default Index;