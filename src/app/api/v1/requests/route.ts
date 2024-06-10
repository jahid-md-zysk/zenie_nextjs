import { NextRequest,NextResponse } from 'next/server' 


export async function GET(request:NextRequest){
    try {
        const requests = [
            {
              "id": 1,
              "request": "Request access to project repository",
              "description": "I need access to the project repository in order to contribute to the development effort. I have experience with similar projects and am familiar with the version control system being used."
            },
            {
              "id": 2,
              "request": "Grant access to repository for team member",
              "description": "One of our team members requires access to the project repository to assist with debugging and testing. They are a trusted member of the team and need access to fulfill their responsibilities effectively."
            },
            {
              "id": 3,
              "request": "Merge branches feature/login and develop",
              "description": "This request merges changes from the feature/login branch into the develop branch."
            },
            {
              "id": 4,
              "request": "Fix bug in user authentication module",
              "description": "This request addresses a critical bug in the user authentication module that causes login failures for some users."
            }
          ];

        const response = NextResponse.json({
            message: "successful",
            success:true,
            data:  requests 
        })
        
        return response;
    } catch (error: any){
        return NextResponse.json({error:error.message},{status:500});
    }
}