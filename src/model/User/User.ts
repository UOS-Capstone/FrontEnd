class User{
    userId: string;
    username: string;
    password: string;
    nickname: string;
    birth: number;
    email: string;
    phoneNo: string;
    isSocial: boolean;
    zipCode: number;
    street: string;
    addressDetail: string;
    memberImage: string;

    constructor(
        userId: string, username: string, password: string,
        nickname: string, birth: number, email: string,
        phoneNo: string, isSocial: boolean, zipCode: number,
        street: string, addressDetail: string, memberImage: string
    ){
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.birth = birth;
        this.email = email;
        this.phoneNo = phoneNo;
        this.isSocial = isSocial;
        this.zipCode = zipCode;
        this.street = street;
        this.addressDetail = addressDetail;
        this.memberImage = memberImage;
    }
    get formData() {
        let data: FormData = new FormData();
        data.append("userId", this.userId);
        data.append("password", this.password);
        data.append("username", this.username);
        data.append("nickname", this.nickname);
        data.append("email", this.email);
        data.append("phoneNo", this.phoneNo);
        return data;
    }
    get loginData() {
        let data: FormData = new FormData();
        data.append("userId", this.userId);
        data.append("password", this.password);
        return data;
    }
}
export default User;