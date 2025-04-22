export type RideType = {
  rideId: string;
  shiftId: string;
  pickupLocation: PickupLocationType;
  dropoffLocation: DropoffLocationType;
  rideStarted: boolean;
  rideStartTime: string;
  rideEndTime: string;
  passengers: PassengerType[];
}

export type PickupLocationType = {
  address: string;
  time?: string;
}

export type DropoffLocationType = {
  address: string;
}

export type PassengerType = {
  id: string;
  name: string;
  status: 'pending' | 'checked-in' | 'rejected';
}

export type PassengerCheckinResponseType = {
  message: string;
  passengers: PassengerType[];
}

export type ActionType = 'check-in' | 'reject';
