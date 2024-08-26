import { NextResponse, NextRequest } from 'next/server';

const users = [
    {
        id: 1,
        name: "Nguyen Van A",
    },
    {
        id: 2,
        name: "Nguyen Van B",
    }
];

export async function GET(request: NextRequest, params: {id:string}) {
    const {id} = params; // params.params.id
    return NextResponse.json({message: "GET One Method"});
}