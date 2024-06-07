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

        const collaborators = [
            { collaborator_id: 1, collaborator_name: 'abc' },
            { collaborator_id: 2, collaborator_name: 'def' },
            { collaborator_id: 3, collaborator_name: 'xyz' },
            { collaborator_id: 4, collaborator_name: 'nav' },
            { collaborator_id: 5, collaborator_name: 'zysk' },
            { collaborator_id: 6, collaborator_name: 'virat' },
            { collaborator_id: 7, collaborator_name: 'rohit' },
            { collaborator_id: 8, collaborator_name: 'sachin' },
            { collaborator_id: 9, collaborator_name: 'hello' },
            { collaborator_id: 10, collaborator_name: 'hi' }
        ];

        if (collaborators){
            collaborators.map(owner =>console.log(owner))
            // console.log(users)
            return NextResponse.json({message:"Successfull",data: collaborators},{status:200});
        } else {
            return NextResponse.json({message:"No Users fount",data: []},{status:500});
        }

        // const newUser = new User({
        //     username : name,
        //     email,
        //     gender,
        //     interests:JSON.stringify(interests),
        //     address:JSON.stringify(address),
        //     comment: userComment,
        // })

        // const savedUser = await newUser.save()
        // console.log(savedUser)

        // return NextResponse.json({savedUser
            // ,status:201,"message":"user created Successfully"});

    } catch(error: any){
        return NextResponse.json({error:error.message},{status:500});
    }
}