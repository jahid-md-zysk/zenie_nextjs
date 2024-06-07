import { NextRequest,NextResponse } from 'next/server' 
import {connect} from '@/dbConfig/dbConfig'

connect()

export async function GET(request:NextRequest){
    try{

        // const reqBody = await request.json();
        // const {name,email,address,userComment,gender,interests} = reqBody;

        // console.log(reqBody)

        // console.log(reqBody)

        //  check if user already exists

        // const  users = await User.find()

        const templateRepos = [
            { repo_id: 1, repo_name: 'template-repo-1' },
            { repo_id: 2, repo_name: 'template-repo-2' },
            { repo_id: 3, repo_name: 'template-repo-3' },
            { repo_id: 4, repo_name: 'template-repo-4' },
            { repo_id: 5, repo_name: 'template-repo-5' },
            { repo_id: 6, repo_name: 'template-repo-6' },
            { repo_id: 7, repo_name: 'template-repo-7' },
            { repo_id: 8, repo_name: 'template-repo-8' },
            { repo_id: 9, repo_name: 'template-repo-9' },
            { repo_id: 10, repo_name: 'template-repo-10' }
        ];

        if (templateRepos){
            templateRepos.map(repo =>console.log(repo))
            // console.log(users)
            return NextResponse.json({message:"Successfull",data: templateRepos},{status:200});
        } else {
            return NextResponse.json({message:"No Users fount",data: []},{status:500});
        }

    } catch(error: any){
        return NextResponse.json({error:error.message},{status:500});
    }
}