import { NextRequest,NextResponse } from 'next/server' 
import User from '@/models/userModel'
import {connect} from '@/dbConfig/dbConfig'

connect()

export async function GET(request:NextRequest){
    try{

        // const reqBody = await request.json();
        // const {name,email,address,userComment,gender,interests} = reqBody;

        // console.log(reqBody)

        // console.log(reqBody)

        //  check if user already exists

        const  users = await User.find()



        if (users){
            users.map(user =>console.log(user))
            console.log(users)
            return NextResponse.json({message:"Successfull",data: users},{status:200});
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