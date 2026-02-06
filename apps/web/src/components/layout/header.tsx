import { Search, Bell, ChevronDown, Home } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  return (
    <header className="h-14 border-b border-gray-100 bg-white px-5 flex items-center justify-between">
      {/* Left: Logo and Nav */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight">
            <span className="text-violet-600">AER</span>
            <span className="text-gray-900">CH</span>
            <span className="text-violet-600">A</span>
            <span className="text-gray-900">IN</span>
          </span>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-5">
          <button className="text-gray-500 hover:text-gray-700">
            <Home className="w-5 h-5" />
          </button>

          {/* Modules Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Modules
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Sourcing</DropdownMenuItem>
              <DropdownMenuItem>Contracts</DropdownMenuItem>
              <DropdownMenuItem>Suppliers</DropdownMenuItem>
              <DropdownMenuItem>Analytics</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Alerts Tab */}
          <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Alerts
          </button>
        </div>
      </div>

      {/* Right: Search, Notifications, User */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-56 pl-9 pr-4 text-sm border border-gray-200 rounded-lg bg-gray-50/50 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
            3
          </span>
        </button>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:opacity-80 transition-opacity">
              <Avatar name="John Doe" size="sm" className="w-9 h-9" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
