export type Ticket = {
   id: number;
   time: string;
   passenger_name: string;
   passengerSSN: number;
   from: string;
   to: string;
   price: number;
};

export type TicketCreateDto = Omit<Ticket, "id">;
