import orderstatusStore from "@/lib/orderstatusStore";

export async function POST(req){
    const {username,iscompleted,estimatedtime} = await req.json();
    orderstatusStore[username] = [iscompleted,estimatedtime];
    console.log(orderstatusStore);
    return Response.json({
        message:"order status updated successfully",
    });
}