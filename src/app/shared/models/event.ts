export interface IEvent {
    _id: string;
    name: string;
    date: Date;
    description: string;
    eventType: number; // 0 public, 1 semi-public, 2 privé
    organisateur: number;
}
