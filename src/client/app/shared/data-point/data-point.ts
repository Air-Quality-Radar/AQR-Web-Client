export interface MapLocation {
    latitude: number;
    longitude: number;
}

export class NumberMeasurement {
    constructor(public value: number, public units: string) {}
}

export interface AirDataPoint {
    nox: NumberMeasurement;
    pm10: NumberMeasurement;
    pm25: NumberMeasurement;
}

export interface WeatherDataPoint {}

export interface DataPoint {
    calendar: number;
    location: MapLocation;
    air: AirDataPoint;
    weather: WeatherDataPoint;
}
