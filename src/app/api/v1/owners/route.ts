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

        const owners = [
            { owner_id: 1, owner_name: 'dummy-owner-1' },
            { owner_id: 2, owner_name: 'dummy-owner-2' },
            { owner_id: 3, owner_name: 'dummy-owner-3' },
            { owner_id: 4, owner_name: 'dummy-owner-4' },
            { owner_id: 5, owner_name: 'dummy-owner-5' },
            { owner_id: 6, owner_name: 'dummy-owner-6' },
            { owner_id: 7, owner_name: 'dummy-owner-7' },
            { owner_id: 8, owner_name: 'dummy-owner-8' },
            { owner_id: 9, owner_name: 'dummy-owner-9' },
            { owner_id: 10, owner_name: 'dummy-owner-10' }
        ];

        if (owners){
            owners.map(owner =>console.log(owner))
            // console.log(users)
            return NextResponse.json({message:"Successfull",data: owners},{status:200});
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