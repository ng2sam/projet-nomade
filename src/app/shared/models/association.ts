export interface IAssociation {
    _id: string;
    name: string;
    adress: string;
    email: string;
    tel: string;
    schedule: string;
    website: string;
    description: string;
    valid: boolean; // 0 public, 1 semi-public, 2 privé
    manager: string;
    members: Array<string>;
    followers: Array<string>;
}
