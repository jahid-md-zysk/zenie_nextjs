import { NextRequest,NextResponse } from 'next/server' 


export async function POST(request:NextRequest, response:NextResponse){
	try {
	const reqBody = await request.json();
	console.log("reqBody ",reqBody)
	const response = NextResponse.json({
		message: "successful",
		success:true,
	})
		
		return response;
	} catch (error: any){
		return NextResponse.json({error:error.message},{status:500});
	}
}