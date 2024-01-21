
export enum PermissionStatus {
    DENIED = 'denied',
    GRANTED = 'granted',
    UNDETERMINED = 'undetermined',
}
export type PermissionResponse = {
    canAskAgain: boolean;
    granted: boolean;
    expires: 'never' | number;
    status: PermissionStatus; 

}
