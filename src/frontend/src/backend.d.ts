import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StaffMember {
    id: bigint;
    name: string;
    biography: string;
    photoUrl: string;
    position: string;
}
export interface ContentBlock {
    title: string;
    content: string;
}
export interface ContactFormSubmission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Notice {
    id: bigint;
    title: string;
    body: string;
    date: bigint;
}
export interface GalleryItem {
    id: bigint;
    title: string;
    description: string;
    imageUrl: string;
    dateAdded: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryItem(title: string, description: string, imageUrl: string): Promise<bigint>;
    addNotice(title: string, body: string, date: bigint): Promise<bigint>;
    addStaffMember(name: string, position: string, biography: string, photoUrl: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteContactSubmission(id: bigint): Promise<void>;
    deleteContentBlock(key: string): Promise<void>;
    deleteGalleryItem(id: bigint): Promise<void>;
    deleteNotice(id: bigint): Promise<void>;
    deleteStaffMember(id: bigint): Promise<void>;
    getAllContactSubmissions(): Promise<Array<ContactFormSubmission>>;
    getAllContentBlocks(): Promise<Array<[string, ContentBlock]>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContentBlock(key: string): Promise<ContentBlock | null>;
    getGalleryItem(id: bigint): Promise<GalleryItem | null>;
    getGalleryItems(): Promise<Array<GalleryItem>>;
    getNoticeById(id: bigint): Promise<Notice | null>;
    getNotices(): Promise<Array<Notice>>;
    getStaffList(): Promise<Array<StaffMember>>;
    getStaffMember(id: bigint): Promise<StaffMember | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    updateContentBlock(key: string, title: string, content: string): Promise<void>;
    updateGalleryItem(id: bigint, title: string, description: string, imageUrl: string): Promise<void>;
    updateNotice(id: bigint, title: string, body: string, date: bigint): Promise<void>;
    updateStaffMember(id: bigint, name: string, position: string, biography: string, photoUrl: string): Promise<void>;
}
