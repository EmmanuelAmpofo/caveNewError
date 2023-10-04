export interface InputProps {
  id?: string;
  value: string;
  lable?: string;
  type: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface PrimaryButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

export interface UserSliceInitialState {
  userId: string | null;
  fullName: string | null;
  emailAddress: string | null;
  bearerToken: string | null;
}

export interface UserData {
  emailAddress: string
  phoneNumber: string
  firstName: string
  lastName: string
  physicalAddress?: string | null
  shippingAddress?: string | null
  gpsCode?: string | null
  profilePicture?: string | null
}
