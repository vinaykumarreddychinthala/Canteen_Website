"use client"
import { useSession } from "next-auth/react"
import { CartContext } from "../context/CartContext";
import { useContext, useState ,useEffect } from "react";
import { orderstatuscontext } from "../context/orderStatus";
export default function Admin(){
    const {data:session,status} = useSession();
    const [isChecked,setisChecked] = useState({});
    const [delaytime,setdelaytime] = useState({});
    const [updatesent,setupdatesent] = useState({});
    const [admin_orders,setadmin_orders] = useState({});

// useeffect to fetch the latest orders


useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin_orders");
      const data = await res.json();

      const formatted = data.reduce((acc, order) => {
        if (order.username && Array.isArray(order.items)) {
          acc[order.username] = order.items;
        }
        return acc;
      }, {});

      setadmin_orders(formatted);

      // ✅ Only update `updatesent` for NEW usernames
      setupdatesent((prev) => {
        const updated = { ...prev };
        for (const username of Object.keys(formatted)) {
          if (!(username in updated)) {
            updated[username] = false;
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

    const handleSend=(username)=>{
        const isordered = isChecked[username]?? false;
        const time = delaytime[username] ?? 0;
        const handleupdate = async()=>{
            const res = await fetch("api/admin_update_order",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username,
                    isCompleted: isordered,
                    estimatedtime:time ,
                })
            });
            const data = await res.json();
            alert(data.message);
            setupdatesent((prev)=>{
                return{
                    ...prev,[username] : true,
                }
            })
        };
        handleupdate();
        
    }


//handling the order time that has to be sent to customer/user from the admin dashboard

    const handletime=(username)=>(event)=>{
        setdelaytime((prev)=>{
            const currentuser = prev[username]??0;
            return {
                ...prev,[username]:event.target.value,
            }
        })
    }


// handling the checkbox to know whether the order is completed or not

    const handleCheckboxChange=(username)=>(event)=>{
        setisChecked((prev)=>({
            ...prev,[username]:event.target.checked,
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
                {Object.entries(admin_orders).map(([username, items]) => (
                    <div key={username}>
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
                {!updatesent[username]?
                    <div>
                        <div className="flex items-center space-x-4 mt-4">
                            <label className="text-lg font-medium">Is Order Completed?</label>
                            <input
                                type="checkbox"
                                checked={!!isChecked[username]} //if it is true then checked symbol shows if false then nothing shows
                                onChange={handleCheckboxChange(username)}
                                className="w-5 h-5 text-green-600 accent-green-500"
                            />
                            <span className="text-md">
                                {isChecked[username] ? '✅ Yes' : '❌ No'}
                            </span>
                        </div>
                        {!isChecked[username]?
                            <div>
                                <label htmlFor="text">Waiting time(in min):</label>
                                <input type="number" onChange={handletime(username)} className="w-20 h-4 border-2 border-blue-400" />
                            </div>:""
                        }
                        <button className="bg-amber-700" onClick={()=>handleSend(username)}>Send</button>
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