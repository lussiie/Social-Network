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
   avatarURL: string;
   posts: [];
   massages: [];
   bio: string;
   users: Account[];

}
 export interface Context{
    user: Account;
    setUser: (user: Account) => void;
 }