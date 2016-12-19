export interface IEvent {
    id: number;
    name: string;
    date: Date;
    description: string;
    eventType: number; // 0 public, 1 semi-public, 2 privé
    organisatorId: number;
}
