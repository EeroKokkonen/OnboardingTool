import { useState, useEffect } from "react";
import { AuthContext } from "../components/auth-context";
import { useContext } from "react";
import { getTaskById, updateTask } from "../api/tasks";
import { useParams } from "react-router-dom";


const TaskPage = () => {
  const auth = useContext(AuthContext);
  const [taskData, setTaskData] = useState([]);
  let { id } = useParams();
  const [isCompleted, setIsCompleted] = useState(taskData.isCompleted);
  const storageData = JSON.parse(localStorage.getItem("userData")) || null;

  useEffect(() => {
    if (storageData && storageData.userId && storageData.token) {
      getTaskById(storageData.token, id).then((res) => {
        setTaskData(res[0]);
        setIsCompleted(res[0].is_done);
      });
    }
  }, []);
  const handleOnClick = (e) => {
    e.preventDefault;
    updateTask(storageData.token, id, !isCompleted);
    setIsCompleted(!isCompleted);
    
  }
    return (

      <div className={`hero min-h-screen bg-opacity-70 ${isCompleted ? "bg-success" : "bg-primary"}`}>
      <div className={`hero-content text-center rounded-2xl`}>
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold">{taskData.name}</h1>
          <p className="py-6">{taskData.description}</p>
          <p className="py-6">LINKKI</p>
          <button onClick={handleOnClick} className={isCompleted ? "btn btn-error" : "btn btn-success"}>{isCompleted ? "Uncomplete" : "Complete"}</button>
        </div>
      </div>
    </div>
      );
  };
export default TaskPage;
