import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Image, MessageSquare, Users, Eye } from "lucide-react"

export default function Dashboard() {
    const stats = [
        { title: "Total Projects", value: "24", icon: Image, change: "+2 this month" },
        { title: "New Messages", value: "12", icon: MessageSquare, change: "5 unread" },
        { title: "Team Members", value: "8", icon: Users, change: "Active" },
        { title: "Site Visits", value: "1.2k", icon: Eye, change: "+15% vs last month" },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your website activity.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground font-sans">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Placeholder */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center border-b pb-4 last:border-0 last:pb-0">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">New Project Added</p>
                                    <p className="text-sm text-muted-foreground">Luxury Wedding at Grand Hotel</p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-muted-foreground">2 hours ago</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
