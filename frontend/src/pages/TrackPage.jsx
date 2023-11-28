const trackData = [{
    name: "Policy training",
    complited: true
    },
    {
        name: "Cash register training",
        description: "Overview of companys refunding policy",
        complited: false
    },
    {
        name:  "Warehouse training",
        description: "Overview of companys refunding policy",
        complited: false
    },
];

const TrackPage = () => {
    let completionState = "not completed";
    let completionPadgeClass = "error";

    return ( 
        <div className="flex flex-col items-center  container mx-auto mt-6">
            <div className="prose mb-6">
                <h1>Products refunding track</h1>
            </div>
            {trackData.map((e)  => {
                if(e.complited === false){
                    completionState = "Not completed"
                    completionPadgeClass = "error";
                }
                else if(e.complited === true){
                    completionState = "Complited"
                    completionPadgeClass = "success";
                }

                return (
                    <div className="prose card w-96 bg-base-100 shadow-xl my-4" key={e.name}>
                        <div className="card-body">
                            <h2 className="my-0">{e.name}</h2>
                            <div className={`badge badge-${completionPadgeClass} my-0`}>{completionState}</div>
                            <div className="card-actions justify-end mt-0">
                                <button className="btn btn-primary">View</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
     );
}
 
export default TrackPage;