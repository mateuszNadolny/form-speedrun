'use client';
import Image from 'next/image';

import { ColumnDef } from '@tanstack/react-table';

import { formatTime } from '@/lib/time';

export type Score = {
  id: string;
  username: string;
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
    accessorKey: 'username',
    header: 'User',
    cell: ({ row }) => {
      const image = row.original.image;
      const username = row.getValue('username');
      return (
        <div className="flex items-center gap-3">
          <Image
            src={image}
            alt={`${username}'s avatar`}
            width={20}
            height={20}
            className="rounded-full"
          />
          <div className="text-color-light">{username as string}</div>
        </div>
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
