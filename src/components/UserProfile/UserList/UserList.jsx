import { useState } from "react";
import UserHeader from "../UserHeader/UserHeader";
import UserProfile from "../UserProfile/UserProfile";

const UserList = () => {
  const [user, setUser] = useState({
    id: "12345",
    fullName: "Nguyen Van A",
    gender: "Nam",
    email: "NguyenA@gmail.com",
    phone: "012345678",
    department: "Nhân sự",
    position: "Manager Nhân sự",
    skills: ["JavaAdvance", "ReactJs", "NodeJs", "Python"],
    joinDate: "22/10/2024",
  });

  return (
    <div>
      <UserHeader userName={user.fullName} />
      <UserProfile user={user} />
    </div>
  );
};

export default UserList;
