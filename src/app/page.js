"use client"
import Image from "next/image";
import react, { useEffect, useState, useMemo } from "react";
import dynamic from 'next/dynamic'


var prevValueArray = [];
var prevValue = "";
export default function Home() {
  useEffect(() => {
    if (localStorage.getItem("oldAray") != null && localStorage.getItem("oldAray") != "") {
      prevValueArray = localStorage.getItem("oldAray").split(",");
    }
    prevValueArray.push("hide");
    console.log(prevValueArray);
    settextArray(prevValueArray);
    //addValueToArray(prevValueArray);
  }, []);
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [textArray, settextArray] = useState(prevValueArray ?? []);
  //(localStorage.getItem("oldAray") !== null ? (prevValueArray = localStorage.getItem("oldAray").split(",")) : "")
  const addValueToArray = (newValue) => {
    // Create a new array with the existing values and the new value
    if (newValue != "" && prevValueArray.indexOf(newValue) == -1) {
      settextArray([...textArray, newValue]);
      prevValueArray.push(newValue);
      localStorage.setItem("oldAray", prevValueArray);
      document.getElementById("addTask").value = "";
      return false;
    }
    else if (newValue == "") {
      return false;
    }

  };

  const deleteFun = (e) => {
    e.target.parentElement.classList.add("hide");
    prevValueArray = [];
    for (var i = 0; i < document.querySelectorAll("li").length; i++) {
      if (document.querySelectorAll("li")[i].getElementsByTagName("span")[2].textContent != "hide" && !document.querySelectorAll("li")[i].classList.contains("hide")) {
        prevValueArray.push(document.querySelectorAll("li")[i].getElementsByTagName("span")[2].textContent);
      }
    }
    localStorage.setItem("oldAray", prevValueArray);
    settextArray(prevValueArray);
    // prevValueArray = [];
  };

  return (
    <>
      <div className="app-container">
        <h1 className="app-header">TO DO LIST</h1>
        <div className="add-task">
          <input type="text" autoComplete="off" className="task-input " placeholder="Add New Task" id="addTask" />
          <button className="submit-task" onClick={() => addValueToArray(document.getElementById("addTask").value)} />
        </div>
        <ul className="task-list">
          {textArray.map((value, index) => (

            <li className={value + " task-list-item"} v-for="task in tasks" key={Math.random()}>
              <label className="task-list-item-label">
                <input type="checkbox" id={index} />
                <span>{value}</span>
              </label>
              <span className="delete-btn" title="Delete Task" id={index} onClick={(e) => { deleteFun(e) }}></span>
              <span className="hide">{prevValue = value}</span>
            </li>
          ))}
        </ul>
      </div >


    </>
  );
}