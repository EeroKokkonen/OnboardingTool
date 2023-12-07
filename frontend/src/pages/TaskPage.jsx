import { useState } from "react";
import { AuthContext } from "../components/auth-context";


const taskData = {
  name: "Dummy data",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
  isCompleted: true,
};

const TaskPage = () => {
  const auth = useContext(AuthContext);
  const [isCompleted, setIsCompleted] = useState(taskData.isCompleted);

    return (

      <div class={`hero min-h-screen bg-opacity-70 ${isCompleted ? "bg-success" : "bg-primary"}`}>
      <div class={`hero-content text-center rounded-2xl`}>
        <div class="max-w-3xl">
          <h1 class="text-5xl font-bold">{taskData.name}</h1>
          <p class="py-6">{taskData.description}</p>
          <p class="py-6">LINKKI</p>
          <button onClick={e => setIsCompleted(!isCompleted)} className={isCompleted ? "btn btn-error" : "btn btn-success"}>{isCompleted ? "Uncomplete" : "Complete"}</button>
        </div>
      </div>
    </div>
      );
  };
export default TaskPage;
