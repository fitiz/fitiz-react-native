export type UserFitnessMetrics = {
    userId?: string | undefined;
    height?: number; //cm
    weight?: number; //kg

    stepCount?: number;
    startTimestamp?: Date;
    endTimestamp?: Date;

    distance?: number; // km
    speed?: number; // km/h
    pace?: number; // sec/km
    stride?: number; //cm
}
