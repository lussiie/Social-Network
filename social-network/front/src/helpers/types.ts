export interface User{
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export interface Account extends User{
   id: number;
   isAccountPrivate: boolean;
   followings: Account[];
   followers: Account[];
   avatarUrl: string;
}
 export interface Context{
    user: Account;
    setUser: (user: Account) => void;
 }