import React, { useState } from "react";
import {
  Users as UsersIcon,
  Search,
  Plus,
  MoreHorizontal,
  Trash2,
  Shield,
  User as UserIcon,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

interface UserItem {
  id: string;
  name: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  emailVerified: boolean;
  role: "ADMIN" | "USER";
  createdAt: string;
  image?: string | null;
}

const INITIAL_USERS: UserItem[] = [
  {
    id: "USR-001",
    name: "Admin User",
    email: "admin@example.com",
    emailVerified: true,
    role: "ADMIN",
    createdAt: "2026-01-15T08:30:00.000Z",
  },
  {
    id: "USR-002",
    name: "Demo Customer",
    email: "user@example.com",
    emailVerified: true,
    role: "USER",
    createdAt: "2026-02-10T11:20:00.000Z",
  },
  {
    id: "USR-003",
    name: "Sarah Connor",
    email: "sarah.connor@example.com",
    emailVerified: true,
    role: "USER",
    createdAt: "2026-03-01T14:45:00.000Z",
  },
  {
    id: "USR-004",
    name: "John Wick",
    email: "john.wick@example.com",
    emailVerified: false,
    role: "USER",
    createdAt: "2026-03-12T09:15:00.000Z",
  },
  {
    id: "USR-005",
    name: "Alex Johnson",
    email: "alex.dev@example.com",
    emailVerified: true,
    role: "ADMIN",
    createdAt: "2026-03-20T16:00:00.000Z",
  },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "USER" as "ADMIN" | "USER" });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.info("User accounts refreshed");
    }, 500);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.email) {
      toast.error("Please enter a valid email address");
      return;
    }

    const created: UserItem = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: newUser.name || "New User",
      email: newUser.email,
      emailVerified: true,
      role: newUser.role,
      createdAt: new Date().toISOString(),
    };

    setUsers([created, ...users]);
    setCreateDialogOpen(false);
    setNewUser({ name: "", email: "", role: "USER" });
    toast.success("User created successfully");
  };

  const handleDeleteUser = (id: string, email: string) => {
    if (confirm(`Are you sure you want to remove ${email}?`)) {
      setUsers(users.filter((u) => u.id !== id));
      toast.success("User removed successfully");
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <UsersIcon className="h-7 w-7 text-primary" />
            <span>User Management</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage system accounts, roles, access permissions, and account statuses.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="cursor-pointer gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>

          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 cursor-pointer">
                <Plus className="h-4 w-4" />
                <span>Add User</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Enter account credentials and assign access permissions.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateUser} className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(val: "ADMIN" | "USER") => setNewUser({ ...newUser, role: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter className="pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setCreateDialogOpen(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save User
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border border-border/80 shadow-xs">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Roles</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border border-border/80 shadow-xs">
        <CardHeader className="px-6 py-4 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Registered Accounts</CardTitle>
              <CardDescription>
                Showing {filteredUsers.length} total user accounts
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[280px]">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No users matching your criteria found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs shrink-0">
                          {user.name ? user.name.slice(0, 2).toUpperCase() : user.email.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {user.name || "Unnamed User"}
                          </div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === "ADMIN" ? "default" : "secondary"}
                        className="gap-1 font-medium"
                      >
                        {user.role === "ADMIN" ? (
                          <Shield className="h-3 w-3" />
                        ) : (
                          <UserIcon className="h-3 w-3" />
                        )}
                        <span>{user.role}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.emailVerified ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
                          <XCircle className="h-3.5 w-3.5" />
                          <span>Pending</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              navigator.clipboard.writeText(user.email);
                              toast.info("Email copied to clipboard");
                            }}
                            className="cursor-pointer"
                          >
                            Copy Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer gap-2"
                            onClick={() => handleDeleteUser(user.id, user.email)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete User</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
