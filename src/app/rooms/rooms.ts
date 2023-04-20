export interface Room{
    totalRooms:number;
    availableRooms:number;
    bookedRooms:number;
}

export interface RoomList{
    roomNumber?:string;
    roomType:string;
    amenities:string;
    price:number;
    photos:string;
    checkinTime:Date;
    checkOutTime:Date;
    rating:number;
}
// export class repos {
//     id: string;
//     name: string;
//     html_url: string;
//     description: string;
// }
 