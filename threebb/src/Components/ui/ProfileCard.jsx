/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "./Avtar";
import { Button } from "";
import { User, Mail, Calendar, Edit3, LogOut } from "lucide-react";

const ProfileCard = ({ user, onEditProfile, onLogout }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={user.profileImageUrl}
            alt={user.fullName || "Profile"}
          />
          <AvatarFallback>{user.fullName?.[0] || "G"}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {user.fullName || "Guest User"}
          </h1>
          <p className="text-muted-foreground">
            {user.primaryEmailAddress?.emailAddress || "No Email"}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm">
          <User className="text-muted-foreground" />
          <span>{user.username || "No username set"}</span>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <Mail className="text-muted-foreground" />
          <span>
            {user.primaryEmailAddress?.emailAddress || "No email set"}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <Calendar className="text-muted-foreground" />
          <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button onClick={onEditProfile} className="w-full" variant="outline">
          <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
        <Button onClick={onLogout} className="w-full" variant="destructive">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
