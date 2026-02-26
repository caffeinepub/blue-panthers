import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Member {
    signupTime: Time;
    name: string;
    role: Role;
    email: string;
}
export type Time = bigint;
export enum Role {
    fan = "fan",
    supporter = "supporter",
    player = "player"
}
export interface backendInterface {
    getAllMembers(): Promise<Array<Member>>;
    register(name: string, email: string, role: Role): Promise<void>;
}
