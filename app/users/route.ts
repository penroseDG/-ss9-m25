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

export async function GET(
    request: NextRequest,
    params: {params: {id: string}}
) {
    // Buoc 1: Lay id tu params
    const id = params.params.id;

    // Buoc 2: Tim kiem user theo id trong mang
    const findUser = users.find((user) => user.id === +id)

    // Buoc 3: Tra ve ket qua cho nguoi dung
    if (findUser) {
        return NextResponse.json(findUser);
    } else{
        return NextResponse.json({message: "Khong tim thay tai khoan"})
    } 
    return NextResponse.json({data: users});
}

export async function PUT(
    request: NextRequest, 
    params:{ params: {id: string}}
) {
    // Buoc 1: Lay id va du lieu can cap nhat tu nguoi dung
    console.log(await request.json(), params);
    const id = params.params.id;

    const dataClient = await request.json();

    // Tim kiem vi tri cua user trong manng 
    const findIndex = users.findIndex((user) => user.id === +id);
    
    if(findIndex !== -1) {
        // Buoc 3: Cap nhat du lieu - Gan lai gia tri
        users[findIndex].name = dataClient.name;
    }
    return NextResponse.json({data: users});
}
export async function DELETE(
    request: NextRequest, 
    params:{ params: {id: string}}
) {
    // Buoc 1: Lay id tu params
    const id = params.params.id;

    // Buoc 2: Loc ra nhun ban ghi co id khac voi id can xoa
    const filterUser = users.filter((user) => user.id !== +id );

    // Buoc 3: Tra ve du lieu cho phia client
    return NextResponse.json({message: "DELETE method"});
}