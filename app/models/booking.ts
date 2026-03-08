
export default interface BookingDetailsDTO {
    id:number,
    touristId:number,
    customerName:string,
    email:string,
    phoneNumber:string,
    pricePerPerson:number,
    numberOfPeople:number,
    totalPrice:number,
    tourDate:string,
    specialRequests:string,
    status:string,
    referenceNumber:string
}