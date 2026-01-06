
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin, BadgeCheckIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabPersonal from "@/components/setting/account/tab-personal";
import { useAuthContext } from "@/context/auth-provider";


const AccountSetting = () => {
    const { user } = useAuthContext();

    return (
        <>
        <Card>
        <CardContent>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="relative">
                <Avatar className="h-24 w-24">
                <AvatarImage src="https://bundui-images.netlify.app/avatars/08.png" alt="Profile" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button
                size="icon"
                variant="outline"
                className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full">
                <Camera />
                </Button>
            </div>
            <div className="flex-1 space-y-2">
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600"><BadgeCheckIcon />Pro Member</Badge>
                </div>
                <p className="text-muted-foreground">Senior Product Designer</p>
                <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                    <Mail className="size-4" />
                    {user?.email}
                </div>
                <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    San Francisco, CA
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    Joined March 2023
                </div>
                </div>
            </div>
            <Button variant="default">Edit Profile</Button>
            </div>
        </CardContent>
        </Card>

        <Tabs defaultValue="personal" className="my-6">
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="my-6">
            <TabPersonal/>
        </TabsContent>
        <TabsContent value="account" className="space-y-6">

        </TabsContent>
        <TabsContent value="security" className="space-y-6">

        </TabsContent>
        <TabsContent value="notifications" className="space-y-6">

        </TabsContent>
        </Tabs>

        </>
    )
}

export default AccountSetting