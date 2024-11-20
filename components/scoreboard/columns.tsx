'use client';
import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';

import { MoreHorizontal } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { formatTime } from '@/lib/time';

type SplitTime = {
  label: string;
  time: number;
};

export type Score = {
  id: string;
  username: string;
  publicId?: string | null;
  splitTimes: SplitTime[];
  time: number;
  createdAt: string;
  image: string;
};

export const columns: ColumnDef<Score>[] = [
  {
    id: 'rank',
    header: 'Rank',
    cell: ({ row, table }) => {
      const rows = table.getFilteredRowModel().rows;
      const sortedRows = [...rows].sort((a, b) => a.original.time - b.original.time);
      const rank = sortedRows.findIndex((r) => r.id === row.id) + 1;
      if (rank === 1) {
        return <div className="text-color-light text-xl">🏆</div>;
      } else if (rank === 2) {
        return <div className="text-color-light text-xl">🥈</div>;
      } else if (rank === 3) {
        return <div className="text-color-light text-xl">🥉</div>;
      }
      return <div className="text-color-light">{rank}</div>;
    }
  },
  {
    accessorKey: 'time',
    header: 'Time',
    cell: ({ row }) => {
      const time = row.getValue('time');
      return <div className="text-color-light">{formatTime(time as number)}</div>;
    }
  },
  {
    id: 'actions',
    header: 'Split Times',
    cell: ({ row }) => {
      const { splitTimes } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-color-teritary">
              <span className="sr-only">See more</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-gray-800 border-gray-800/50 p-5 rounded-lg shadow-lg">
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="text-left text-color-light py-2 px-4">Input type</th>
                    <th className="text-left text-color-light py-2 px-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {splitTimes.map((splitTime, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="text-color-light py-2 px-4">{splitTime.label}</td>
                      <td className="text-color-teritary font-extrabold py-2 px-4">
                        {formatTime(splitTime.time)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  },
  {
    accessorKey: 'username',
    header: 'User',
    cell: ({ row }) => {
      const image = row.original.image;
      const username = row.getValue('username');
      const publicId = row.original.publicId;
      return (
        <Link
          href={`/profile/${publicId}`}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Avatar>
            <AvatarImage
              src={(image as string) ?? ''}
              alt={'user profile picture'}
              className="w-6 h-6 rounded-full"
            />
            <AvatarFallback className="w-6 h-6 tex rounded-full bg-gray-800 border-2 border-color-teritary">
              {(username as string).charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-color-light">{username as string}</div>
        </Link>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return (
        <div>
          {date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}
        </div>
      );
    }
  }
];
