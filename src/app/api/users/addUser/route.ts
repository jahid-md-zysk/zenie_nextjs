import { NextRequest,NextResponse } from 'next/server' 
import User from '@/models/userModel'
import {connect} from '@/dbConfig/dbConfig'

connect()

export async function POST(request:NextRequest){
    try{

        const reqBody = await request.json();
        const {name,email,address,userComment,gender,interests} = reqBody;

        console.log(reqBody)

        console.log(reqBody)

        //  check if user already exists

        const  user = await User.findOne({email})

        if (user){
            return NextResponse.json({error:"User already exists"},{status:400});
        }

        const newUser = new User({
            username : name,
            email,
            gender,
            interests:JSON.stringify(interests),
            address:JSON.stringify(address),
            comment: userComment,
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({savedUser
            ,status:201,"message":"user created Successfully"});

    } catch(error: any){
        return NextResponse.json({error:error.message},{status:500});
    }
}