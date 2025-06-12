
export async function POST(req){
    const body = await req.json();
    const {email,password} = body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        return Response.json({success: true});        
    }
    else{
        return Response.json({success:false,message:"Invalid credentials"},{status:401});
    }
}