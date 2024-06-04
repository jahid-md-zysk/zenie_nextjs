import { NextRequest,NextResponse } from 'next/server' 


export async function GET(request:NextRequest){
    try {
        const states = [
            { value: 'KA', label: 'Karnataka' },
            { value: 'PJ', label: 'Punjab' },
            { value: 'AN', label: 'Andra Pradesh' },
            { value: 'TN', label: 'Tamilnadu' },
            { value: 'KL', label: 'Kerala' },
        ];

        const response = NextResponse.json({
            message: "successful",
            success:true,
            data:  states 
        })
        
        return response;
    } catch (error: any){
        return NextResponse.json({error:error.message},{status:500});
    }
}