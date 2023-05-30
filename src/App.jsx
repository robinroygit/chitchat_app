import React, { useEffect, useState } from "react";
import { push, ref, set, onChildAdded } from "firebase/database";
import { getDatabase } from "firebase/database";
import { app,auth,provider } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const App = () => {
  const db = getDatabase(app);

  const [user, setUser] = useState("");
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");

  const chatListRef = ref(db, "firechats");

  const googleLogin = ()=>{
    signInWithPopup(auth,provider).then((result)=>{
      const credentail = GoogleAuthProvider.credentialFromResult(result);
      const fireuser = result.user;
      setUser({name:fireuser.displayName, email:fireuser.email,photo:fireuser.photoURL})
      

      setTimeout(() => {
        updateHeight();
      }, 100);

    })
  }

  const updateHeight = ()=>{
    const el = document.getElementById("chat");
    if(chat) {
      el.scrollTop = el.scrollHeight;
    }
  }


  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChat((chat) => [...chat, data.val()]);

      setTimeout(() => {
        updateHeight();
      }, 100);
    });
    

  }, []);

 

  const sendMsg = (event) => {
    event.preventDefault();
  const chatRef = push(chatListRef);

    set(chatRef, {
      name: user.name,
      email:user.email,
      message: msg,
      photo:user.photo,
    });

    setMsg("");
  };

  return (
    <>
      <div className="bg-gray-300 h-screen w-screen m-auto  ">
        {/* set and show username  */}
        {!user.email ? (
          // <input
          //   className="m-10"
          //   type="text"
          //   onBlur={(e) => setUser(e.target.value)}
          // />
          <div className=" w-96 h-80 bg-white absolute m-auto top-0 left-0 right-0 bottom-0 text-center flex justify-center items-center rounded-3xl">
            <button className="ring-2 px-8 py-4 rounded-xl bg-blue-500 text-lg capitalize text-white" onClick={()=>googleLogin() }>login with google</button>
          </div>
        ) : (
          <h1 className="user-name text-4xl  capitalize font-bold">
            user:{user.name}
          </h1>
        )} 

        {user.email ? (
          <div>
            {" "}
            <div id="chat" className=" chat-container overflow-y-scroll h-[80vh] ">
              {chat.map((c, i) => (
                <div
                  key={i}
                  className={`flex p-1 ${c.email === user.email ? "i" : ""}`}
                >
                  <p className=" p-2 text-2xl chat-box m-2 bg-slate-50 h-auto max-w-[70vw]  items-start ring-2 ring-green-300 rounded-lg flex  space-x-8">
                    {/* <strong className="text-gray-600 text-lg">{c.name}:</strong> */}
                    <img className=" rounded-full border border-black  " src={c.photo} alt="profile" width={30} height={30} />
                    <span>{c.message}</span>
                  </p>
                </div>
              ))}
            </div>
            {/* input and button  */}
            <form onSubmit={sendMsg} className="fixed bottom-4 w-full  flex flex-row ">
              <input
                className=" w-full  p-2 focus:outline-none"
                type="text"
                value={msg}
                placeholder="enter your message"
                onInput={(e) => setMsg(e.target.value)}
              />
              <button
                type="submit"
                className="  text-4xl text-center border-white border-4 w-16 hover:bg-green-400"

              >
                ◀︎
              </button>
            </form>
          </div>
        ) : (
          <div id="chat" className="absolute top-20 left-4">
            <h1 className="text-4xl text-blue-500" >Welcome to ChitChat</h1>
            <p className="text-gray-700">Simple, reliable, private messaging app available all over the world</p>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
