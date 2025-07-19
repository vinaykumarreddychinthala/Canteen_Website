"use client"
import { useSession } from "next-auth/react"
import {useState ,useEffect } from "react";
export default function Admin(){
    const {data:session,status} = useSession();
    const [isChecked,setisChecked] = useState({});
    const [delaytime,setdelaytime] = useState({});
    const [updatesent, setupdatesent] = useState(() => {
        const saved = localStorage.getItem("updatesent");
        return saved ? JSON.parse(saved) : {};
    });
    const [admin_orders,setadmin_orders] = useState({});

    useEffect(() => {
        localStorage.setItem("updatesent", JSON.stringify(updatesent));
      }, [updatesent]);


    let user_id;
    if(session && session.user && session.user.id){
        user_id = session.user.id;
    }

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin_get_orders");
      const data = await res.json();

      const formatted = data.reduce((acc, order) => {
        if (order._id && Array.isArray(order.items)) {
          acc[order._id] = [order.username,order.items];
        }
        return acc;
      }, {});

      setadmin_orders(formatted);

      // ✅ Only update `updatesent` for NEW usernames
      setupdatesent((prev) => {
        const updated = { ...prev };
        for (const _id of Object.keys(formatted)) {
          if (!(_id in updated)) {
            updated[_id] = false;
          }
        }
        return updated;
      });
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  fetchOrders(); // initial fetch

  const interval = setInterval(fetchOrders, 5000); // every 5 seconds
  return () => clearInterval(interval); // cleanup
}, []);  //useEffect must be synchronous , so it cannot encourage asynchronous functions. Thats why we called the function just after defined





//handling send button

    const handleSend=(_id,username)=>{
        const isordered = isChecked[_id]?? false;
        const time = delaytime[_id] ?? 0;
        const handleupdate = async()=>{
            const res = await fetch("api/admin_update_orderstatus",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    _id:_id,
                    user_id:user_id,
                    username:username,
                    isCompleted: isordered,
                    estimatedtime:time ,
                })
            });
            const data = await res.json();
            alert(data.message);
            if(res.ok){
                setupdatesent((prev)=>{
                    return{
                        ...prev,[_id] : true,
                    }
                })
            }
            else{
                console.log("the error is :" , data.message);
            }
        };
        handleupdate();
        
    }


//handling the order time that has to be sent to customer/user from the admin dashboard

    const handletime=(_id)=>(event)=>{
        setdelaytime((prev)=>{
            const currentuser = prev[_id]??0;
            return {
                ...prev,[_id]:event.target.value,
            }
        })
    }


// handling the checkbox to know whether the order is completed or not

    const handleCheckboxChange=(_id)=>(event)=>{
        setisChecked((prev)=>({
            ...prev,[_id]:event.target.checked,
        }));
    }


// a function to calculate the total price of items ordered by each user

    function calprice(items){
        let total = 0;
        for(let item of items){
            total = total + (item.price)*(item.quantity);
        }
        return total;
    }




    return(
        <>
            <div>
                {Object.entries(admin_orders).map(([_id, [username,items]]) => (
                    <div key={_id}>
                        <h1 className="text-black font-black">{username} Order</h1>

                        {Array.isArray(items) ? (
                        items.map(item => (
                            <div key={item.id}>
                            <p>{item.name} - {item.quantity}</p>
                            </div>
                        ),

                    )
                ) : (
                    <p>Invalid cart format for {username}</p>
                )}
                
                <p>total Price: {calprice(items)}</p>
                {!updatesent[_id]?
                    <div>
                        <div className="flex items-center space-x-4 mt-4">
                            <label className="text-lg font-medium">Is Order Completed?</label>
                            <input
                                type="checkbox"
                                checked={!!isChecked[_id]} //if it is true then checked symbol shows if false then nothing shows
                                onChange={handleCheckboxChange(_id)}
                                className="w-5 h-5 text-green-600 accent-green-500"
                            />
                            <span className="text-md">
                                {isChecked[_id] ? '✅ Yes' : '❌ No'}
                            </span>
                        </div>
                        {!isChecked[_id]?
                            <div>
                                <label htmlFor="text">Waiting time(in min):</label>
                                <input type="number" onChange={handletime(_id)} className="w-20 h-4 border-2 border-blue-400" />
                            </div>:""
                        }
                        <button className="bg-amber-700" onClick={()=>handleSend(_id,username)}>Send</button>
                        <br />
                    </div>
                :
                    <div>
                        <p>orderupdate sent</p>
                    </div>
                   }
                </div>
                )
                )}

            </div>

        </>
    )
}


//orderstatus is a dictionary with item as username and value is array with message: order completed or not and time: how much preparation time