export type UserFitnessMetrics = {
    userId?: string | undefined;
    height?: number; //cm
    weight?: number; //kg

    stepCount?: number;
    startTimestamp?: Date;
    endTimestamp?: Date;

    distanceTotal?: number; // m

    distanceIn5SecPeriod?: number; // m
    speed?: number; // m/s
    pace?: number; // sec/m

    stride?: number; //cm


    speedKmH?: number; // km/h
    calories?: number; // kcal

}
