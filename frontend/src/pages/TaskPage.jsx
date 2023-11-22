const taskData = {
  name: "Dummy data",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
};

const TaskPage = () => {
    return (
        <div className="container mx-auto mt-8">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-indigo-400 to-blue-500 text-white">
          <h2 className="text-3xl font-semibold mb-4">{taskData.name}</h2>
          <p className="text-gray-200 mb-4">{taskData.description}</p>
          <div className="flex justify-end">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800">
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
      );
  };
export default TaskPage;
